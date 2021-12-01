import axios from "axios";
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./style.css";

function AdminDashboard({ children }) {
  function toggleScreen() {
    let sidebar = document.querySelector(".sidebar");
    let sidebarBtn = document.querySelector(".sidebarBtn");
    sidebar.classList.toggle("active");
    if (sidebar.classList.contains("active")) {
      sidebarBtn.classList.replace("bx-menu", "bx-menu-alt-right");
    } else sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
  }

  function logoutAdmin() {
    axios
      .get("/admin/auth/signout")
      .then((response) => {
        window.location.reload();
      })
      .catch((err) => {
        alert("Something went wrong");
      });
  }

  return (
    <>
      <div className="sidebar">
        <div className="logo-details">
          <i className="bx bxl-c-plus-plus"></i>
          <span className="logo_name">OutStock</span>
        </div>
        <ul className="nav-links" style={{ padding: 0 }}>
          <li>
            <Link to="/admin">
              <i className="bx bx-grid-alt"></i>
              <span className="links_name">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/users">
              <i className="bx bx-user"></i>
              <span className="links_name">Users</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/product">
              <i className="bx bx-box"></i>
              <span className="links_name">Product</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/category">
              <i className="bx bx-list-ul"></i>
              <span className="links_name">Category</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/banners">
              <i className="bx bx-pie-chart-alt-2"></i>
              <span className="links_name">Banners</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/orders?page=1">
              <i className="bx bx-book-alt"></i>
              <span className="links_name">Total order</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/offers_coupons">
              <i className="bx bx-coin-stack"></i>
              <span className="links_name">Offers and Coupons</span>
            </Link>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-message"></i>
              <span className="links_name">Messages</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-heart"></i>
              <span className="links_name">Favrorites</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-cog"></i>
              <span className="links_name">Setting</span>
            </a>
          </li>
          <li className="log_out">
            <a href="#" onClick={logoutAdmin}>
              <i className="bx bx-log-out"></i>
              <span className="links_name">Log out</span>
            </a>
          </li>
        </ul>
      </div>
      <section className="home-section">
        <nav>
          <div className="sidebar-button">
            <i className="bx bx-menu sidebarBtn" onClick={toggleScreen}></i>
            <span className="dashboard">Dashboard</span>
          </div>
          <div className="search-box">
            <input type="text" placeholder="Search..." />
            <i className="bx bx-search"></i>
          </div>
          <div className="profile-details">
            <img src="https://www.w3schools.com/howto/img_avatar.png" alt="#" />
            <span className="admin_name">Admin</span>
          
          </div>
        </nav>

        <div className="home-content">{children}</div>
      </section>
    </>
  );
}

export default AdminDashboard;
