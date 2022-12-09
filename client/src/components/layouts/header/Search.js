import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Search({ className = "" }) {
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

    // return (
    //     <input
    //         className={classes.search}
    //         placeholder="Search"
    //         value={searchKey}
    //         onChange={(e) => changeHandle(e)}
    //         onKeyDown={(e) => keyDownHandle(e)}
    //     ></input>
    // );

    return (
        <div className={`relative text-gray-600 ${className}`}>
            <input
                value={searchKey}
                onChange={(e) => changeHandle(e)}
                onKeyDown={(e) => keyDownHandle(e)}
                type="search"
                name="serch"
                placeholder="Search"
                className="w-full bg-white h-10 px-5 rounded-full text-sm focus:outline-none"
            />
        </div>
    );
}

export default Search;
