import React from "react";

import { NavLink } from "react-router-dom";

import classes from "./ComicDesc.module.css";

function ComicChapters({ chapters, comicSlug }) {
    return (
        <div className={classes.chapter_table}>
            <h3>Danh sách tập</h3>

            <div className={classes.sticky_table}>
                <table>
                    <thead>
                        <tr>
                            <th>Chapter</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {chapters ? (
                            chapters.map((chapter, index) => (
                                <tr key={index}>
                                    <td>
                                        <NavLink
                                            className={classes.chapter_no}
                                            to={`/chapter/${comicSlug}/${chapter.episode_number}`}
                                        >
                                            Episode {chapter.episode_number}
                                        </NavLink>
                                    </td>
                                    <td>{chapter.published_date}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2">Không có tập</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ComicChapters;
