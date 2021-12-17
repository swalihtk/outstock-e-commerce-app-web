import React from 'react'

function HomeFooter() {
    return (
        <>
          
<footer className="page-footer font-small stylish-color-dark pt-4" style={{background:"black", color:"white"}}>

  <div className="container text-center text-md-left">

  
    <div className="row">

      <div className="col-md-4 mx-auto">

        <h5 className="font-weight-bold text-uppercase mt-3 mb-4" style={{color:"white"}}>About Us</h5>
        <p>E-commerce is revolutionizing the way we all shop in India. Why do you want to hop from one store to another in search of the latest phone when you can find it on the Internet in a single click? Not only mobiles. Outstock houses everything you can possibly imagine, from trending electronics like laptops, tablets, smartphones, and mobile accessories to in-vogue fashion staples like shoes, clothing and lifestyle accessories.</p>

      </div>
    

      <hr className="clearfix d-md-none" style={{width:"93vw"}}/>
      <div className="col-md-2 mx-auto">

     
        <h5 className="font-weight-bold text-uppercase mt-3 mb-4" style={{color:"white"}}>Most Searched</h5>

        <ul className="list-unstyled footer__links">
          <li>
            <a href="#!">Mobiles</a>
          </li>
          <li>
            <a href="#!">Computers</a>
          </li>
          <li>
            <a href="#!">Gaming</a>
          </li>
          <li>
            <a href="#!">Accessories</a>
          </li>
        </ul>

      </div>
  

      <hr className="clearfix d-md-none" style={{width:"93vw"}}/>

   
      <div className="col-md-2 mx-auto">

       
        <h5 className="font-weight-bold text-uppercase mt-3 mb-4" style={{color:"white"}}>MOBILES</h5>

        <ul className="list-unstyled footer__links">
          <li>
            <a href="#!">Samsung Note9</a>
          </li>
          <li>
            <a href="#!">iPhone 128GB</a>
          </li>
          <li>
            <a href="#!">Mobile Offers</a>
          </li>
          <li>
            <a href="#!">Redmi 5A</a>
          </li>
        </ul>

      </div>
      
      <hr className="clearfix d-md-none" style={{width:"93vw"}}/>
     
      <div className="col-md-2 mx-auto">

       
        <h5 className="font-weight-bold text-uppercase mt-3 mb-4" style={{color:"white"}}>CAMERAS</h5>

        <ul className="list-unstyled footer__links">
          <li>
            <a href="#!">Go Pro</a>
          </li>
          <li>
            <a href="#!">Nikon Camera</a>
          </li>
          <li>
            <a href="#!">Sony Camera</a>
          </li>
          <li>
            <a href="#!">Canon DSLR</a>
          </li>
        </ul>

      </div>
     

    </div>
   

  </div>
 

  <hr/>


  <ul className="list-unstyled list-inline text-center">
    <li className="list-inline-item">
      <a className="btn-floating btn-fb mx-1">
        <i className="fab fa-facebook-f"> </i>
      </a>
    </li>
    <li className="list-inline-item">
      <a className="btn-floating btn-tw mx-1">
        <i className="fab fa-twitter"> </i>
      </a>
    </li>
    <li className="list-inline-item">
      <a className="btn-floating btn-gplus mx-1">
        <i className="fab fa-google-plus-g"> </i>
      </a>
    </li>
    <li className="list-inline-item">
      <a className="btn-floating btn-li mx-1">
        <i className="fab fa-linkedin-in"> </i>
      </a>
    </li>
    <li className="list-inline-item">
      <a className="btn-floating btn-dribbble mx-1">
        <i className="fab fa-dribbble"> </i>
      </a>
    </li>
  </ul>
  
  <div className="footer-copyright text-center py-3">© {new Date().getFullYear()} Copyright:
    <a href="/"> {
      window.location.host
    }</a>
  </div>
 
</footer>
 </>
    )
}

export default HomeFooter;
