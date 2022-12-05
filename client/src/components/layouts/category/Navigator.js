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
                                Trang Chủ
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
                                to={""}
                            >
                                Danh Mục
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                className={(navLink) =>
                                    navLink.isActive ? classes.active : ""
                                }
                                to={"/lastest"}
                            >
                                Mới Nhất
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                className={(navLink) =>
                                    navLink.isActive ? classes.active : ""
                                }
                                to={"/popular"}
                            >
                                Phổ Biến
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
