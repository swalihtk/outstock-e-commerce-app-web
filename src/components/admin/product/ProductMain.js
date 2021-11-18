import React from "react";
import AdminDashboard from "../../../layouts/admin/AdminDashboard";
import ProductShow from "./ProductShow";

function ProductMain() {
  return (
    <>
      <AdminDashboard container={<ProductShow />} />
    </>
  );
}

export default ProductMain;
