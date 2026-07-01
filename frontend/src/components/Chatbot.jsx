import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaPaperPlane, FaTimes, FaRobot, FaCartPlus } from "react-icons/fa";
import API from "../api/axios";
import { addToCart } from "../redux/cartSlice";
import "./Chatbot.css";

const Chatbot = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! 👋 Welcome to **Blinkit Assistant**. I'm here to help you shop! You can ask me to recommend items, search for products, check coupons, or track your order. How can I help you today?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasPulse, setHasPulse] = useState(true);

  const messagesEndRef = useRef(null);

  // Auto scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  // Predefined suggestion chips
  const suggestionChips = [
    { label: "🥦 Show Vegetables", query: "Show me fresh vegetables" },
    { label: "🥛 Dairy Products", query: "Do you have milk and cheese?" },
    { label: "🍪 Recommend Snacks", query: "Recommend some tasty snacks" },
    { label: "🎟️ Coupon Codes", query: "What coupon codes can I use?" },
    { label: "⚡ Delivery Time", query: "How fast is the delivery?" },
  ];

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setHasPulse(false);
  };

  const handleSendMessage = async (textToSend) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    // Append user message
    const userMsg = { sender: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue("");
    setIsLoading(true);

    try {
      // API call to backend chatbot endpoint
      const { data } = await API.post("/chatbot", {
        message: text,
        history: messages,
      });

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: data.reply,
          products: data.products || [],
        },
      ]);
    } catch (error) {
      console.error("Chatbot request error:", error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Oops, I encountered a temporary connection issue. Please try again! 🛒",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart! 🛒`);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    setIsOpen(false); // Close chatbot when viewing details
  };

  // Basic function to render simple markdown bold and linebreaks
  const formatMessageText = (text) => {
    if (!text) return "";
    
    // Convert newlines to breaks
    const lines = text.split("\n");
    
    return lines.map((line, idx) => {
      // Find bold segments e.g. **bold text**
      const parts = line.split(/\*\*([^*]+)\*\*/g);
      
      const formattedLine = parts.map((part, i) => {
        // odd indices will be the match groups inside **...**
        if (i % 2 === 1) {
          return <strong key={i}>{part}</strong>;
        }
        return part;
      });

      return (
        <span key={idx}>
          {formattedLine}
          {idx < lines.length - 1 && <br />}
        </span>
      );
    });
  };

  return (
    <>
      {/* Floating Action Button (FAB) */}
      <button
        className={`chatbot-fab ${hasPulse ? "pulse" : ""}`}
        onClick={handleToggle}
        title="Chat with Blinkit Assistant"
      >
        <FaRobot />
        {hasPulse && <span className="chatbot-badge" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar">
                <FaRobot />
              </div>
              <div className="chatbot-title-container">
                <h3 className="chatbot-title">Blinkit Assistant</h3>
                <p className="chatbot-subtitle">
                  <span className="chatbot-status-dot" /> Online | 10 Min Agent
                </p>
              </div>
            </div>
            <button className="chatbot-close-btn" onClick={handleToggle}>
              <FaTimes />
            </button>
          </div>

          {/* Messages list */}
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-msg-row ${msg.sender}`}>
                <div className="chat-msg-bubble">
                  {formatMessageText(msg.text)}

                  {/* Render suggested products inline if present */}
                  {msg.products && msg.products.length > 0 && (
                    <div className="chatbot-products-container">
                      {msg.products.map((product) => {
                        const imgUrl =
                          product.image &&
                          (product.image.startsWith("http") ||
                            product.image.startsWith("https"))
                            ? product.image
                            : "https://via.placeholder.com/300x300?text=No+Image";

                        return (
                          <div
                            key={product._id}
                            className="chatbot-product-card"
                            onClick={() => handleProductClick(product._id)}
                            style={{ cursor: "pointer" }}
                          >
                            <img
                              className="chatbot-prod-img"
                              src={imgUrl}
                              alt={product.name}
                              onError={(e) => {
                                e.target.src =
                                  "https://via.placeholder.com/300x300?text=No+Image";
                              }}
                            />
                            <div className="chatbot-prod-name">{product.name}</div>
                            <div className="chatbot-prod-price">₹{product.price}</div>
                            <button
                              className="chatbot-prod-add-btn"
                              onClick={(e) => handleAddToCart(product, e)}
                            >
                              <FaCartPlus style={{ marginRight: "4px" }} />
                              + ADD
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="chat-msg-row bot">
                <div className="chat-msg-bubble chatbot-typing-bubble">
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestion Chips */}
          <div className="chatbot-chips-container">
            {suggestionChips.map((chip, idx) => (
              <button
                key={idx}
                className="chatbot-chip"
                onClick={() => handleSendMessage(chip.query)}
                disabled={isLoading}
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Message Input Form */}
          <div className="chatbot-input-form">
            <input
              type="text"
              className="chatbot-input-field"
              placeholder="Ask anything about groceries..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={isLoading}
            />
            <button
              className="chatbot-send-btn"
              onClick={() => handleSendMessage()}
              disabled={isLoading || !inputValue.trim()}
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
