

const initState={
    routes:[
        {link:"/admin", tag:["dashboard"]},
        {link:"/admin/users", tag:["users"]},
        {link:"/admin/product", tag:["Create Products", "Edit Products", "Delete Products"]},
        {link:"/admin/category", tag:["Create category", "Edit category", "Delete Category"]},
        {link:"/admin/banners", tag:["Banner", "Create banner", "Remove banner"]},
        {link:"/admin/orders?page=1", tag:["Orders", "Manage Orders"]},
        {link:"/admin/offer_coupons", tag:["Offers", "Coupons", "Create Coupons", "Edit Coupons", "Delete Coupons", "Edit Offers", "Delete Offers"]},
        {link:"/admin/sales_report?page=1&year=2021&month=12&startDay=1&endDay=31", tag:["Sales Report", "Download Sales Report"]},
        {link:"/admin/settings", tag:["Settings", "Change Profile Pitchure", "Change Password"]}
    ]
}


const adminRouteReducer=function (state=initState, action){
    switch(action.type){
        default:
            return state;
    }
}


export default adminRouteReducer;