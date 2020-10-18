import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Joi from 'joi-browser';
import Form from '../../reusables/Form';
import {MyCredentials} from '../../protect/Protected.Route';
import Password from './Password';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  

class Profile extends Form {
    state = { 
        profile: [],
        data: { socket_auth_user_first_name: '', 
        socket_auth_user_middle_name: '', 
        socket_auth_user_last_name: '', 
        socket_auth_user_country: '', 
        socket_auth_user_state: '', 
        socket_auth_user_precise_location: '', 
        socket_auth_user_contact: '' },
        errors: {},
        carts:  []
    };

     schema = { 
        socket_auth_user_first_name: Joi.string().required().min(2).label("First name"),
        socket_auth_user_middle_name: Joi.string().min(2).label("Middle name"),
        socket_auth_user_last_name: Joi.string().required().min(2).label("Last name"),
        socket_auth_user_country: Joi.string().required().min(2).label("Country"),
        socket_auth_user_state: Joi.string().required().min(2).label("Town"),
        socket_auth_user_precise_location: Joi.string().required().min(5).label("Current Location"),
        socket_auth_user_contact: Joi.string().required().min(5).label("Phone number")
     };

     async componentDidMount() {
         const { data: carts } = await axios.get(`${process.env.REACT_APP_API_URL}/api/cart/v1/mycart/${MyCredentials().socket_auth_users_public_id}`);
        const { data: profile } = await axios.get(`${process.env.REACT_APP_API_URL}/api/profile/v1/${MyCredentials().socket_auth_users_public_id}`);         
        this.setState({profile, carts});
        // console.log(this.state.profile[0].socket_auth_user_first_name)
    }

     doSubmit = async () => {
        const obj = {...this.state.data};

        await axios.patch(`${process.env.REACT_APP_API_URL}/api/profile/v1/${MyCredentials().socket_auth_users_public_id}`, obj, { headers: {'jwtToken': localStorage.getItem('jwtToken')}} )
        .then((response) => {
            toast(response.data.message);
            window.location = '';
        }, (error) => {
            console.log(error);
            console.log('Error! cant update user profile');
        });
    };

