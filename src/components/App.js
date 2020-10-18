import React, { Component, Fragment } from 'react';
import TopNavigation from './navigation/TopNavigation';
import Landing from './landing/Landing';
import Footer from './footer/Footer';
import { Route, Switch } from "react-router-dom";
import Products from './categories/Products';
import Wishlist from './wishlist/Wishlist';
import Checkout from './checkout/Checkout';
import Contact from './contact/Contact';
import Login from './account/Login';
import Register from './account/Register';
import Orderes from './admin/Orderes';
import Payments from './admin/Payments';
import AllProducts from './admin/AllProducts';
import Users from './admin/Users';
import AdminRegister from './account/AdminRegister';
import axios from 'axios';
import {ProtectAdminRoute, ProtectedRoute} from '../protect/Protected.Route';
import Profile from './account/Profile';

class App extends Component {
    state = {
        adminTrue: []
    };

    async componentDidMount() {
        const { data: adminTrue } = await axios.get(`${process.env.REACT_APP_API_URL}/api/registration/v1/`);
        this.setState({adminTrue});
    };
    render() { 
        const { adminTrue } = this.state;
        return ( 
            <Fragment>
                {adminTrue === false ? 
                    <div>
                        <TopNavigation />
                        <AdminRegister />
                        <Footer />
                    </div>                
                :
                    <div>
                        <TopNavigation />
                        <Switch>
                            <Route exact path={'/'} component={Landing} />
                            <Route exact path={'/products'} component={Products} />
                            <ProtectedRoute exact path={'/wishlist'} component={Wishlist} />
                            <Route exact path={'/checkout'} component={Checkout} />
                            <Route exact path={'/contact'} component={Contact} />
                            <Route exact path={'/login'} component={Login} />
                            <ProtectedRoute exact path={'/profile'} component={Profile} />
                            <Route exact path={'/register'} component={Register} />
                            <ProtectAdminRoute exact path={'/orders'} component={Orderes} />
                            <ProtectAdminRoute exact path={'/payments'} component={Payments} />
                            <ProtectAdminRoute exact path={'/allproducts'} component={AllProducts} />
                            <ProtectAdminRoute exact path={'/users'} component={Users} />
                            <Route exact path={'/adminregister'} component={AdminRegister} />
                        </Switch>
                        <Footer />
                    </div>
                }                

            </Fragment>
         );
    }
}
 
export default App;