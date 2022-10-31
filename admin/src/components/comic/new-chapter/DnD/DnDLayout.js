import React from "react";

function DnDLayout(props) {
  return (
    <div
      className="wraper"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(3, 3fr)`,
        gridTemplateRowsL: `repeat('auto, 3fr')`,
        padding: 20,
      }}
    >
      {props.children}
    </div>
  );
}

export default DnDLayout;
