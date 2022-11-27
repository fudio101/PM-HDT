import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
    categoryComicsFilterNationChange,
    categoryComicsFilterStatusChange,
} from "../../../redux/reducers/categoryComicsSlice";
import classes from "./Filter.module.css";

function CategoryComicsFilter(props) {
    const [status, setStatus] = useState(-1);
    const [nation, setNation] = useState(0);

    const dispatch = useDispatch();

    const statusChangeHandle = (value) => {
        setStatus(value);
        dispatch(categoryComicsFilterStatusChange(value));
    };

    const nationChangeHandle = (value) => {
        setNation(value);
        dispatch(categoryComicsFilterNationChange(value));
    };

    return (
        <div className={`${classes.story_list_bl01} ${classes.box}`}>
            <table>
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

export default CategoryComicsFilter;
