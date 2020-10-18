import React from 'react';
import {MyCredentials} from '../../protect/Protected.Route';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Form from '../../reusables/Form';
import axios from 'axios';
import Joi from 'joi-browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  

class Password extends Form {
    state = { 
        data: { socket_auth_userpassword: '' },
        errors: {}
     };

    schema = {
        socket_auth_userpassword: Joi.string().required().min(8).label('Password')
    };

    doSubmit = async () => {
        const obj = {...this.state.data};

        await axios.patch(`${process.env.REACT_APP_API_URL}/api/registration/v1/${MyCredentials().socket_auth_users_public_id}`, obj)
        .then((response) => {
            return toast(response.data.message);
        }, (error) => {
            console.log('Error! password change failed');
        });
    };    

    render() { 
        const {errors} = this.state;

        return ( 
            <div>
                <ToastContainer enableMultiContainer position={toast.POSITION.BOTTOM_RIGHT} />
                <form onSubmit={this.handleSubmit}>
                    <TextField name="socket_auth_userpassword" type="password" style={{width:"100%"}} id="outlined-uncontrolled" label="Provide pasword" margin="normal" variant="outlined" 
                    value={this.state.data.socket_auth_userpassword} 
                    onChange={this.handleChange} 
                    error={errors.socket_auth_userpassword} autoFocus 
                    placeholder="Provide pasword" />
                    {errors.socket_auth_userpassword && <span  className="spanform">{errors.socket_auth_userpassword}</span>}

                    <Button type="submit" variant="outlined" color="primary" >Change password</Button>                           
                </form>                
            </div>
         );
    }
}
 
export default Password;