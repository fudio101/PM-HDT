import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ComicItem from "../components/item/ComicItem";
import SearchFilter from "../components/item/Filters/SearchFilter";
import PaginatedItems from "../components/item/pagination/PaginatedItem";
import { searchComics } from "../redux/reducers/searchComicsSlice";
import { latestComicsFilterResultSelector } from "../redux/selectors";

function SearchPage() {
    const { searchKey } = useParams();
    const dispatch = useDispatch();
    let comicsFilter = useSelector(latestComicsFilterResultSelector);
    const items = [];

    useEffect(() => {
        dispatch(searchComics(searchKey));
    }, [dispatch, searchKey]);

    comicsFilter.forEach((comic) => {
        return items.push(<ComicItem comic={comic} key={comic.slug} />);
    });

    return (
        <>
            <SearchFilter />
            {comicsFilter.length > 0 ? (
                <PaginatedItems data={items} itemsPerPage={12} />
            ) : (
                <div>Không tìm thấy kết quả</div>
            )}
        </>
    );
}

export default SearchPage;
