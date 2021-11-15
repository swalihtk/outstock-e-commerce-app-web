import React, { useState } from 'react'
import { Nav } from 'react-bootstrap'
import CategoryCreate from './CategoryCreate';
import CategoryDelete from './CategoryDelete';
import CategoryUpdate from './CategoryUpdate';

function CategoryShow() {

    // category state
    let [categoyState, setCategoyState]=useState("create");

    // manage categoy state
    function changeToCreate(){
        setCategoyState("create");
    }

    function changeToUpdate(){
        setCategoyState("update");
    }

    function changeToDelete(){
        setCategoyState("delete");
    }


    return (
        <div>
           <Nav variant="tabs" defaultActiveKey="/home">
            <Nav.Item>
                <Nav.Link eventKey="link-1" onClick={changeToCreate}>Create Category</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-2" onClick={changeToUpdate}>Update Category</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-3" onClick={changeToDelete}>Delete Category</Nav.Link>
            </Nav.Item>
            </Nav>

            <div style={{background:"white", height:"80vh"}}>
            {
                categoyState==="create"?
                <CategoryCreate />
                :
                categoyState==="update"?
                <CategoryUpdate />
                :
                categoyState==="delete"&&
                <CategoryDelete />
            }
            </div>
        </div>
    )
}

export default CategoryShow
