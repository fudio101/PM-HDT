import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    searchComicsFilterCategoryChange,
    searchComicsFilterNationChange,
    searchComicsFilterStatusChange,
} from "../../../redux/reducers/searchComicsSlice";
import { categoryListSelector } from "../../../redux/selectors";

import classes from "./Filter.module.css";

function SearchComicsFilter(props) {
    const [category, setCategory] = useState("0");
    const [status, setStatus] = useState(-1);
    const [nation, setNation] = useState(0);
    const categories = [
        { id: 0, name: "Tất cả" },
        ...useSelector(categoryListSelector),
    ];
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
        setNation(value);
        dispatch(searchComicsFilterNationChange(value));
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
                                        nation === 0 ? classes.active : ""
                                    }
                                >
                                    Tất cả
                                </li>
                                <li
                                    onClick={() => nationChangeHandle(1)}
                                    className={
                                        nation === 1 ? classes.active : ""
                                    }
                                >
                                    Nhật Bản
                                </li>
                                <li
                                    onClick={() => nationChangeHandle(2)}
                                    className={
                                        nation === 2 ? classes.active : ""
                                    }
                                >
                                    Hàn Quốc
                                </li>
                                <li
                                    onClick={() => nationChangeHandle(3)}
                                    className={
                                        nation === 3 ? classes.active : ""
                                    }
                                >
                                    Trung Quốc
                                </li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default SearchComicsFilter;
