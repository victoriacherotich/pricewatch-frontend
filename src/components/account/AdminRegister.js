import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Form from '../../reusables/Form';
import axios from 'axios';
import Joi from 'joi-browser';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  

class AdminRegister extends Form {
    state = { 
        data: { socket_auth_username: '', socket_auth_useremail: '', socket_auth_userpassword: '' },
        errors: {}
     };

    schema = { 
        socket_auth_username: Joi.string().required().min(5).label("Username"),
        socket_auth_useremail: Joi.string().required().min(8).email().label("Email"),
        socket_auth_userpassword: Joi.string().required().min(8).label("Password"),
    };

    doSubmit = async () => {
        const obj = {...this.state.data};

        await axios.post(`${process.env.REACT_APP_API_URL}/api/registration/admin/v1/`, obj)
        .then((response) => {
            toast(response.data.message);
            window.location = '/';
        }, (error) => {
            console.log(error);
            console.log('Error! cant register new user');
        });
        
    };

    render() { 
        const {errors} = this.state;
        return ( 
            <div className="container-login100" >
            <div className="adminlogincontainer">
                <Card className="adminlogincontainercenter">
                    <CardContent>
                    <h4 style={{textAlign:"center"}}>Pricewatch: ADMIN SETUP</h4>
                    <ToastContainer enableMultiContainer position={toast.POSITION.BOTTOM_RIGHT} />
                    <form onSubmit={this.handleSubmit}>
                        <TextField name="socket_auth_username" style={{width:"100%"}} id="socket_auth_username" label="Provide username" margin="normal" variant="outlined" 
                        value={this.state.data.socket_auth_username} 
                        onChange={this.handleChange} 
                        error={errors.socket_auth_username} autoFocus 
                        placeholder="Provide username" />
                        {errors.socket_auth_username && <span style={{marginLeft: "12%"}}>{errors.socket_auth_username}</span>}

                        <TextField name="socket_auth_useremail" type="email" style={{width:"100%"}} id="socket_auth_useremail" label="Provide valid email" margin="normal" variant="outlined"
                        value={this.state.data.socket_auth_useremail} 
                        onChange={this.handleChange} 
                        error={errors.socket_auth_useremail} autoFocus 
                        placeholder="Provide valid email" />
                        {errors.socket_auth_useremail && <span style={{marginLeft: "12%"}}>{errors.socket_auth_useremail}</span>} 

                        <TextField name="socket_auth_userpassword" type="password" style={{width:"100%"}} id="socket_auth_userpassword" label="Provide password" margin="normal" variant="outlined" 
                        value={this.state.data.socket_auth_userpassword} 
                        onChange={this.handleChange} 
                        error={errors.socket_auth_userpassword} autoFocus 
                        placeholder="Provide valid password" />
                        {errors.socket_auth_userpassword && <span style={{marginLeft: "12%"}}>{errors.socket_auth_userpassword}</span>}

                        <Button type="submit" variant="outlined" color="primary" >Register</Button>                           
                    </form>

                </CardContent>
                </Card>
            </div>
          </div>
         );
    }
}
 
export default AdminRegister;