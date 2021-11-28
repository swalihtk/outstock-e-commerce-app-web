import React, { useState } from "react";
import {ListGroup} from 'react-bootstrap'

// icons
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import LockIcon from '@material-ui/icons/Lock';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MyAccount from "./MyAccount";
import ManageAddress from "./ManageAddress";
import PasswordChange from "./PasswordChange";

function ProfileNavigation() {

 let [navItem, setNavItem]=useState("ACCOUNT");

  return (
    <div className="container">
        <div className="row mt-4">
            <div className="col-md-3">
                <ListGroup.Item variant="success">Welcome Username</ListGroup.Item>
                <ListGroup className="mt-3">
                    <ListGroup.Item action variant="light" onClick={()=>setNavItem("ACCOUNT")}><AccountCircleIcon/> Account Settings</ListGroup.Item>
                    <ListGroup.Item action variant="light" onClick={()=>setNavItem("MANAGE")}><HomeIcon/> Manage Address</ListGroup.Item>
                    <ListGroup.Item action variant="light" onClick={()=>setNavItem("CHANGE")}><LockIcon/> Change Password</ListGroup.Item>
                    <ListGroup.Item action variant="light"><FavoriteIcon/> My Whishlist</ListGroup.Item>
                </ListGroup>
            </div>
            <div className="col-md-9 profileNavigation__container">
                {
                    navItem==="ACCOUNT"?
                    <MyAccount />
                    :navItem==="MANAGE"?
                    <ManageAddress />
                    :
                    navItem==="CHANGE"&&
                    <PasswordChange />
                }
            </div>
        </div>
    </div>
  );
}

export default ProfileNavigation;
