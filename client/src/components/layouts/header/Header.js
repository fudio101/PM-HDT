import React from "react";

// import Button from "../../ui/Button";

import Search from "../../ui/Search";

import classes from "./Header.module.css";

import logo from "./logo.png";

function Header({ isVisible }) {
    console.log(isVisible);
    return (
        <header
            className={`${classes.header} ${
                !isVisible ? classes.hidden_header : ""
            }`}
        >
            <img className={classes.logo} src={logo} />
            <nav className={classes.nav}>
                <ul>
                    <li>
                        <Search />
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
