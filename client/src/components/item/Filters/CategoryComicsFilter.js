import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    categoryComicsFilterNationChange,
    categoryComicsFilterStatusChange,
} from "../../../redux/reducers/categoryComicsSlice";
import { countryListSelector } from "../../../redux/selectors";
import classes from "./Filter.module.css";

function CategoryComicsFilter(props) {
    const [status, setStatus] = useState(-1);
    const [country, setCountry] = useState(0);
    const countries = useSelector(countryListSelector);

    const dispatch = useDispatch();

    const statusChangeHandle = (value) => {
        setStatus(value);
        dispatch(categoryComicsFilterStatusChange(value));
    };

    const nationChangeHandle = (value) => {
        setCountry(value);
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

export default CategoryComicsFilter;
