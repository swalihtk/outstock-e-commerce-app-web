import React from 'react'
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'; 
import "./style.css";


function AdminDashboard({container}) {


    function toggleScreen() {
        let sidebar = document.querySelector(".sidebar");
        let sidebarBtn = document.querySelector(".sidebarBtn");
        sidebar.classList.toggle("active");
        if(sidebar.classList.contains("active")){
        sidebarBtn.classList.replace("bx-menu" ,"bx-menu-alt-right");
        }else
        sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
        }

    return (
        <>
        <div className="sidebar">
            <div className="logo-details">
            <i className='bx bxl-c-plus-plus'></i>
            <span className="logo_name">CodingLab</span>
            </div>
            <ul className="nav-links">
                <li>
                <Link to="/admin">
                    <i className='bx bx-grid-alt' ></i>
                    <span className="links_name">Dashboard</span>
                </Link>
                </li>
                <li>
                <Link to="/admin/users">
                    <i className='bx bx-user' ></i>
                    <span className="links_name">Users</span>
                </Link>
                </li>
                <li>
                <Link to="/product">
                    <i className='bx bx-box' ></i>
                    <span className="links_name">Product</span>
                </Link>
                </li>
                <li>
                <Link to="/admin/category">
                    <i className='bx bx-list-ul' ></i>
                    <span className="links_name">Category</span>
                </Link>
                </li>
                <li>
                <a href="#">
                    <i className='bx bx-pie-chart-alt-2' ></i>
                    <span className="links_name">Analytics</span>
                </a>
                </li>
                <li>
                <a href="#">
                    <i className='bx bx-coin-stack' ></i>
                    <span className="links_name">Stock</span>
                </a>
                </li>
                <li>
                <a href="#">
                    <i className='bx bx-book-alt' ></i>
                    <span className="links_name">Total order</span>
                </a>
                </li>
                <li>
                <a href="#">
                    <i className='bx bx-message' ></i>
                    <span className="links_name">Messages</span>
                </a>
                </li>
                <li>
                <a href="#">
                    <i className='bx bx-heart' ></i>
                    <span className="links_name">Favrorites</span>
                </a>
                </li>
                <li>
                <a href="#">
                    <i className='bx bx-cog' ></i>
                    <span className="links_name">Setting</span>
                </a>
                </li>
                <li className="log_out">
                <a href="#">
                    <i className='bx bx-log-out'></i>
                    <span className="links_name">Log out</span>
                </a>
                </li>
            </ul>
        </div>
        <section className="home-section">
            <nav>
            <div className="sidebar-button">
                <i className='bx bx-menu sidebarBtn' onClick={toggleScreen}></i>
                <span className="dashboard">Dashboard</span>
            </div>
            <div className="search-box">
                <input type="text" placeholder="Search..."/>
                <i className='bx bx-search' ></i>
            </div>
            <div className="profile-details">
                <img src="#" alt="#" />
                <span className="admin_name">Prem Shahi</span>
                <i className='bx bx-chevron-down' ></i>
            </div>
            </nav>
          
            <div className="home-content">
            {container}
            </div>

        </section>
        </>
    )
}

export default AdminDashboard
