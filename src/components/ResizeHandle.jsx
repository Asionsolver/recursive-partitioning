/* eslint-disable react/prop-types */
const ResizeHandle = ({ direction, isDragging, onMouseDown }) => {
  return (
    <div
      className={`${
        direction === "vertical" ? "cursor-col-resize" : "cursor-row-resize"
      } ${isDragging ? "select-none" : ""}`}
      style={{
        [direction === "vertical" ? "width" : "height"]: "4px",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
      }}
      onMouseDown={onMouseDown}
    />
  );
};

export default ResizeHandle;
