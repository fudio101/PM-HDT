import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import classes from "./Search.module.css";

function Search() {
    const [searchKey, setSearchKey] = useState("");

    const navigate = useNavigate();

    const changeHandle = function (e) {
        setSearchKey(e.target.value);
    };

    const keyDownHandle = function (e) {
        if (e.key === "Enter") {
            setSearchKey("");
            navigate(`/search/${searchKey}`);
        }
    };

    return (
        <input
            className={classes.search}
            placeholder="Search"
            value={searchKey}
            onChange={(e) => changeHandle(e)}
            onKeyDown={(e) => keyDownHandle(e)}
        ></input>
    );
}

export default Search;
