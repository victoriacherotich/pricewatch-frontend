import React  from 'react';
import { Link } from 'react-router-dom';
import {UserLoggedIn} from '../../protect/Protected.Route';
import axios from 'axios';
import { Button } from '@material-ui/core';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {MyCredentials} from '../../protect/Protected.Route';
import Form from '../../reusables/Form';
// import { PayPalButton } from "react-paypal-button-v2";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
class Checkout extends Form {
    state = { 
        carts: [],
        carttotal: 0,
        openaccount: false,
        anchorEl: null
     }


    handleaccountOpen = (e) => {
    this.setState({openaccount: true});
    };
    handleaccountClose = () => {
    this.setState({openaccount: false});
    };

    async componentDidMount() {
        // const public_id = 0;
        const { data: carts } = await axios.get(`${process.env.REACT_APP_API_URL}/api/cart/v1/mycart/`);
        const { data: carttotal } = await axios.get(`${process.env.REACT_APP_API_URL}/api/cart/v1/mycartTotal/`);
        this.setState({carts, carttotal});
    };

    doUpdate = async (e) => {
        const { data: carts } = await axios.get(`${process.env.REACT_APP_API_URL}/api/cart/v1/mycart/`);
        const { data: carttotal } = await axios.get(`${process.env.REACT_APP_API_URL}/api/cart/v1/mycartTotal/`);
        this.setState({carts, carttotal});
    };

    handleAdd = async (e) => {
        const cart_id =e.currentTarget.id;
        const price =e.currentTarget.value;

        await axios.patch(`${process.env.REACT_APP_API_URL}/api/cart/v1/quantity/${cart_id}`, {price} )
        .then((response) => {
            console.log(response.data.message);
            this.doUpdate();
        }, (error) => {
            console.log('Error! cant add quantity');
        });
    };

    handleMinus = async (e) => {
        const cart_id =e.currentTarget.id;
        const price =e.currentTarget.value;

        await axios.patch(`${process.env.REACT_APP_API_URL}/api/cart/v1/quantityminus/${cart_id}`, {price} )
        .then((response) => {
            console.log(response.data.message);
            this.doUpdate();
        }, (error) => {
            console.log('Error! cant remove quantity');
        });
    };

    handleCheckout = async (e) => {
        
        const public_id = MyCredentials().socket_auth_users_public_id;

        await axios.patch(`${process.env.REACT_APP_API_URL}/api/cart/v1/${public_id}` )
        .then((response) => {
            console.log(response.data.message);
            this.doUpdate();
            this.handleaccountOpen();
        }, (error) => {
            console.log('Error! cant checkout');
        });
    }

