import React, { useEffect } from 'react'
import "./style.css";
import AdminNavigationBar from "../../layouts/admin/AdminNavigation";
import { useDispatch, useSelector } from 'react-redux';
import { loadSpinner } from '../../redux/user/spinnerLoading';
import ContentSpinner from '../../layouts/user/ContentSpinner';
import { ListGroup } from 'react-bootstrap';

function AdminDashboard() {

    // spinner
    let {loading}=useSelector(state=>state.spinner);
    let dispatch=useDispatch();


    // component did mount
    useEffect(()=>{
        dispatch(loadSpinner());
    }, [])

    if(loading){
        return <ContentSpinner variant="primary" />
    }else{
        return (
            <>
              <AdminNavigationBar />  
              <div className="admin-router-list">
                  <div className="container">
                      <div className="row">
                      <ListGroup>
                        <ListGroup.Item>Cras justo odio</ListGroup.Item>
                        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                        <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                        <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                    </ListGroup>
                      </div>
                  </div>
            </div>
            </>
        )
    }
    
}

export default AdminDashboard
