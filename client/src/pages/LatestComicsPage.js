import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ComicItem from "../components/item/ComicItem";
import LatestComicsFilter from "../components/item/Filters/LatestComicsFilter";
import PaginatedItems from "../components/item/pagination/PaginatedItem";
import { getLatestComics } from "../redux/reducers/latestComicsSlice";
import {
    latestComicsFilterResultSelector,
    latestComicsFilterItemsPerPageSelector,
} from "../redux/selectors";

function LatestComicsPage() {
    const dispatch = useDispatch();
    let comicsFilter = useSelector(latestComicsFilterResultSelector);
    let itemsPerPage = parseInt(
        useSelector(latestComicsFilterItemsPerPageSelector)
    );
    const items = [];

    useEffect(() => {
        dispatch(getLatestComics(100));
    }, [dispatch]);

    comicsFilter.forEach((comic) => {
        items.push(<ComicItem comic={comic} key={comic.slug} />);
    });

    return (
        <>
            <LatestComicsFilter />
            {comicsFilter.length > 0 ? (
                <PaginatedItems data={items} itemsPerPage={itemsPerPage} />
            ) : (
                <div>Không tìm thấy kết quả</div>
            )}
        </>
    );
}

export default LatestComicsPage;
