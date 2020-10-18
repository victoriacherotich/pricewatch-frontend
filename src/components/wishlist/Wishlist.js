import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {MyCredentials} from '../../protect/Protected.Route';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  
class Wishlist extends Component {
    state = { 
        wishlist: []
     }

    async componentDidMount() {
        const public_id = MyCredentials().socket_auth_users_public_id;
        const { data: wishlist } = await axios.get(`${process.env.REACT_APP_API_URL}/api/favourites/v1/favourites/${public_id}`);
		this.setState({wishlist});
		
		console.log(this.state.wishlist);
	};
	
	handleAddCart = async (event) => {
        const products_id = event.currentTarget.id;
        const price = event.currentTarget.value;
        const public_id = MyCredentials().socket_auth_users_public_id;

        await axios.post(`${process.env.REACT_APP_API_URL}/api/cart/v1/`, {public_id, products_id, price} )
        .then((response) => {
            toast(response.data.message);
        }, (error) => {
            toast('Error! cant add to cart');
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
			<ToastContainer enableMultiContainer position={toast.POSITION.BOTTOM_RIGHT} />

	<div className="page-top-info">
		<div className="container">
			<h4>Your Wishlist</h4>
			<div className="site-pagination">
				<Link to={'/'}>Home</Link> /
				<Link to={'/'}>Your Wishlist</Link>
			</div>
		</div>
	</div>
    

	<section className="cart-section spad">
		<div className="container">
			<div className="row">
				<div className="col-lg-8">
					<div className="cart-table">
						<h3>Your Wishlist</h3>
						<div className="cart-table-warp">
							<table>
							<thead>
								<tr>
									<th className="product-th">Product</th>

									{/* <!-- <th className="size-th">SizeSize</th> --> */}
									<th className="total-th">Price</th>
									<th className="total-th">Cart</th>
									
								</tr>
							</thead>
							<tbody>
                                {this.state.wishlist.map(wlist => (
                                    <tr>
                                    <td className="product-col">
                                        <img src={wlist.image} alt={wlist.title}/>
                                        <div className="pc-title">
                                            <h4>{wlist.title} </h4>
                                            <p>{wlist.brand}</p>
                                        </div>
                                    </td>
									<td className="total-col"><h4> {wlist.price} </h4></td>
									<div classRow="col-sm-6">
								
									<button onClick={this.handleAddCart} id={wlist.products_id} value={wlist.price} className="add-card"><i class="fa fa-shopping-cart" aria-hidden="true"></i>
									<span>Add to cart</span></button>
					
								</div>
                                </tr>                                    
                                ))}
                                
							</tbody>
						</table>
						</div>
					</div>
				</div>
				<div className="col-lg-4 card-right">
					
				<Link to={'products'} className="site-btn sb-dark">Continue Viewing</Link>
				<Link to={'checkout'} className="site-btn sb-dark">Proceed to cart</Link>
				</div>
			</div>
		</div>
	</section>                
            </div>
         );
    }
}
 
export default Wishlist;