import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { categoryListSelector } from "../../../redux/selectors";

import classes from "./FilterSearch.module.css";

function FilterSearch(props) {
    const categories = [
        { id: 0, name: "Tất cả" },
        ...useSelector(categoryListSelector),
    ];

    const {
        category,
        setCategory,
        status,
        setStatus,
        nation,
        setNation,
        filter,
    } = props;

    useEffect(() => {
        filter(category, status, nation);
    }, [category, status, nation, filter]);

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
                                    onChange={(e) =>
                                        setCategory(e.target.value)
                                    }
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
                                    onClick={() => setStatus(-1)}
                                    className={
                                        status === -1 ? classes.active : ""
                                    }
                                >
                                    Tất cả
                                </li>
                                <li
                                    onClick={() => setStatus(0)}
                                    className={
                                        status === 0 ? classes.active : ""
                                    }
                                >
                                    Đang tiến hành
                                </li>
                                <li
                                    onClick={() => setStatus(1)}
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
                                    onClick={() => setNation(0)}
                                    className={
                                        nation === 0 ? classes.active : ""
                                    }
                                >
                                    Tất cả
                                </li>
                                <li
                                    onClick={() => setNation(1)}
                                    className={
                                        nation === 1 ? classes.active : ""
                                    }
                                >
                                    Nhật Bản
                                </li>
                                <li
                                    onClick={() => setNation(2)}
                                    className={
                                        nation === 2 ? classes.active : ""
                                    }
                                >
                                    Hàn Quốc
                                </li>
                                <li
                                    onClick={() => setNation(3)}
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

export default FilterSearch;
