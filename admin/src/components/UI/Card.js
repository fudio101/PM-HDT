import React from "react";

function Card(props) {
  return (
    <div
      className={`${props.className} w-full md:h-full my-4 shadow-lg rounded-lg hover:shadow-2xl hover:-translate-y-2 duration-300 py-4`}
    >
      {props.children}
    </div>
  );
}

export default Card;
