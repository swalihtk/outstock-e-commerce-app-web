import React, { useState } from "react";
import {ListGroup} from 'react-bootstrap'
import MyWallet from "../Wallet/index";
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import WhishList from '../Whishlist/index';

// icons
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import LockIcon from '@material-ui/icons/Lock';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MyAccount from "./MyAccount";
import ManageAddress from "./ManageAddress";
import PasswordChange from "./PasswordChange";
import { useNavigate } from "react-router";

function ProfileNavigation({routerQuery}) {

 let [navItem, setNavItem]=useState("ACCOUNT");
 let navigate=useNavigate();

  return (
    <div className="container">
        <div className="row mt-4">
            <div className="col-md-3">
                <ListGroup.Item variant="success" className="text-center">Welcome to Profile!!</ListGroup.Item>
                <ListGroup className="mt-3">
                    <ListGroup.Item action variant="light" onClick={()=>navigate("/profile?link=my_account")}><AccountCircleIcon/> Account Settings</ListGroup.Item>
                    <ListGroup.Item action variant="light" onClick={()=>navigate("/profile?link=manage_address")}><HomeIcon/> Manage Address</ListGroup.Item>
                    <ListGroup.Item action variant="light" onClick={()=>navigate("/profile?link=password_change")}><LockIcon/> Change Password</ListGroup.Item>
                    <ListGroup.Item action variant="light" onClick={()=>navigate("/profile?link=my_wallet")}><AccountBalanceWalletIcon/> My Wallet</ListGroup.Item>
                    <ListGroup.Item action variant="light" onClick={()=>navigate("/profile?link=my_whishlist")}><FavoriteIcon/> My Whishlist</ListGroup.Item>
                </ListGroup>
            </div>
            <div className="col-md-9 profileNavigation__container">
                {
                    routerQuery==="my_account"?
                    <MyAccount />
                    :routerQuery==="manage_address"?
                    <ManageAddress />
                    :
                    routerQuery==="password_change"?
                    <PasswordChange />
                    :
                    routerQuery==="my_wallet"?
                    <MyWallet/>
                    :
                    routerQuery==="my_whishlist"&&
                    <WhishList/>
                }
            </div>
        </div>
    </div>
  );
}

export default ProfileNavigation;
