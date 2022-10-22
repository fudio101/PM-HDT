import React from "react";

import Button from "../../ui/Button";

import Search from "../../ui/Search";

import classes from "./Header.module.css";

function Header() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>LOGO</div>
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