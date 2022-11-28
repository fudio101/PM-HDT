import React from "react";
import { NavLink } from "react-router-dom";

//import classes from "./CategoryItem.module.css";

function CategoryItem({ item }) {
    return (
        <li>
            <NavLink to={"/category/" + item.id}>{item.name}</NavLink>
        </li>
    );
}

export default CategoryItem;
