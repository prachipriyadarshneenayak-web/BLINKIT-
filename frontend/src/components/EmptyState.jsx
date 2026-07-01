import { Link } from "react-router-dom";
import "./EmptyState.css";

const EmptyState = ({
  title,
  description,
  buttonText,
  buttonLink,
  icon = "📦",
}) => {
  return (
    <div className="empty-state">
      <div className="empty-icon">{icon}</div>

      <h2>{title}</h2>

      <p>{description}</p>

      {buttonText && (
        <Link to={buttonLink}>
          <button className="empty-btn">
            {buttonText}
          </button>
        </Link>
      )}
    </div>
  );
};

export default EmptyState;