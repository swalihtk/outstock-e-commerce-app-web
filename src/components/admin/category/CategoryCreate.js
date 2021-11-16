import { LinearProgress } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react'
import { FloatingLabel, Form, Button, Breadcrumb } from 'react-bootstrap'
import swal from 'sweetalert';


function CategoryCreate() {


    // sub array
    let [subArray, setSubArray]=useState([]);

    // form handler
    let [mainCatName, setMainCatName]=useState("");
    let [subCatName, setSubCatName]=useState("");

    // create loader
    let [createLoader, setCreateLoader]=useState(false);

    // create category
    function createCategory(e){
        e.preventDefault();
        setCreateLoader(true);
        axios.post("/admin/category/add", {
            mainCategoryName:mainCatName,
            subCategoryArray:subArray
        }).then(response=>{
            setCreateLoader(false);
            swal({
                title: "Success!!",
                text: "Category Created",
                icon: "success",
                button: "Ok!",
              });
              setMainCatName("");
              setSubArray([]);
        }).catch(err=>{
            setCreateLoader(false);
            swal({
                title: "Error!!",
                text: "Something went problem!",
                icon: "error",
                button: "Ok!",
              });
        })

    }


    // subArray handling
    function addToSubArray(){
        setSubArray((prev)=>{
            return [
                ...prev,
                subCatName
            ]
        })
        setSubCatName("");
    }

    return (
        <div>
            <h5 className="text-center">--</h5>
            <h3 className="text-center">Create new category</h3>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-2"></div>
                    <div className="col-12 col-md-8">
                        <form className="mt-4" onSubmit={createCategory}>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Main Category Name"
                                className="mb-3"
                            >
                                <Form.Control type="text" placeholder="Category Name" value={mainCatName} onChange={(e)=>setMainCatName(e.target.value)} required/>
                            </FloatingLabel>
                            <div style={{display:'flex'}}>
                                <FloatingLabel controlId="floatingPassword" label="Sub Category">
                                    <Form.Control type="text" placeholder="SubCategory Name" value={subCatName} onChange={(e)=>setSubCatName(e.target.value)} />
                                </FloatingLabel>
                                <Button variant="warning" onClick={addToSubArray}>Add</Button>
                            </div>
                            <Button variant="primary" type="submit" className="ml-4 mt-4" style={{width:"100%"}}>Create Category</Button>
                            {
                                createLoader&&
                                <LinearProgress style={{background:"yellow"}} />
                            }
                                {
                                    subArray.length>0&&
                                    <Breadcrumb className="ml-4">
                                        {
                                            subArray.map((item, index)=><Breadcrumb.Item key={index} active>{item}</Breadcrumb.Item>)
                                        }
                                    </Breadcrumb>
                                }
                            
                        </form>
                    </div>
                    <div className="col-12 col-md-2"></div>
                </div>
            </div>
        </div>
    )
}

export default CategoryCreate
