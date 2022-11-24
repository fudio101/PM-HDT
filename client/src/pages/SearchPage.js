import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ComicItem from "../components/item/ComicItem";
import FilterSearch from "../components/item/Filter/FilterSearch";
import PaginatedItems from "../components/item/pagination/PaginatedItem";
import { searchComics } from "../redux/reducers/filtersSlice";
import { filterResultSelector } from "../redux/selectors";

function SearchPage() {
    const { searchKey } = useParams();
    // const [category, setCategory] = useState("0");
    // const [status, setStatus] = useState(-1);
    // const [nation, setNation] = useState(0);
    const dispatch = useDispatch();
    let comicsFilter = useSelector(filterResultSelector);
    const items = [];

    useEffect(() => {
        dispatch(searchComics(searchKey));
    }, [dispatch, searchKey]);

    // const filter = (category_, status_, nation_) => {
    //     category_ = parseInt(category_);
    //     setComicsFilter(
    //         comics.filter((comic, index) => {
    //             return (
    //                 (category_ === 0 ||
    //                     comic.categories.some(
    //                         (cate) => cate.id === category_
    //                     )) &&
    //                 (status_ === -1 || comic.status === status_)
    //             );
    //         })
    //     );
    // };

    // useEffect(() => {
    //     comicsFilter = useSelector(filterResultSelector);
    // }, [comics]);

    comicsFilter.forEach((comic) => {
        return items.push(<ComicItem comic={comic} key={comic.slug} />);
    });

    return (
        <>
            <FilterSearch />
            {comicsFilter.length > 0 ? (
                <PaginatedItems data={items} itemsPerPage={4} />
            ) : (
                <div>Không tìm thấy kết quả</div>
            )}
        </>
    );
}

export default SearchPage;
