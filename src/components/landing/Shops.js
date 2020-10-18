import React, { Component } from 'react';

class Shops extends Component {
    state = {  }
    render() { 
        return ( 
            <section className="product-filter-section">
            <div className="container">
                <div className="section-title">
                    <h2>SHOPS</h2>
                </div>
                <ul className="product-filter-menu">
    
                </ul>
                <div className="row">
                    <div className="col-lg-3 col-sm-6">
                        <div className="product-item">
                            <div className="pi-pic">
    
                                <ul className="product-filter-menu">
                                    <li><a href="https://joannakcosmetics.com/">JOANNA</a></li>
                                </ul>
    
                                <img src="./img/joanna.jpg" alt=""/>
                                {/* <!-- <div className="pi-links"> -->
                                <!-- <a href="#" className="add-card"><i className="flaticon-bag"></i><span>ADD TO CART</span></a> */}
                                    {/* <a href="#" className="wishlist-btn"><i className="flaticon-heart"></i></a> --> */}
                                {/* <!-- </div> --> */}
                            </div>
    
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                        <div className="product-item">
                            <div className="pi-pic">
    
                                <ul className="product-filter-menu">
                                    <li><a href="https://huddahstore.com/">HUDDAH</a></li>
                                </ul>
                                <img src="./img/huddah.jpg" alt=""/>
                                {/* <!-- <div className="pi-links"> -->
                                <!-- <a href="#" className="add-card"><i className="flaticon-bag"></i><span>ADD TO CART</span></a> */}
                                    {/* <a href="#" className="wishlist-btn"><i className="flaticon-heart"></i></a> --> */}
                                {/* <!-- </div> --> */}
                            </div>
    
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                        <div className="product-item">
                            <div className="pi-pic">
    
                                <ul className="product-filter-menu">
                                    <li><a href="http://paulinecosmetics.com/">CANVAS</a></li>
                                </ul>
                                <img src="./img/pauline.jpg" alt=""/>
                                {/* <!-- <div className="pi-links">
                                    <a href="#" className="add-card"><i className="flaticon-bag"></i><span>ADD TO CART</span></a>
                                    <a href="#" className="wishlist-btn"><i className="flaticon-heart"></i></a>
                                </div> --> */}
                            </div>
    
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                        <div className="product-item">
                            <div className="pi-pic">
    
                                <ul className="product-filter-menu">
                                    <li><a href="http://zaron.com.ng/">JOYLIPS</a></li>
                                </ul>
                                <img src="./img/zaron.jpg" alt=""/>
                                {/* <!-- <div className="pi-links">
                                    <a href="#" className="add-card"><i className="flaticon-bag"></i><span>ADD TO CART</span></a>
                                    <a href="#" className="wishlist-btn"><i className="flaticon-heart"></i></a>
                                </div> --> */}
                            </div>
    
                        </div>
                    </div>
    </div>
    </div>
        </section>            
         );
    }
}
 
export default Shops;