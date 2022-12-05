import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    categoryListSelector,
    countryListSelector,
} from "../../../redux/selectors";
import DatePicker from "react-date-picker";

import classes from "./Filter.module.css";
import {
    comicRankingsAll,
    comicRankingsByDay,
    comicRankingsByMonth,
    comicRankingsFilterCategoryChange,
    comicRankingsFilterCountryChange,
    comicRankingsFilterStatusChange,
} from "../../../redux/reducers/comicRankingsSlice";

function ComicRankingsFilter(props) {
    const [rankBy, setRankBy] = useState(1);
    const [category, setCategory] = useState("0");
    const [status, setStatus] = useState(-1);
    const [country, setCountry] = useState(0);
    const [value, onChange] = useState(new Date());
    const categories = [
        { id: 0, name: "Tất cả" },
        ...useSelector(categoryListSelector),
    ];
    const countries = useSelector(countryListSelector);
    const dispatch = useDispatch();

    const rankByChangeHandle = (value) => {
        setRankBy(value);
    };

    const categoryChangeHandle = (e) => {
        let value = e.target.value;
        setCategory(value);
        dispatch(comicRankingsFilterCategoryChange(value));
    };

    const statusChangeHandle = (value) => {
        setStatus(value);
        dispatch(comicRankingsFilterStatusChange(value));
    };

    const nationChangeHandle = (value) => {
        setCountry(value);
        dispatch(comicRankingsFilterCountryChange(value));
    };

    const formatDate = (date, type) => {
        var month = "" + (date.getMonth() + 1),
            day = "" + date.getDate(),
            year = date.getFullYear();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        if (type === 1) return [year, month, day].join("-");
        return [year, month].join("-");
    };

    const submitHandle = () => {
        switch (rankBy) {
            case 1:
                dispatch(comicRankingsByDay(formatDate(value, rankBy)));
                break;
            case 2:
                dispatch(comicRankingsByMonth(formatDate(value, rankBy)));
                break;
            default:
                dispatch(comicRankingsAll());
        }
    };

    return (
        <div className={`${classes.story_list_bl01} ${classes.box}`}>
            <table>
                <tbody>
                    <tr>
                        <th>Xếp hạng theo</th>
                    </tr>
                    <tr>
                        <td>
                            <ul className={classes.choose}>
                                <li
                                    onClick={() => rankByChangeHandle(1)}
                                    className={
                                        rankBy === 1 ? classes.active : ""
                                    }
                                >
                                    Ngày
                                </li>
                                <li
                                    onClick={() => rankByChangeHandle(2)}
                                    className={
                                        rankBy === 2 ? classes.active : ""
                                    }
                                >
                                    Tháng
                                </li>
                                <li
                                    onClick={() => rankByChangeHandle(3)}
                                    className={
                                        rankBy === 3 ? classes.active : ""
                                    }
                                >
                                    Tất cả
                                </li>
                            </ul>
                        </td>
                    </tr>
                    {rankBy !== 3 ? (
                        <tr>
                            <td>
                                <div>
                                    <DatePicker
                                        onChange={onChange}
                                        value={value}
                                        format={rankBy === 1 ? "d/M/y" : "M/y"}
                                        maxDetail={
                                            rankBy === 1 ? "month" : "year"
                                        }
                                    />
                                </div>
                            </td>
                        </tr>
                    ) : null}
                    <tr>
                        <td>
                            <button
                                className={classes.submit_btn}
                                onClick={submitHandle}
                            >
                                Hiện kết quả
                            </button>
                        </td>
                    </tr>
                </tbody>
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
            </table>
        </div>
    );
}

export default ComicRankingsFilter;
