import "./AdminDashboard.css";
import { FiSearch, FiBell } from "react-icons/fi";

const AdminHeader = () => {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="admin-header">
      <div className="header-left">
        <h1>👋 Welcome Back, Admin</h1>
        <p>Manage your grocery store from one place.</p>
      </div>

      <div className="header-right">

        <div className="search-box-admin">
          <FiSearch />
          <input
            type="text"
            placeholder="Search products..."
          />
        </div>

        <button className="notification-btn">
          <FiBell />
        </button>

        <div className="admin-profile">
          <img
            src="https://i.pravatar.cc/100"
            alt="Admin"
          />

          <div>
            <h4>Admin</h4>
            <small>{today}</small>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminHeader;