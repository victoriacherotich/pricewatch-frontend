import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import {UserLoggedIn, MyCredentials} from '../../protect/Protected.Route';
import axios from 'axios';

class TopNavigation extends Component {
    state = { 
        cart: 0
     }
    handleClickLogout = async () => {
        localStorage.removeItem("jwtToken");
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/cart/v1/deletecart/` )
        .then((response) => {
            console.log(response.data.message);
        }, (error) => {
            console.log('Error! cant checkout');
        });
            console.log("User logged out");
            window.location ='/';
      };

      async componentWillUpdate() {
        const { data: cart } = await axios.get(`${process.env.REACT_APP_API_URL}/api/cart/v1/mycartcount/`);
        this.setState({cart});
    }
    
    render() { 
        return ( 
            <div>
                <header className="header-section">
                    <div className="header-top">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-2 text-center text-lg-left">
                                    {/* <!-- logo --> */}
                                    <Link to={'/'} className="site-logo">
                                        <img src="img/pw-logo.PNG" alt="logo" />
                                    </Link>
                                </div>
                                <div className="col-xl-6 col-lg-5">
                                   
                                </div>
                                <div className="col-xl-4 col-lg-5">
                                    <div className="user-panel">
                                    { !UserLoggedIn() && (
                                        <div className="up-item">
                                            <i className="flaticon-profile"></i>
                                            <Link to={'/login'}>Login</Link>
                                            {/* <!-- <a href="#">Sign</a> In or <a href="#">Create Account</a> --> */}
                                        </div>
                                    )}
                                    { !UserLoggedIn() && (
                                        <div className="up-item">
                                            <i className="flaticon-profile"></i>
                                            <Link to={'/register'}>Register</Link>
                                            {/* <!-- <a href="#">Sign</a> In or <a href="#">Create Account</a> --> */}
                                        </div>
                                    )}
                                    { UserLoggedIn() && (
                                        <div className="up-item">
                                            <i className="flaticon-profile"></i>
                                            <Link onClick={this.handleClickLogout}>Logout {MyCredentials().socket_auth_useremail}</Link>
                                            {/* <!-- <a href="#">Sign</a> In or <a href="#">Create Account</a> --> */}
                                        </div>
                                    )}
                                        <div className="up-item">
                                            <div className="shopping-card">
                                                <i className="flaticon-bag"></i>
                                                <span>{this.state.cart}</span>
                                            </div>
                                            <Link to={'/checkout'}>Your cart </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <nav className="main-navbar">
                        <div className="container">
                            <ul className="main-menu">
                                <li><Link to={'/'}>Home</Link></li>
                                <li><Link to={'/products'}>Products </Link></li>
                                { UserLoggedIn() && (<li><Link to={'/wishlist'}>Wishlist </Link></li>)}
                                <li><Link to={'/checkout'}>Checkout <div className="shopping-card"><span>{this.state.cart}</span></div></Link></li>
                                <li><Link to={'/contact'}>Contact us</Link></li>
                                { UserLoggedIn() && (
                                    <Fragment>
                                        {MyCredentials().socket_auth_user_primary_privilages === true ? 
                                            <li style={{float: "right"}}><Link to={'/'}>Dashboard</Link>
                                                <ul className="sub-menu">
                                                    <li><Link to={'/orders'}>Orders</Link></li>
                                                    <li><Link to={'/payments'}>Payments</Link></li>
                                                    <li><Link to={'/allproducts'}>Products</Link></li>
                                                    <li><Link to={'/users'}>Users</Link></li>
                                                </ul>
                                            </li>
                                        : 
                                        null}
                                    </Fragment>
                                )}
                                { UserLoggedIn() && (
                                <li style={{float: "right"}}>><Link to={'/profile'}>Profile</Link></li>
                                )}
                            </ul>
                        </div>
                    </nav>
                </header>      
            </div>
         );
    }
}
 
export default TopNavigation;