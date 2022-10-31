import React, { forwardRef } from "react";

export const DnDPhoto = forwardRef(
  ({ url, index, faded, style, ...props }, ref) => {
    const inlineStyles = {
      height: "30rem",
      width: "100%",
      backgroundSize: "cover",
      backgroundPosition: "center",
      borderRadius: 6,
      backgroundColor: "grey",
      ...style,
    };

    return (
      <img src={url} alt="img" ref={ref} style={inlineStyles} {...props} />
    );
  }
);
