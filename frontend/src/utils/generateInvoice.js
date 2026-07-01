import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const generateInvoice = (order) => {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(22);
  doc.setTextColor(12, 131, 31);
  doc.text("Blinkit Clone", 14, 20);

  doc.setFontSize(12);
  doc.setTextColor(0);

  doc.text(`Invoice`, 14, 30);
  doc.text(`Order ID: ${order._id}`, 14, 40);
  doc.text(
    `Date: ${new Date(order.createdAt).toLocaleDateString("en-IN")}`,
    14,
    48
  );

  doc.text(
    `Payment: ${order.isPaid ? "Paid" : "Pending"}`,
    14,
    56
  );

  doc.text(
    `Method: ${order.paymentMethod || "COD"}`,
    14,
    64
  );

  doc.text(`Address:`, 14, 74);
  doc.text(order.address || "-", 14, 82);

  // Products Table
  autoTable(doc, {
    startY: 92,
    head: [["Product", "Qty", "Price"]],
    body: order.products.map((item) => [
      item.product?.name || "Product",
      item.quantity,
      `₹${item.product?.price || 0}`,
    ]),
  });

  // Total
  const finalY = doc.lastAutoTable.finalY + 10;

  doc.setFontSize(14);
  doc.text(
    `Total Amount: ₹${order.totalAmount}`,
    14,
    finalY
  );

  doc.save(`Invoice-${order._id}.pdf`);
};

export default generateInvoice;