    handleClearCart = async (e) => {
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/cart/v1/deletecart/` )
        .then((response) => {
            console.log(response.data.message);
            this.doUpdate();
        }, (error) => {
            console.log('Error! cant checkout');
        });
    }
    handleDelete = async (e) => {
        const cart_id =e.currentTarget.id;
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/cart/v1/deletecartsingle/${cart_id}` )
        .then((response) => {
            console.log(response.data.message);
            this.doUpdate();
        }, (error) => {
            console.log('Error! cant checkout');
        });
    }
    
    render() { 
        return ( 
            <div>
	<div className="page-top-info">
		<div className="container">
			<h4>Your cart</h4>
			<div className="site-pagination">
				<Link to={'/'}>Home</Link> /
				<Link to={'/'}>Your cart</Link>
			</div>
		</div>
	</div>
    
    <Dialog open={this.state.openaccount} onClose={this.handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" >
    <DialogTitle id="alert-dialog-title">{"Account"}</DialogTitle>
    <DialogContent>
        </DialogContent>
    <DialogActions>
    <Button onClick={this.handleaccountClose} color="primary" autoFocus>
        Close
    </Button>
    </DialogActions>
    </Dialog>

	<section className="checkout-section spad">
		<div className="container">
			<div className="row">
				<div className="col-lg-8 order-2 order-lg-1">


                <div className="cart-table">
						<div className="cart-table-warp">
							<table>
							<thead>
								<tr>
									<th className="product-th">Product</th>
									<th className="quy-th">Quantity</th>
									{/* <!-- <th className="size-th">SizeSize</th> --> */}
									<th className="total-th">Price</th>
									<th className="total-th">Delete</th>

								</tr>
							</thead>
							<tbody>
                                {this.state.carts.map(cart => (
                                    <tr>
                                    <td className="product-col">
                                        <img src={cart.image} alt={cart.title}/>
                                        <div className="pc-title">
                                            <h4>{cart.title} </h4>
                                            <p>{cart.brand}</p>
                                        </div>
                                    </td>
                                    <td className="quy-col">
                                        <div className="quantity">
                                            <div>
                                            
                                            {/* <button>Add</button> */}
<ButtonGroup style={{flex: "100% !important",  textAlign:"center"}} color="secondary" size="small" aria-label="large outlined secondary button group" >
<Button onClick={this.handleMinus} id={cart.cart_id} name={cart.quantity} value={cart.price} variant="outlined" >-</Button>
<Button variant="outlined" >{cart.quantity}</Button>
<Button onClick={this.handleAdd} id={cart.cart_id} name={cart.quantity} value={cart.price} variant="outlined" >+</Button>
</ButtonGroup> 

                                            </div>
                                        </div>
                                    </td>
                                    {/* <!-- <td className="size-col"><h4>Size M</h4></td> --> */}
									<td className="total-col"><h4> {cart.total_price} </h4></td>
									<div classRow="col-sm-6">
								
									<button onClick={this.handleDelete} id={cart.cart_id} className="add-card">
									<span>DELETE</span></button>
									</div>
                                </tr>                                    
                                ))}
                                
							</tbody>
						</table>
						</div>
                        <div className="total-cost">
                            <h6>Total <span>ksh {this.state.carttotal}</span></h6>
                             </div>
					</div>

                    <button onClick={this.handleClearCart} className="site-btn submit-order-btn">Clear cart</button>

				</div>
				<div className="col-lg-4 order-1 order-lg-2">
                <form className="checkout-form">
						{/* <div className="cf-title">Billing / delivery Address</div> */}
						{/* <div className="row">
							<div className="col-md-7">
								<p>*Billing Information</p>
							</div>
							<div className="col-md-5">
								<div className="cf-radio-btns address-rb">
									<div className="cfr-item">
										<input type="radio" name="pm" id="one"/>
										<label for="one">Use my regular address</label>
									</div>
									<div className="cfr-item">
										<input type="radio" name="pm" id="two"/>
										<label for="two">Use a different address</label>
									</div>
								</div>
							</div>
						</div> */}
						<div className="row address-inputs">
							<div className="col-md-12">
								<input type="text" placeholder="Town"/>
								<input type="text" placeholder="Presice location"/>
								<input type="text" placeholder="Country"/>
								<input type="text" placeholder="Phone no."/>
								<input type="text" placeholder="Additional notes"/>
							</div>
						</div>
						{/* <div className="cf-title">Delievery Info</div>
						<div className="row shipping-btns">
							<div className="col-6">
								<h4>Standard</h4>
							</div>
							<div className="col-6">
								<div className="cf-radio-btns">
									<div className="cfr-item">
										<input type="radio" name="shipping" id="ship-1"/>
										<label for="ship-1">Free</label>
									</div>
								</div>
							</div>
							<div className="col-6">
								<h4>Next day delievery  </h4>
							</div>
							<div className="col-6">
								<div className="cf-radio-btns">
									<div className="cfr-item">
										<input type="radio" name="shipping" id="ship-2"/>
										<label for="ship-2">$3.45</label>
									</div>
								</div>
							</div>
						</div> */}
                    </form>
                        { UserLoggedIn() && (
							<div>

							
                            <form action="http://localhost/pay/pesapal-iframe.php" target="newTab" method="post">
                            <input hidden type="text"  name="amount" value={this.state.carttotal} />
                            <input hidden type="text" name="type" value="MERCHANT" readonly="readonly" />
                            <input hidden type="text" name="description" value="Order Description" />
                            <input hidden type="text" name="reference" value="001" />
                            <input hidden type="text" name="first_name" value="John" />
                            <input hidden type="text" name="last_name" value="Doe" />
                            <input hidden type="text" name="email" value="john@yahoo.com" />
                            <button className="site-btn submit-order-btn" onClick={this.handleCheckout} type="submit" >Make mobile Payment</button>
                            </form>



							{/*<button onClick={this.handleCheckout} className="site-btn submit-order-btn">Place Order</button>*/}
							</div>
                        )}
                        { !UserLoggedIn() && (
                        <a href="#" className="site-btn submit-order-btn">Login to make purchase </a>
                        )}
				</div>
			</div>
		</div>
	</section>       
	         
            </div>
         );
    }
}
 
export default Checkout;