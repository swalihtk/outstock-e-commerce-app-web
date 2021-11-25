import React from "react";
import AdminDashboard from "../../../layouts/admin/AdminDashboard";
import ProductShow from "./ProductShow";

function ProductMain() {
  return (
    <>
      <AdminDashboard>
        <ProductShow />
      </AdminDashboard>
    </>
  );
}

export default ProductMain;
