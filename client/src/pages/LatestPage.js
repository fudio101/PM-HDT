import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ComicItem from "../components/item/ComicItem";
import FilterSearch from "../components/item/Filters/FilterSearch";
import PaginatedItems from "../components/item/pagination/PaginatedItem";
import { filterResultSelector } from "../redux/selectors";

function SearchPage() {
    const dispatch = useDispatch();
    let comicsFilter = useSelector(filterResultSelector);
    const items = [];

    const latestComics = useSelector(latestComicsSelector);

    useEffect(() => {
        dispatch(getLatestComics(100));
    }, [dispatch]);

    comicsFilter.forEach((comic) => {
        return items.push(<ComicItem comic={comic} key={comic.slug} />);
    });

    return (
        <>
            <FilterSearch />
            {comicsFilter.length > 0 ? (
                <PaginatedItems data={items} itemsPerPage={12} />
            ) : (
                <div>Không tìm thấy kết quả</div>
            )}
        </>
    );
}

export default SearchPage;
