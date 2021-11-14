import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import NavigationBar from '../../layouts/user/NavigationBar'
import { loadSpinner } from '../../redux/user/spinnerLoading';
import ContentSpinner from '../../layouts/user/ContentSpinner';

function Home() {

  let {loading}=useSelector(state=>state.spinner);
  let dispatch=useDispatch();

    useEffect(()=>{
      dispatch(loadSpinner());
    }, [])

    if(loading){
      return <ContentSpinner variant="secondary"/>
    }else{
      return (
        <>
          <NavigationBar iconShow={true} />
        </>
      )
    }
}

export default Home
