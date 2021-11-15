import React, { useState } from 'react'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import swal from 'sweetalert';
import {useNavigate} from 'react-router-dom';


function Users({index,user,blocked, getActiveUsers,getBlockedUsers,setListBlocked,setListActive}) {

    let {_id, username, email, updatedAt}=user;

    let navigater=useNavigate();

    // blocked users
    function blockedAndBlock(){
        swal({
            title: `${blocked?"Unblock":"Block"}`,
            text: `Do you want to ${blocked?"Unblock":"Block"} ${username}`,
            icon: "warning",
            buttons: true,
          })
          .then((confirm) => {
            if (confirm) {
                axios.put(`/admin/users/manage/${_id}`).then(response=>{
                    let data=response.data;
                    if(data.blocked){
                        swal("User has been blocked", {
                            icon: "success",
                          });
                        
                    }else{
                        swal("User has been unblocked", {
                            icon: "success",
                          });
                          
                    }
                    getActiveUsers();
                    getBlockedUsers();

                    if(blocked){
                        setListBlocked();
                    }else{
                        setListActive();
                    }
                }).catch(err=>{
                    swal("Something went wrong", {
                        icon: "error",
                      });
                })
            } else {
             return;
            }
          });
          
            
    }

    return (
        <>
        <TableRow>
            <TableCell component="th" scope="row">{index}</TableCell>
            <TableCell align="center">{username}</TableCell>
            <TableCell align="center">{email}</TableCell>
            <TableCell align="center">{updatedAt}</TableCell>
            <TableCell align="center">{
                blocked?
                <Button variant="contained" color="primary" onClick={blockedAndBlock}>
                    UnBlock
                </Button>
                :
                <Button variant="contained" color="secondary" onClick={blockedAndBlock}>
                    Block
                </Button>
            }</TableCell>
        </TableRow>

        </>
    )
}

export default Users
