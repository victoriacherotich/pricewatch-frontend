import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Form from '../../reusables/Form';
import axios from 'axios';
import Joi from 'joi-browser';
import ButtonGroup from '@material-ui/core/ButtonGroup';
// import FacebookLogin from 'react-facebook-login';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  

class Login extends Form {
    state = {
        data: { socket_auth_useremail: '', socket_auth_userpassword: '' },
        errors: {},
        showReset: false
    };
    
    schema = {
        socket_auth_useremail: Joi.string().required().min(5).email().label('Email'),
        socket_auth_userpassword: Joi.string().required().min(8).label('Password')
    };

    handleVisibility = () => {
        this.setState({showReset: true});
    }

    doSubmit = async () => {
        const obj = {...this.state.data};

        await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/v1/`, obj)
        .then((response) => {
            if(response.data.message){
                return toast(response.data.message);
            }else{
                // toast('Loged in successfuly');
                localStorage.setItem('jwtToken', response.data.jwtToken);
                window.location = '/';
            }
        }, (error) => {
            console.log('Error! Login failed');
        });
    };

    

    render() { 
                const {errors} = this.state;

        return ( 
            <div className="container-login100" >
            <div>
                <ToastContainer enableMultiContainer position={toast.POSITION.BOTTOM_RIGHT} />
                <form onSubmit={this.handleSubmit}>
                    <TextField name="socket_auth_useremail" type="email" style={{width:"100%"}} id="outlined-uncontrolled" label="Provide email" margin="normal" variant="outlined" 
                    value={this.state.data.socket_auth_useremail} 
                    onChange={this.handleChange} 
                    error={errors.socket_auth_useremail} autoFocus 
                    placeholder="Provide email" />
                    {errors.socket_auth_useremail && <span  className="spanform">{errors.socket_auth_useremail}</span>}

                    <TextField name="socket_auth_userpassword" type="password" style={{width:"100%"}} id="outlined-uncontrolled" label="Provide pasword" margin="normal" variant="outlined" 
                    value={this.state.data.socket_auth_userpassword} 
                    onChange={this.handleChange} 
                    error={errors.socket_auth_userpassword} autoFocus 
                    placeholder="Provide pasword" />
                    {errors.socket_auth_userpassword && <span  className="spanform">{errors.socket_auth_userpassword}</span>}

                    <Button type="submit" variant="outlined" color="primary" >Login</Button>   
                    <span onClick={this.handleVisibility} style={{textAlignLast: "right",float: "right"}}>Forgot your password?</span>                     
                </form>
                <hr />
                {this.state.showReset === true? 
                    <div>
                        {/* <ForgotPassword /> */}
                        <hr />
                    </div>
                : null }
                <ButtonGroup style={{flex: "100% !important", textAlign:"center"}} color="secondary" size="large" aria-label="large outlined secondary button group" >
                  

                   
                </ButtonGroup>


            </div>
          </div>
         );
    }
}
 
export default Login;