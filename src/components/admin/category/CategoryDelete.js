import { LinearProgress } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'

function CategoryDelete() {

    // category
    let [categoryArray, setCategoryArray]=useState([]);

    // loading
    let [categoryLoading, setCategoryLoading]=useState(false);
    let [subCatLoading, setSubCatLoading]=useState(false);

    // select handler
    let [subCategoryArray, setSubCategoryArray]=useState([]);

    // main select hanlder
    function handleMainSelect(e){
        let value=e.target.value;
        getSubCategory(value);
    }

    // get Subcategory
    function getSubCategory(value){
        setSubCatLoading(true);
        axios.get(`/admin/category/getSub/${value}`).then(response=>{
            let data=response.data;
            setSubCatLoading(false);
            setSubCategoryArray(data);
        }).catch(err=>{
            setSubCatLoading(false);
            alert("Something went wrong!!")
        })
    }

    // component did mount
    useEffect(()=>{
        setCategoryLoading(true);
        axios.get("/admin/category/get").then(response=>{
            let data=response.data;
            setCategoryArray(data);
            getSubCategory(data[0].categoryName);
            setCategoryLoading(false);
        }).catch(err=>{
            alert("Something went wrong!!");
            setCategoryLoading(false);
        })
    }, [])

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
                        <Form.Select size="lg" onChange={handleMainSelect}>
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
                        <Form.Select>
                            {
                            subCategoryArray?.map((item, index)=>{
                                return <option key={index}>{item}</option>
                            })    
                            }
                        </Form.Select>
                        <br />
                        </form>
                    </div>
                    <div className="col-12 col-md-2"></div>
                </div>
            </div>
        </div>
    )
}

export default CategoryDelete
