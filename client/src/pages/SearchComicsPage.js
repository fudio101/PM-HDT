import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ComicItem from "../components/item/ComicItem";
import SearchComicsFilter from "../components/item/Filters/SearchComicsFilter";
import PaginatedItems from "../components/item/pagination/PaginatedItem";
import { searchComics } from "../redux/reducers/searchComicsSlice";
import {
    searchComicsFilterItemsPerPageSelector,
    searchComicsFilterResultSelector,
} from "../redux/selectors";

function SearchComicsPage() {
    const { searchKey } = useParams();
    const dispatch = useDispatch();
    let comicsFilter = useSelector(searchComicsFilterResultSelector);
    let itemsPerPage = parseInt(
        useSelector(searchComicsFilterItemsPerPageSelector)
    );
    const items = [];

    useEffect(() => {
        dispatch(searchComics(searchKey));
    }, [dispatch, searchKey]);

    comicsFilter.forEach((comic) => {
        return items.push(<ComicItem comic={comic} key={comic.slug} />);
    });

    return (
        <>
            <SearchComicsFilter />
            {comicsFilter.length > 0 ? (
                <PaginatedItems data={items} itemsPerPage={itemsPerPage} />
            ) : (
                <div>Không tìm thấy kết quả</div>
            )}
        </>
    );
}

export default SearchComicsPage;
