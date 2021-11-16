import { LinearProgress } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import swal from 'sweetalert';

function CategoryDelete() {

    // category
    let [categoryArray, setCategoryArray]=useState([]);

    // loading
    let [categoryLoading, setCategoryLoading]=useState(false);
    let [subCatLoading, setSubCatLoading]=useState(false);

    // select handler
    let [mainCatValue, setMainCatValue]=useState("");
    let [subCatValue, setSubCatValue]=useState("");

    let [subCategoryArray, setSubCategoryArray]=useState([]);

    // main select hanlder
    function handleMainSelect(e){
        let value=e.target.value;
        setMainCatValue(value);
        getSubCategory(value);
    }

    // get main array
    function getMainCat(){
        setCategoryLoading(true);
        axios.get("/admin/category/get").then(response=>{
            let data=response.data;
            setCategoryArray(data);
            getSubCategory(data[0].categoryName);
            setCategoryLoading(false);
            setMainCatValue(data[0].categoryName)
        }).catch(err=>{
            alert("Something went wrong!!");
            setCategoryLoading(false);
        })
    }

    // get Subcategory
    function getSubCategory(value){
        setSubCatLoading(true);
        axios.get(`/admin/category/getSub/${value}`).then(response=>{
            let data=response.data;
            setSubCatLoading(false);
            setSubCategoryArray(data);
            setSubCatValue(data[0]);
        }).catch(err=>{
            setSubCatLoading(false);
            alert("Something went wrong!!")
        })
    }

    // component did mount
    useEffect(()=>{
        getMainCat();
    }, [])

    // delete handlier
    function deleteMainCategory(){
        swal({
            title: "Are you sure?",
            text: `Do you want to delete category ${mainCatValue}`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                axios.delete(`/admin/category/deleteMain/${mainCatValue}`).then(response=>{
                    swal("Category has been deleted!!", {
                        icon: "success",
                      });
                    getMainCat();
                }).catch(err=>{
                    swal("Something went wrong", {
                        icon:"error",
                      });
                })
            } else {
              return;
            }
          });
    }

    function deleteSubCategory(){
        swal({
            title: "Are you sure?",
            text: `Do you want to delete category ${subCatValue}`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                axios.delete(`/admin/category/deleteSub/`, {
                    params:{
                        categoryName:mainCatValue,
                        subName:subCatValue
                    }
                }).then(response=>{
                    swal("SubCategory has been deleted!!", {
                        icon: "success",
                      });
                      getSubCategory(mainCatValue);
                }).catch(err=>{
                    swal("Something went wrong", {
                        icon:"error",
                      });
                })
            } else {
              return;
            }
          });
    }

    return (
        <div>
            <h5 className="text-center">--</h5>
            <h3 className="text-center">Delete Category</h3>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-2"></div>
                    <div className="col-12 col-md-8">
                        <form className="mt-4">
                        <label className="mb-2">MainCategory</label>
                        {
                            categoryLoading&&<LinearProgress />
                        }
                        <Form.Select size="lg" value={mainCatValue} onChange={handleMainSelect}>
                            {
                                categoryArray?.map((item)=>{
                                    return <option key={item._id}>{item.categoryName}</option>
                                })
                            }
                        </Form.Select>
                        <br />
                        <label className="mb-2">SubCategory</label>
                        {
                            subCatLoading&&<LinearProgress />
                        }
                        <Form.Select value={subCatValue} onChange={(e)=>setSubCatValue(e.target.value)}>
                            {
                            subCategoryArray?.map((item, index)=>{
                                return <option key={index}>{item}</option>
                            })    
                            }
                        </Form.Select>
                        <br />
                        <Button variant="secondary" style={{marginLeft:"1rem", marginTop:"1rem"}} onClick={deleteMainCategory}>Delete MainCategory</Button>
                        <Button variant="success" style={{marginLeft:"1rem", marginTop:"1rem"}} onClick={deleteSubCategory}>Delete SubCategory</Button>
                        </form>
                    </div>
                    <div className="col-12 col-md-2"></div>
                </div>
            </div>
        </div>
    )
}

export default CategoryDelete
