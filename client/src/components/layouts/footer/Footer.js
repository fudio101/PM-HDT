import React from "react";
import { Link, NavLink } from "react-router-dom";

import classes from "./Footer.module.css";
import logo from "../logo.png";

function Footer() {
    return (
        <footer className={classes.footer}>
            <ul className={classes.footer__nav}>
                <li className={classes.footer__item}>
                    <NavLink className={classes.footer__link}>About</NavLink>
                </li>
                <li className={classes.footer__item}>
                    <NavLink className={classes.footer__link}>Pricing</NavLink>
                </li>
                <li className={classes.footer__item}>
                    <NavLink className={classes.footer__link}>
                        Terms of Use
                    </NavLink>
                </li>
                <li className={classes.footer__item}>
                    <NavLink className={classes.footer__link}>
                        Privacy Policy
                    </NavLink>
                </li>

                <li className={classes.footer__item}>
                    <NavLink className={classes.footer__link}>
                        Contact Us
                    </NavLink>
                </li>
            </ul>
            <div className={classes.footer__logo}>
                <Link to={"/"} className={classes.logo_box}>
                    <img className={classes.logo} src={logo} alt="Logo" />
                </Link>
            </div>
            <p className={classes.footer__copyright}>
                &copy; Copyright by Group PMHDT
            </p>
        </footer>
    );
}

export default Footer;
