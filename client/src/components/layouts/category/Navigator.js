import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import Categories from "./Categories";

import classes from "./Navigator.module.css";

function Navigator(props) {
    const [visibleCate, setVisibleCate] = useState(false);
    return (
        <>
            <div className={classes.navigator}>
                <nav>
                    <ul>
                        <li>
                            <NavLink
                                className={(navLink) =>
                                    navLink.isActive ? classes.active : ""
                                }
                                to={"/home"}
                            >
                                Home
                            </NavLink>
                        </li>
                        <li
                            onMouseEnter={() => setVisibleCate(true)}
                            onMouseLeave={() => setVisibleCate(false)}
                        >
                            <NavLink
                                className={(navLink) =>
                                    navLink.isActive ? classes.active : ""
                                }
                                to={"/categories"}
                            >
                                Category
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                className={(navLink) =>
                                    navLink.isActive ? classes.active : ""
                                }
                                to={"/lastest"}
                            >
                                Lastest
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                className={(navLink) =>
                                    navLink.isActive ? classes.active : ""
                                }
                                to={"/popular"}
                            >
                                Popular
                            </NavLink>
                        </li>

                        <li>
                            <div
                                className={classes.contact}
                                onClick={props.onClick}
                            >
                                About
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>
            <Categories hidden={visibleCate} />
        </>
    );
}

export default Navigator;
