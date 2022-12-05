import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ComicItem from "../components/item/ComicItem";
import CategoryComicsFilter from "../components/item/Filters/CategoryComicsFilter";
import PaginatedItems from "../components/item/pagination/PaginatedItem";
import { getCategoryComics } from "../redux/reducers/categoryComicsSlice";
import {
    categoryComicsFilterItemsPerPageSelector,
    categoryComicsFilterResultSelector,
    categoryListSelector,
} from "../redux/selectors";

const titleCSS = {
    fontWeight: 700,
    fontSize: "30px",
    marginBottom: "24px",
    opacity: 0.65,
};

function CategoryComicsPage() {
    const { categoryId } = useParams();
    const dispatch = useDispatch();
    let comicsFilter = useSelector(categoryComicsFilterResultSelector);
    const categories = useSelector(categoryListSelector);
    const [categoryName, setCategoryName] = useState("");
    let itemsPerPage = parseInt(
        useSelector(categoryComicsFilterItemsPerPageSelector)
    );
    const items = [];

    useEffect(() => {
        dispatch(getCategoryComics(categoryId));
    }, [dispatch, categoryId]);

    useEffect(() => {
        setCategoryName(
            categories.find((element) => element?.id === parseInt(categoryId))
                ?.name
        );
    }, [categoryId, categories]);

    comicsFilter.forEach((comic) => {
        return items.push(<ComicItem comic={comic} key={comic.slug} />);
    });

    return (
        <>
            <div style={titleCSS}>{categoryName}</div>
            <CategoryComicsFilter />
            {comicsFilter.length > 0 ? (
                <PaginatedItems data={items} itemsPerPage={itemsPerPage} />
            ) : (
                <div>Không tìm thấy kết quả</div>
            )}
        </>
    );
}

export default CategoryComicsPage;
