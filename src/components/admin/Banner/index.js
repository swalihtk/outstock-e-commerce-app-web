import React from "react";
import AdminDashboard from "../../../layouts/admin/AdminDashboard";
import BannerList from "./BannerList";
import "./Banner.css";

function index() {
  return (
    <>
      <AdminDashboard>
        <BannerList />
      </AdminDashboard>
    </>
  );
}

export default index;
