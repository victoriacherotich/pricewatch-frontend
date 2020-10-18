import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {
    state = {  }
    render() { 
        return ( 

            <section className="footer-section">
            <div className="container">
                <div className="footer-logo text-center">
                    {/* <!-- <a href="index.html"><img src="./img/pw-logo.PNG" alt=""></Link> --> */}
                </div>
                <div className="row">
                    <div className="col-lg-3 col-sm-6">
                        <div className="footer-widget about-widget">
                            <h2>About</h2>
                            <p>PriceWatch is dedicated to making your cosmetic shopping experious easier by providing a
                                platform for you to search for products and compare
                                prices from some of the top retailers in the country .</p>
                            {/* <!-- <img src="img/cards.png" alt=""> --> */}
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                        <div className="footer-widget about-widget">
                            <h2>Online Shops</h2>
                            <ul>
                                <li><Link to={'/'}>JoannaK cosmetics</Link></li>
                                <li><Link to={'/'}>Canvas cosmetic</Link></li>
                                <li><Link to={'/'}>Huddah cosmetic</Link></li>
                                <li><Link to={'/'}>Joylips cosmetics</Link></li>
    
                            </ul>
                            {/* <!-- <ul>
                                <li><Link to={'/'}>Partners</Link></li>
                                <li><Link to={'/'}>Bloggers</Link></li>
                                <li><Link to={'/'}>Support</Link></li>
                                <li><Link to={'/'}>Terms of Use</Link></li>
                                <li><Link to={'/'}>Press</Link></li>
                            </ul> --> */}
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                        <div className="footer-widget about-widget">
                            <h2>Contact</h2>
                            <ul>
                                <li><Link to={'/'}>P.O Box 14709-00100 Nairobi</Link></li>
                                <li><Link to={'/'}>pricewatch@gmail.com</Link></li>
                                <li><Link to={'/'}>0722434215</Link></li>
    
    
                            </ul>
                        </div>
    
                    </div>
                    <div className="social-links-warp">
                        <div className="container">
                            <div className="social-links">
                                <Link to={'/'} className="instagram"><i className="fa fa-instagram"></i><span>instagram</span></Link>
                                <Link to={'/'} className="facebook"><i className="fa fa-facebook"></i><span>facebook</span></Link>
                                <Link to={'/'} className="twitter"><i className="fa fa-twitter"></i><span>twitter</span></Link>
    
                            </div>
    
                        </div>
                    </div>
                    </div>
                    </div>
        </section>            
         );
    }
}
 
export default Footer;