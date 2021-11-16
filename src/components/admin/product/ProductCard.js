import { TableCell, TableRow,Button } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import swal from 'sweetalert';
import { showAllProductAdmin } from '../../../redux/admin/showAllProduct';



function ProductCard({item, index, editHandler}) {

    // item distructure
    let {_id, name, price, productImages, shortDescription, category}=item;

    

    // redux
    let dispatch=useDispatch();

    /****** Delete product ****/
    function delteProduct(){
        swal({
            title: "Are you sure?",
            text: "Do you want to delete product?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                axios.delete(`/admin/product/delete/${_id}`).then(response=>{
                    swal("Product has been deleted", {
                        icon: "success",
                      });
                      dispatch(showAllProductAdmin());
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
        <TableCell component="th" scope="row">
                        {index}
        </TableCell>
        <TableCell align="center">{name}</TableCell>
        <TableCell align="center">{price}</TableCell>
        <TableCell align="center">{category}</TableCell>
        <TableCell align="center"><img style={{maxWidth:"100px"}} src={productImages[0].img} alt="" /></TableCell>
        <TableCell align="center">
            <Button variant="contained" color="primary" onClick={()=>editHandler(_id)}>Edit</Button>
            <Button variant="contained" style={{marginLeft:"0.5rem"}} color="secondary" onClick={delteProduct}>Delete</Button>
        </TableCell>
        </TableRow>
        </>
    )
}

export default ProductCard
