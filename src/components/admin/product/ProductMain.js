import React from "react";
import AdminDashboard from "../../../layouts/admin/AdminDashboard";
import ProductShow from "./ProductShow";
import Pagination from "@material-ui/lab/Pagination";
import { useSearchParams } from "react-router-dom";

function ProductMain() {
  let [searchParams, setSearchParams] = useSearchParams();

  console.log(searchParams.get("page"));

  return (
    <>
      <AdminDashboard>
        <ProductShow />
      </AdminDashboard>
    </>
  );
}

export default ProductMain;
