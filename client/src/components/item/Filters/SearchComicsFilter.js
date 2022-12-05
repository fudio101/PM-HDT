import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    searchComicsFilterCategoryChange,
    searchComicsFilterCountryChange,
    searchComicsFilterItemsPerPageChange,
    searchComicsFilterStatusChange,
} from "../../../redux/reducers/searchComicsSlice";
import {
    categoryListSelector,
    countryListSelector,
} from "../../../redux/selectors";

import classes from "./Filter.module.css";

function SearchComicsFilter(props) {
    const [category, setCategory] = useState("0");
    const [status, setStatus] = useState(-1);
    const [country, setCountry] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const categories = [
        { id: 0, name: "Tất cả" },
        ...useSelector(categoryListSelector),
    ];
    const countries = useSelector(countryListSelector);
    const dispatch = useDispatch();

    const categoryChangeHandle = (e) => {
        let value = e.target.value;
        setCategory(value);
        dispatch(searchComicsFilterCategoryChange(value));
    };

    const statusChangeHandle = (value) => {
        setStatus(value);
        dispatch(searchComicsFilterStatusChange(value));
    };

    const nationChangeHandle = (value) => {
        setCountry(value);
        dispatch(searchComicsFilterCountryChange(value));
    };

    const itemsPerPageChangeHandle = (e) => {
        let value = e.target.value;
        setItemsPerPage(value);
        dispatch(searchComicsFilterItemsPerPageChange(value));
    };

    return (
        <div className={`${classes.story_list_bl01} ${classes.box}`}>
            <table>
                <tbody>
                    <tr>
                        <th>Thể loại truyện</th>
                    </tr>
                    <tr>
                        <td>
                            <div
                                className={`${classes.select} ${classes.is_warning}`}
                            >
                                <select
                                    className={classes.cate_options}
                                    value={category}
                                    onChange={categoryChangeHandle}
                                >
                                    {categories.map((item) => {
                                        return (
                                            <option
                                                key={item.id}
                                                value={item.id}
                                            >
                                                {" "}
                                                {item.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        </td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <th>Tình trạng</th>
                    </tr>
                    <tr>
                        <td>
                            <ul className={classes.choose}>
                                <li
                                    onClick={() => statusChangeHandle(-1)}
                                    className={
                                        status === -1 ? classes.active : ""
                                    }
                                >
                                    Tất cả
                                </li>
                                <li
                                    onClick={() => statusChangeHandle(0)}
                                    className={
                                        status === 0 ? classes.active : ""
                                    }
                                >
                                    Đang tiến hành
                                </li>
                                <li
                                    onClick={() => statusChangeHandle(1)}
                                    className={
                                        status === 1 ? classes.active : ""
                                    }
                                >
                                    Hoàn thành
                                </li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <th>Quốc gia</th>
                    </tr>
                    <tr>
                        <td>
                            <ul className={classes.choose}>
                                <li
                                    onClick={() => nationChangeHandle(0)}
                                    className={
                                        country === 0 ? classes.active : ""
                                    }
                                >
                                    Tất cả
                                </li>
                                {countries.map((element) => (
                                    <li
                                        onClick={() =>
                                            nationChangeHandle(element.id)
                                        }
                                        className={
                                            country === element.id
                                                ? classes.active
                                                : ""
                                        }
                                        key={element.id}
                                    >
                                        {element.name}
                                    </li>
                                ))}
                            </ul>
                        </td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <th>Hiển thị</th>
                    </tr>
                    <tr>
                        <td>
                            <div className={classes.choose}>
                                <select
                                    className={classes.cate_options}
                                    value={itemsPerPage}
                                    onChange={itemsPerPageChangeHandle}
                                >
                                    <option value={12}>12</option>
                                    <option value={24}>24</option>
                                    <option value={48}>48</option>
                                    <option value={-1}>All</option>
                                </select>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default SearchComicsFilter;
