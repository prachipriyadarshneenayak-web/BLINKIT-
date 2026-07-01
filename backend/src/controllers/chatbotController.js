const { GoogleGenerativeAI } = require("@google/generative-ai");
const Product = require("../models/Product");

/**
 * @desc    Chat with AI Assistant
 * @route   POST /api/chatbot
 * @access  Public
 */
const chatWithAssistant = async (req, res, next) => {
  try {
    const { message, history } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({ message: "Message is required" });
    }

    // 1. Fetch all products from MongoDB for context
    const products = await Product.find({}, "name price description category averageRating image stock");

    // Format products for prompt or local keyword matcher
    const formattedProducts = products.map((p) => ({
      id: p._id.toString(),
      name: p.name,
      price: p.price,
      category: p.category,
      description: p.description || "",
      averageRating: p.averageRating || 0,
      stock: p.stock
    }));

    const geminiKey = process.env.GEMINI_API_KEY;

    if (geminiKey) {
      try {
        // 2. Gemini AI flow
        const genAI = new GoogleGenerativeAI(geminiKey);
        // Using gemini-1.5-flash which is widely supported and fast
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const productsListText = formattedProducts
          .map((p) => `- ID: ${p.id} | Name: ${p.name} | Category: ${p.category} | Price: ₹${p.price} | Desc: ${p.description}`)
          .join("\n");

        const systemInstruction = `You are Blinkit AI Assistant, a friendly and helpful customer shopping assistant for Blinkit, India's last-minute app (delivering in 10 minutes!).
Your goal is to assist users in finding groceries, fruits, vegetables, dairy, snacks, beverages, and other items. You can also answer questions about delivery, payments, or coupons.

Here is the current real-time inventory of products available on Blinkit:
${productsListText}

Instructions:
1. Always be conversational, polite, and write brief, engaging responses.
2. Recommend actual products from our inventory list above. Use the exact product names and specify prices.
3. If recommending any products, you MUST list their IDs at the very end of your response inside this exact format: [RECOMMENDED_IDS: id1, id2, id3] (comma-separated list of IDs matching the products recommended). This is critical for showing interactive cards to the user. Do not include this marker anywhere else.
4. If a user asks for an item we do NOT have in stock or in our list, politely state we don't have it, and offer the closest match from our inventory.
5. If the user asks about delivery time, answer that Blinkit delivers in under 10 minutes from local stores.
6. If the user asks about coupon codes or discounts, highlight these: SAVE10 (10% off), WELCOME50 (₹50 off for first-time orders), or FREESHIP (free shipping on orders above ₹200).
7. Format your response text with clean markdown (lists, bold words). Keep it concise.
`;

        // Format history for Gemini
        // Gemini expects role: 'user' | 'model' with parts: [{ text: '...' }]
        const geminiHistory = (history || [])
          .filter((msg) => msg.sender === "user" || msg.sender === "bot")
          .map((msg) => ({
            role: msg.sender === "user" ? "user" : "model",
            parts: [{ text: msg.text }]
          }));

        // Use chat interface
        const chat = model.startChat({
          history: geminiHistory,
          systemInstruction: systemInstruction,
          generationConfig: {
            maxOutputTokens: 800,
            temperature: 0.7,
          }
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        let responseText = response.text();

        // Extract recommended IDs if present
        let recommendedProducts = [];
        const match = responseText.match(/\[RECOMMENDED_IDS:\s*([^\]]+)\]/);
        if (match) {
          const ids = match[1].split(",").map((id) => id.trim());
          // Fetch product objects
          recommendedProducts = products.filter((p) => ids.includes(p._id.toString()));
          // Remove the tag from response text
          responseText = responseText.replace(/\[RECOMMENDED_IDS:\s*[^\]]+\]/, "").trim();
        }

        return res.status(200).json({
          reply: responseText,
          products: recommendedProducts
        });

      } catch (err) {
        console.error("Gemini API Error, falling back to local simulated assistant:", err);
        // Fallback to simulated matcher if API fails
      }
    }

    // 3. Fallback Simulated Keyword-matching AI Agent
    const lowerMessage = message.toLowerCase().trim();
    let reply = "";
    let recommendedProducts = [];

    // Greeting
    if (
      lowerMessage.includes("hi") ||
      lowerMessage.includes("hello") ||
      lowerMessage.includes("hey") ||
      lowerMessage.includes("greetings") ||
      lowerMessage.includes("good morning") ||
      lowerMessage.includes("good afternoon")
    ) {
      reply = "Hello! 👋 Welcome to Blinkit Assistant. I can help you find groceries, check delivery details, or tell you about our coupon discounts. What are you looking to buy today?";
      // Suggest top 3 best rated products as a welcome recommendation
      recommendedProducts = products
        .sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0))
        .slice(0, 3);
    }
    // Delivery Time
    else if (
      lowerMessage.includes("delivery") ||
      lowerMessage.includes("time") ||
      lowerMessage.includes("how fast") ||
      lowerMessage.includes("speed") ||
      lowerMessage.includes("arrive") ||
      lowerMessage.includes("minutes")
    ) {
      reply = "At **Blinkit**, we deliver your groceries in **under 10 minutes**! ⚡ Our local dark stores are scattered across the neighborhood to ensure ultra-fast delivery right to your doorstep. We are active 24/7!";
    }
    // Coupons & Offers
    else if (
      lowerMessage.includes("coupon") ||
      lowerMessage.includes("code") ||
      lowerMessage.includes("discount") ||
      lowerMessage.includes("offer") ||
      lowerMessage.includes("promo") ||
      lowerMessage.includes("save")
    ) {
      reply = "You can save big with these checkout coupons:\n\n" +
        "1. **WELCOME50** - ₹50 off on your first order!\n" +
        "2. **SAVE10** - Flat 10% off on grocery orders above ₹499.\n" +
        "3. **FREESHIP** - Free shipping on orders above ₹200.\n\n" +
        "Simply type or apply them on the payment checkout page!";
    }
    // Orders tracking
    else if (
      lowerMessage.includes("order") ||
      lowerMessage.includes("my orders") ||
      lowerMessage.includes("track") ||
      lowerMessage.includes("history")
    ) {
      reply = "You can easily view and track all your orders on the **Orders** page. Click on the 📦 **Orders** button in the navigation bar to see your pending/completed orders, download invoices, and view real-time delivery status.";
    }
    // Specific Categories
    else if (
      lowerMessage.includes("dairy") ||
      lowerMessage.includes("milk") ||
      lowerMessage.includes("cheese") ||
      lowerMessage.includes("butter") ||
      lowerMessage.includes("paneer") ||
      lowerMessage.includes("curd")
    ) {
      recommendedProducts = products.filter((p) => p.category.toLowerCase() === "dairy").slice(0, 4);
      if (recommendedProducts.length > 0) {
        reply = "Here are some of our fresh dairy products available right now! Feel free to add them to your cart:";
      } else {
        reply = "We carry fresh milk, paneer, and butter in our Dairy section. However, we couldn't find any matching products in our database right now.";
      }
    } else if (
      lowerMessage.includes("fruit") ||
      lowerMessage.includes("apple") ||
      lowerMessage.includes("banana") ||
      lowerMessage.includes("mango") ||
      lowerMessage.includes("orange") ||
      lowerMessage.includes("grapes")
    ) {
      recommendedProducts = products.filter((p) => p.category.toLowerCase() === "fruits").slice(0, 4);
      if (recommendedProducts.length > 0) {
        reply = "Here are fresh, seasonal fruits from our stock. Handpicked for quality!";
      } else {
        reply = "We offer fresh seasonal fruits. Currently, there are no items loaded in the fruits category.";
      }
    } else if (
      lowerMessage.includes("vegetable") ||
      lowerMessage.includes("veg") ||
      lowerMessage.includes("potato") ||
      lowerMessage.includes("onion") ||
      lowerMessage.includes("tomato") ||
      lowerMessage.includes("spinach") ||
      lowerMessage.includes("cabbage")
    ) {
      recommendedProducts = products.filter((p) => p.category.toLowerCase() === "vegetables").slice(0, 4);
      if (recommendedProducts.length > 0) {
        reply = "Here are fresh vegetables from local farms, cleaned and packed hygienically:";
      } else {
        reply = "Check out our Vegetables category! We have potatoes, onions, tomatoes, and leafy greens in stock.";
      }
    } else if (
      lowerMessage.includes("snack") ||
      lowerMessage.includes("chips") ||
      lowerMessage.includes("cookie") ||
      lowerMessage.includes("biscuit") ||
      lowerMessage.includes("chocolate") ||
      lowerMessage.includes("lays")
    ) {
      recommendedProducts = products.filter((p) => p.category.toLowerCase() === "snacks").slice(0, 4);
      if (recommendedProducts.length > 0) {
        reply = "Craving some munchies? Here are our popular snacks ready to satisfy your cravings in 10 minutes:";
      } else {
        reply = "We have chips, biscuits, and chocolates in our Snacks section!";
      }
    } else if (
      lowerMessage.includes("beverage") ||
      lowerMessage.includes("drink") ||
      lowerMessage.includes("coke") ||
      lowerMessage.includes("juice") ||
      lowerMessage.includes("soda") ||
      lowerMessage.includes("water") ||
      lowerMessage.includes("pepsi")
    ) {
      recommendedProducts = products.filter((p) => p.category.toLowerCase() === "beverages").slice(0, 4);
      if (recommendedProducts.length > 0) {
        reply = "Here are chilled beverages and juices to keep you refreshed:";
      } else {
        reply = "We offer juices, sodas, and soft drinks. Check out the Beverages category!";
      }
    }
    // Generic search matcher (e.g. if the user enters a product name)
    else {
      // Find products whose name matches the input
      recommendedProducts = products
        .filter((p) => p.name.toLowerCase().includes(lowerMessage) || p.description?.toLowerCase().includes(lowerMessage))
        .slice(0, 4);

      if (recommendedProducts.length > 0) {
        reply = `I found some products matching "${message}" in our store! Check them out:`;
      } else {
        // Find general recommendations
        recommendedProducts = products.slice(0, 3);
        reply = `I couldn't find any specific items matching "${message}". However, here are some of our popular products you might like:`;
      }
    }

    return res.status(200).json({
      reply,
      products: recommendedProducts
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  chatWithAssistant
};