    render() { 
        const {errors} = this.state;

        return ( 
        <section className="checkout-section spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 order-2 order-lg-1">
                     <ToastContainer enableMultiContainer position={toast.POSITION.BOTTOM_RIGHT} /> 

                    <form onSubmit={this.handleSubmit}>

                            <TextField name="socket_auth_user_first_name" type="text" style={{width:"100%"}} id="Provide first name" label="Provide first name" margin="normal" variant="outlined"
                            value={this.state.data.socket_auth_user_first_name} 
                            onChange={this.handleChange} 
                            error={errors.socket_auth_user_first_name} autoFocus 
                            placeholder="Provide first name" />
                            {errors.socket_auth_user_first_name && <span  className="spanform">{errors.socket_auth_user_first_name}</span>} 
                            
                            <TextField name="socket_auth_user_middle_name" type="text" style={{width:"100%"}} id="socket_auth_user_middle_name" label="Provide middle name" margin="normal" variant="outlined" 
                            value={this.state.data.socket_auth_user_middle_name} 
                            onChange={this.handleChange} 
                            error={errors.socket_auth_user_middle_name} autoFocus 
                            placeholder="Provide middle name" />
                            {errors.socket_auth_user_middle_name && <span  className="spanform">{errors.socket_auth_user_middle_name}</span>}

                            <TextField name="socket_auth_user_last_name" type="text" style={{width:"100%"}} id="socket_auth_user_last_name" label="Provide last name" margin="normal" variant="outlined"
                            value={this.state.data.socket_auth_user_last_name} 
                            onChange={this.handleChange} 
                            error={errors.socket_auth_user_last_name} autoFocus 
                            placeholder="Provide last name" />
                            {errors.socket_auth_user_last_name && <span  className="spanform">{errors.socket_auth_user_last_name}</span>} 
                            
                            <TextField name="socket_auth_user_country" type="text" style={{width:"100%"}} id="socket_auth_user_country" label="Provide country" margin="normal" variant="outlined" 
                            value={this.state.data.socket_auth_user_country} 
                            onChange={this.handleChange} 
                            error={errors.socket_auth_user_country} autoFocus 
                            placeholder="Provide country" />
                            {errors.socket_auth_user_country && <span  className="spanform">{errors.socket_auth_user_country}</span>}

                            <TextField name="socket_auth_user_state" type="text" style={{width:"100%"}} id="socket_auth_user_state" label="Provide Town" margin="normal" variant="outlined"
                            value={this.state.data.socket_auth_user_state} 
                            onChange={this.handleChange} 
                            error={errors.socket_auth_user_state} autoFocus 
                            placeholder="Provide Town" />
                            {errors.socket_auth_user_state && <span  className="spanform">{errors.socket_auth_user_state}</span>} 
                            
                            <TextField name="socket_auth_user_precise_location" type="text"  style={{width:"100%"}} id="socket_auth_user_precise_location" label="Provide location" margin="normal" variant="outlined" 
                            value={this.state.data.socket_auth_user_precise_location} 
                            onChange={this.handleChange} 
                            error={errors.socket_auth_user_precise_location} autoFocus 
                            placeholder="Provide location" />
                            {errors.socket_auth_user_precise_location && <span  className="spanform">{errors.socket_auth_user_precise_location}</span>}

                            <TextField name="socket_auth_user_contact" type="text" style={{width:"100%"}} id="socket_auth_user_contact" label="Provide valid number" margin="normal" variant="outlined"
                            value={this.state.data.socket_auth_user_contact} 
                            onChange={this.handleChange} 
                            error={errors.socket_auth_user_contact} autoFocus 
                            placeholder="Provide valid number" />
                            {errors.socket_auth_user_contact && <span  className="spanform">{errors.socket_auth_user_contact}</span>} 

                            <Button type="submit" variant="outlined" color="primary" >Update profile</Button>                           
                        </form>                        
                    </div>
                    <div className="col-lg-8 order-2 order-lg-1">
                    {this.state.profile.map(myProfile => (
                            <div>
                            <p style={{textAlign:"center",display:"flex",flexDirection:"column",fontSize:"17px",lineHeight:"1.5 !important",alignItems: "center"}} key={myProfile.socket_auth_users_public_id}>
                                <img src={process.env.REACT_APP_API_URL+'/'+myProfile.socket_auth_user_file} alt={myProfile.socket_auth_user_first_name} style={{width: "150px",height: "150px",borderRadius: "50%"}} />
                                Name: {myProfile.socket_auth_user_first_name} {myProfile.socket_auth_user_middle_name} {myProfile.socket_auth_user_last_name} <br />
                                Country: {myProfile.socket_auth_user_country} <br />
                                Town: {myProfile.socket_auth_user_state} <br />
                                Contact: {myProfile.socket_auth_user_contact} <br /><br />
                            </p>
                            </div>
                        ))}   
                    <Password />
                    </div>
                </div>
                        <br />
                <div className="row">
				<div className="col-lg-12 order-2 order-lg-1">


                <div className="cart-table">
						<div className="cart-table-warp">
                        <table
                      id="example"
                      className="display nowrap"
                      style={{ width: "100%" }}
                    >
                      <thead>
                        <tr>
                        <th>name</th>
                            <th>contact</th>
                            <th>file</th>
                            <th>quantity</th>
                            <th>price</th>
                            <th>time</th>
                            <th>title</th>
                            <th>image</th>
                            <th>brand</th>
                            <th>category</th>
                         </tr>
                      </thead>
                      <tbody>
                        {this.state.carts.map(cart => (
                          <tr>
                            <td>{cart.title}</td>
                            <td>{cart.brand}</td>
                            <td><img alt="asd" src={cart.socket_auth_user_file} style={{height:"30px",width:"30px"}} /></td>
                            <td>{cart.quantity}</td>
                            <td>{cart.total_price}</td>
                            <td>{cart.time_added_to_cart}</td>
                            <td>{cart.title}</td>
                            <td><img alt="asd" src={cart.image} style={{height:"30px",width:"30px"}} /></td>
                            <td>{cart.brand}</td>
                            <td>{cart.category}</td>
                           
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                        <th>name</th>
                            <th>contact</th>
                            <th>file</th>
                            <th>quantity</th>
                            <th>price</th>
                            <th>time</th>
                            <th>title</th>
                            <th>image</th>
                            <th>brand</th>
                            <th>category</th>
                         </tr>
                      </tfoot>
                    </table>
						</div>
					</div>


				</div>                    
                </div>
            </div>
        </section>    
         );
    }
}
 
export default Profile;