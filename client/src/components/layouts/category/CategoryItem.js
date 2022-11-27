import React from "react";
import { NavLink } from "react-router-dom";

//import classes from "./CategoryItem.module.css";

function CategoryItem(props) {
    return (
        <li>
            <NavLink to={"/category/" + props.item.id}>
                {props.item.name}
            </NavLink>
        </li>
    );
}

export default CategoryItem;
