import React, { useState, useEffect } from "react";
import categoryApi from "../../../api/categoryApi";
import CategoryItem from "./CategoryItem";
import classes from "./Category.module.css";

function Category(props) {
    const [visibleCate, setVisibleCate] = useState(false);
    const [categories, setCategories] = useState([]);
    const [categoryItems, setCategoryItems] = useState();

    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await categoryApi.index();
                setCategories(data.data);
            } catch (e) {
                console.log(e);
            }
        };

        getData();
    }, []);

    useEffect(() => {
        setCategoryItems(
            categories.length > 0 ? (
                <ul>
                    {categories.map((item, index) => {
                        return <CategoryItem item={item} key={item.id} />;
                    })}
                </ul>
            ) : (
                ""
            )
        );
    }, [categories]);

    return (
        <div
            onMouseEnter={() => setVisibleCate(true)}
            onMouseLeave={() => setVisibleCate(false)}
            className={`${classes.cateWrap} ${
                visibleCate || props.hidden ? "" : classes.hideCate
            } `}
        >
            <div className={classes.category}>{categoryItems}</div>
        </div>
    );
}

export default Category;
