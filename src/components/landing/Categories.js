import React, { Component } from 'react';
import { Link } from '@material-ui/core';

class Categories extends Component {
    state = {  }
    render() { 
        return ( 
            <section className="product-filter-section">
            <div className="container">
            <div className="section-title">
            <h2>BROWSE TOP SELLING PRODUCTS</h2>
            </div>
            <ul className="product-filter-menu">
            <li><Link to={'/'}>TOPS</Link></li>
            <li><Link to={'/'}>JUMPSUITS</Link></li>
            <li><Link to={'/'}>LINGERIE</Link></li>
            <li><Link to={'/'}>JEANS</Link></li>
            <li><Link to={'/'}>DRESSES</Link></li>
            <li><Link to={'/'}>COATS</Link></li>
            <li><Link to={'/'}>JUMPERS</Link></li>
            <li><Link to={'/'}>LEGGINGS</Link></li>
            </ul>
            <div className="row">
            <div className="col-lg-3 col-sm-6">
            <div className="product-item">
            <div className="pi-pic">
            <img src="./img/product/5.jpg" alt=""/>
            <div className="pi-links">
            <Link to={'/'} className="add-card"><i className="flaticon-bag"></i><span>ADD TO CART</span></Link>
            <Link to={'/'} className="wishlist-btn"><i className="flaticon-heart"></i></Link>
            </div>
            </div>
            <div className="pi-text">
            <h6>$35,00</h6>
            <p>Flamboyant Pink Top </p>
            </div>
            </div>
            </div>
            <div className="col-lg-3 col-sm-6">
            <div className="product-item">
            <div className="pi-pic">
            <img src="./img/product/5.jpg" alt=""/>
            <div className="pi-links">
            <Link to={'/'} className="add-card"><i className="flaticon-bag"></i><span>ADD TO CART</span></Link>
            <Link to={'/'} className="wishlist-btn"><i className="flaticon-heart"></i></Link>
            </div>
            </div>
            <div className="pi-text">
            <h6>$35,00</h6>
            <p>Flamboyant Pink Top </p>
            </div>
            </div>
            </div>
            <div className="col-lg-3 col-sm-6">
            <div className="product-item">
            <div className="pi-pic">
            <img src="./img/product/5.jpg" alt=""/>
            <div className="pi-links">
            <Link to={'/'} className="add-card"><i className="flaticon-bag"></i><span>ADD TO CART</span></Link>
            <Link to={'/'} className="wishlist-btn"><i className="flaticon-heart"></i></Link>
            </div>
            </div>
            <div className="pi-text">
            <h6>$35,00</h6>
            <p>Flamboyant Pink Top </p>
            </div>
            </div>
            </div>
            
            <div className="col-lg-3 col-sm-6">
            <div className="product-item">
            <div className="pi-pic">
            <img src="./img/product/12.jpg" alt=""/>
            <div className="pi-links">
            <Link to={'/'} className="add-card"><i className="flaticon-bag"></i><span>ADD TO CART</span></Link>
            <Link to={'/'} className="wishlist-btn"><i className="flaticon-heart"></i></Link>
            </div>
            </div>
            <div className="pi-text">
            <h6>$35,00</h6>
            <p>Flamboyant Pink Top </p>
            </div>
            </div>
            </div>
            </div>
           
           
            </div>
            </section>        
         );
    }
}
 
export default Categories;