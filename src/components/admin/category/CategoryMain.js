import React from 'react'
import AdminDashboard from '../../../layouts/admin/AdminDashboard'
import CategoryShow from './CategoryShow'

function CategoryMain() {
    return (
        <>
        <AdminDashboard container={<CategoryShow />}/>  
        </>
    )
}

export default CategoryMain
