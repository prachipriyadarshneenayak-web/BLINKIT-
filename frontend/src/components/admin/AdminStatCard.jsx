import "./AdminDashboard.css";
import {
  FiPackage,
  FiShoppingCart,
  FiUsers,
  FiDollarSign,
  FiTrendingUp,
} from "react-icons/fi";

const icons = {
  Products: <FiPackage />,
  Orders: <FiShoppingCart />,
  Users: <FiUsers />,
  Revenue: <FiDollarSign />,
};

const AdminStatCard = ({ title, value }) => {
  return (
    <div className="stat-card">

      <div className="stat-top">

        <div className="stat-icon">
          {icons[title]}
        </div>

        <div className="growth">
          <FiTrendingUp />
          +12%
        </div>

      </div>

      <h4 className="stat-title">
        {title}
      </h4>

      <h2 className="stat-value">
        {value}
      </h2>

      <div className="stat-footer">
        Compared to last month
      </div>

    </div>
  );
};

export default AdminStatCard;