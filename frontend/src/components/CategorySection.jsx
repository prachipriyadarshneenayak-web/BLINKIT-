import "./CategorySection.css";
import { FaLeaf } from "react-icons/fa";

const categoryIcons = {
  All: "🛍️",
  Dairy: "🥛",
  Fruits: "🍎",
  Vegetables: "🥬",
  Bakery: "🍞",
  Snacks: "🍟",
  Beverages: "🥤",
  Grocery: "🛒",
};

const CategorySection = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
  <>
    <div className="category-heading">
      <h2 className="category-title">
        <FaLeaf />
        Shop by Category
        <FaLeaf />
      </h2>
      <p>Explore our wide range of fresh products</p>
    </div>

    <div className="category-container">
      {categories.map((category) => (
        <div
          key={category}
          className={`category-card ${
            selectedCategory === category
              ? "active-category"
              : ""
          }`}
          onClick={() => setSelectedCategory(category)}
        >
          <div className="category-icon">
            {categoryIcons[category] || "📦"}
          </div>

          <h4>{category}</h4>
        </div>
      ))}
    </div>
  </>
);
};

export default CategorySection;