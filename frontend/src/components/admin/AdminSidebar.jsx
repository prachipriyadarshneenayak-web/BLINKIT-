import { Link, useLocation } from "react-router-dom";
import {
  FiHome,
  FiPackage,
  FiShoppingCart,
  FiUsers,
  FiPlusCircle,
  FiTag,
  FiLogOut,
} from "react-icons/fi";

import "./AdminDashboard.css";

const AdminSidebar = () => {
  const location = useLocation();

  const menu = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: <FiHome />,
    },
    {
      name: "Add Product",
      path: "/admin/products",
      icon: <FiPlusCircle />,
    },
    {
      name: "Products",
      path: "/admin/products-list",
      icon: <FiPackage />,
    },
    {
      name: "Orders",
      path: "/admin/orders",
      icon: <FiShoppingCart />,
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: <FiUsers />,
    },
    {
      name: "Coupons",
      path: "/admin/coupons",
      icon: <FiTag />,
    },
  ];

  return (
    <aside className="admin-sidebar">

      <div className="sidebar-top">

        <div className="admin-logo">
          🛒 Blinkit
          <span>Admin Panel</span>
        </div>

        <nav className="admin-menu">

          {menu.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`admin-link ${
                location.pathname === item.path
                  ? "active-link"
                  : ""
              }`}
              onClick={() => {
                if (location.pathname === item.path) {
                  window.location.reload();
                }
              }}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}

        </nav>

      </div>

      <div className="sidebar-bottom">

        <div className="storage-card">
          <h4>Storage</h4>

          <div className="storage-bar">
            <div className="storage-fill"></div>
          </div>

          <small>68% Used</small>
        </div>

        <button className="logout-btn">
          <FiLogOut />
          Logout
        </button>

      </div>

    </aside>
  );
};

export default AdminSidebar;