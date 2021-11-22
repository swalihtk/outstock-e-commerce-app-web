import React from "react";
import AdminDashboard from "../../../layouts/admin/AdminDashboard";
import CategoryShow from "./CategoryShow";

function CategoryMain() {
  return (
    <>
      <AdminDashboard>
        <CategoryShow />
      </AdminDashboard>
    </>
  );
}

export default CategoryMain;
