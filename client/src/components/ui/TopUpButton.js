import React, { useState } from "react";
import classes from "./TopUpButton.module.css";
import { BsArrowUpSquareFill } from "react-icons/bs";

function TopUpButton() {
    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true);
        } else if (scrolled <= 300) {
            setVisible(false);
        }
    };

    const topUpHandle = () =>
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

    window.addEventListener("scroll", toggleVisible);

    return (
        <div
            title="Về đầu trang"
            className={classes.top_up}
            style={{ display: visible ? "inline" : "none" }}
        >
            <BsArrowUpSquareFill onClick={topUpHandle} />
        </div>
    );
}

export default TopUpButton;
