import React from 'react';
import { Link } from 'react-router-dom';
import Form from '../../reusables/Form';
import axios from 'axios';
import Joi from 'joi-browser';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  

class Contact extends Form {
    state = {
        data: { 
            name: "", 
            email: "", 
            subject: "", 
            message: ""
         },
        errors: {},
        showReset: false
    };
    
    
    schema = {
        name: Joi.string().required().label('name'),
        email: Joi.string().required().email().label('email'),
        subject: Joi.string().required().label('subject'),
        message: Joi.string().required().label('message')
    };

    handleVisibility = () => {
        this.setState({showReset: true});
    }

    doSubmit = async () => {
        const obj = {...this.state.data};

        await axios.post(`${process.env.REACT_APP_API_URL}/api/registration/v1/mail/`, obj)
        .then((response) => {
            toast('Mail sent');
        }, (error) => {
            toast('Error! sending mail');
        });
    };

    render() { 
        const {errors} = this.state;

        return ( 
            <div>
            <ToastContainer enableMultiContainer position={toast.POSITION.BOTTOM_RIGHT} />

	<div className="page-top-info">
		<div className="container">
			<h4>Contact</h4>
			<div className="site-pagination">
				<Link to={'/'} >Home</Link> /
				<Link to={'/'} >Contact</Link>
			</div>
		</div>
	</div>
    
	<section className="contact-section">
		<div className="container">
			<div className="row">
				<div className="col-lg-6 contact-info">
					<h3>Get in touch</h3>
					<p>P.O Box 14709-00100 Nairobi</p>
					<p>0722434215</p>
					<p>priceWatchh@gmail.com</p>
					<div className="contact-social">
					
						<Link to={'/'} ><i className="fa fa-facebook"></i></Link>
						<Link to={'/'} ><i className="fa fa-twitter"></i></Link>
						<Link to={'/'} ><i className="fa fa-instagram"></i></Link>
						
					</div>
					<form className="contact-form" onSubmit={this.handleSubmit}>
						<input type="text" placeholder="Your name" name="name"
                        value={this.state.data.name} 
                        onChange={this.handleChange} 
                        error={errors.name} autoFocus 
                        placeholder=" name" />
                        {errors.name && <span  className="spanform">{errors.name}</span>}

						<input type="text" placeholder="Your e-mail" name="email"
                        value={this.state.data.email} 
                        onChange={this.handleChange} 
                        error={errors.email} autoFocus 
                        placeholder=" email" />
                        {errors.email && <span  className="spanform">{errors.email}</span>}

						<input type="text" placeholder="Subject" name="subject"
                        value={this.state.data.subject} 
                        onChange={this.handleChange} 
                        error={errors.subject} autoFocus 
                        placeholder="Subject" />
                        {errors.subject && <span  className="spanform">{errors.subject}</span>}

                        <input placeholder="Message" name="message"
                        value={this.state.data.message} 
                        onChange={this.handleChange} 
                        error={errors.message} autoFocus 
                        placeholder="Message" />
                        {errors.message && <span  className="spanform">{errors.message}</span>}
						<button type="submit" className="site-btn">SEND</button>
					</form>
				</div>
			</div>
		</div>
		<div className="map"><iframe title="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.97226858406!2d36.92597141380413!3d-1.179959799139331!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f3f0c168e861b%3A0x183612397f97a51e!2sKenyatta%20University!5e0!3m2!1sen!2ske!4v1580455332071!5m2!1sen!2ske" width="600" height="450" frameborder="0" style={{border:"0"}} allowfullscreen=""></iframe></div>
	</section>                
            </div>
         );
    }
}
 
export default Contact;