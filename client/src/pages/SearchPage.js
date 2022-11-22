import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import comicApi from "../api/comicApi";
import ComicItem from "../components/item/ComicItem";

import FilterSearch from "../components/item/Filter/FilterSearch";
import PaginatedItems from "../components/item/pagination/PaginatedItem";

function SearchPage() {
    const { searchKey } = useParams();
    const [comics, setComics] = useState([]);
    const [comicsFilter, setComicsFilter] = useState([]);
    const [category, setCategory] = useState("0");
    const [status, setStatus] = useState(-1);
    const [nation, setNation] = useState(0);
    const dispatch = useDispatch();

    const items = [];

    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await comicApi.search(searchKey);
                setComics(data.data);
            } catch (e) {
                console.log(e);
            }
        };

        getData();
    }, [searchKey]);

    const filter = (category_, status_, nation_) => {
        category_ = parseInt(category_);
        setComicsFilter(
            comics.filter((comic, index) => {
                return (
                    (category_ === 0 ||
                        comic.categories.some(
                            (cate) => cate.id === category_
                        )) &&
                    (status_ === -1 || comic.status === status_)
                );
            })
        );
    };

    useEffect(() => {
        filter(category, status, nation);
    }, [comics]);

    comicsFilter.forEach((comic) => {
        return items.push(<ComicItem comic={comic} key={comic.slug} />);
    });

    return (
        <>
            <FilterSearch
                category={category}
                setCategory={setCategory}
                status={status}
                setStatus={setStatus}
                nation={nation}
                setNation={setNation}
                filter={filter}
            />
            {comicsFilter.length > 0 ? (
                <PaginatedItems data={items} itemsPerPage={4} />
            ) : (
                <div>Không tìm thấy kết quả</div>
            )}
        </>
    );
}

export default SearchPage;
