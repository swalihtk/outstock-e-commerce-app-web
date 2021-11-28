import React from 'react'
import NavigationBar from '../../../layouts/user/NavigationBar';
import ProfileNavigation from './ProfileNavigation';
import "./style.css";

function Index() {

    return (
        <>
        <NavigationBar iconShow={true}/>
        <ProfileNavigation />
        </>
    )
}

export default Index
