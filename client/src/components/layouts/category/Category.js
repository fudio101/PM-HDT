import React, { useState } from "react";
import CategoryItem from "./CategoryItem";
import classes from "./Category.module.css";
import { useSelector } from "react-redux";
import { categoryListSelector } from "../../../redux/selectors";

function Category(props) {
    const [visibleCate, setVisibleCate] = useState(false);

    const categories = useSelector(categoryListSelector);

    return (
        <div
            onMouseEnter={() => setVisibleCate(true)}
            onMouseLeave={() => setVisibleCate(false)}
            className={`${classes.cateWrap} ${
                visibleCate || props.hidden ? "" : classes.hideCate
            } `}
        >
            <div className={classes.category}>
                {categories.length > 0 ? (
                    <ul>
                        {categories.map((item, index) => {
                            return <CategoryItem item={item} key={item.id} />;
                        })}
                    </ul>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
}

export default Category;
