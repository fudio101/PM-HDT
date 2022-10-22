import React from "react";

function NextArrow(props) {
  const { className, style, onClick } = props;
  console.log(props);
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        justifyContent: "center",
        background: "rgb(231 231 231)",
        borderRadius: "10.9rem",
        height: "2.5rem",
        width: "2rem",
        paddingTop: "0.6rem",
        margin: "-1rem",
      }}
      onClick={onClick}
    />
  );
}

export default NextArrow;