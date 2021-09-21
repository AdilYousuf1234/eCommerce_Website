import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <div className="container">
                    <div className="col-md-3 footer-grid">
                        <h3>About Us</h3>
                        <p>This is <Link to="#"> Team 15</Link></p>
                    </div>
                    <div className="col-md-3 footer-grid ">
                        <h3>Menu</h3>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/kitchen">Kitchen</Link></li>
                            <li><Link to="/care">Personal Care</Link></li>
                            <li><Link to="/house-hold">Household</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                        </ul>
                    </div>
                    <div className="col-md-3 footer-grid ">
                        <h3>Customer Services</h3>
                        <ul>
                            <li><Link to="/desclaimer">Disclaimer</Link></li>
                            <li><Link to="/faq">Faqs</Link></li>
                            <li><Link to="/privacy-and-policy">Privacy & Policy</Link></li>
                            <li><Link to="/term-and-condition">Terms &amp; Conditions</Link></li>
                        </ul>
                    </div>
                    <div className="col-md-3 footer-grid">
                        <h3>My Account</h3>
                        <ul>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/register">Register</Link></li>
                            {/* <li><Link to="wishlist">Wishlist</Link></li> */}
                        </ul>
                    </div>
                    <div className="clearfix" />
                    <div className="footer-bottom">
                        <h2><Link to="/"><b>T<br />H<br />E</b>Grocery Store<span>The Best Supermarket</span></Link></h2>
                        <p className="fo-para">This is <Link to="#"> team 15</Link></p>
                    </div>
                </div>
            </div>

        )
    }
}
