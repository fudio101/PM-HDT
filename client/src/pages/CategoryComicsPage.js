import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ComicItem from "../components/item/ComicItem";
import CategoryComicsFilter from "../components/item/Filters/CategoryComicsFilter";
import PaginatedItems from "../components/item/pagination/PaginatedItem";
import { getCategoryComics } from "../redux/reducers/categoryComicsSlice";
import { categoryComicsFilterResultSelector } from "../redux/selectors";

function CategoryComicsPage() {
    const { categoryId } = useParams();
    const dispatch = useDispatch();
    let comicsFilter = useSelector(categoryComicsFilterResultSelector);
    const items = [];

    useEffect(() => {
        dispatch(getCategoryComics(categoryId));
    }, [dispatch, categoryId]);

    comicsFilter.forEach((comic) => {
        return items.push(<ComicItem comic={comic} key={comic.slug} />);
    });

    return (
        <>
            <CategoryComicsFilter />
            {comicsFilter.length > 0 ? (
                <PaginatedItems data={items} itemsPerPage={12} />
            ) : (
                <div>Không tìm thấy kết quả</div>
            )}
        </>
    );
}

export default CategoryComicsPage;
