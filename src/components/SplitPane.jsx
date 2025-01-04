/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  splitPane,
  removePane,
  updatePaneSizes,
} from "../store/slices/paneSlice";

const SplitPane = ({ node, parentId }) => {
  const dispatch = useDispatch();
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);

    const startPos = node.direction === "vertical" ? e.clientX : e.clientY;
    const initialSizes = [...node.sizes];

    const handleMouseMove = (e) => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const currentPos = node.direction === "vertical" ? e.clientX : e.clientY;
      const totalSize =
        node.direction === "vertical" ? rect.width : rect.height;
      const delta = ((currentPos - startPos) / totalSize) * 100;

      const newSizes = [initialSizes[0] + delta, initialSizes[1] - delta];

      if (newSizes[0] >= 10 && newSizes[1] >= 10) {
        dispatch(updatePaneSizes({ nodeId: node.id, newSizes }));
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  if (!node.children.length) {
    return (
      <div
        className="relative w-full h-full"
        style={{ backgroundColor: node.color }}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-2">
          <button
            className="bg-white/20 hover:bg-white/30 rounded px-4 py-2"
            onClick={() =>
              dispatch(splitPane({ nodeId: node.id, direction: "vertical" }))
            }
          >
            v
          </button>
          <button
            className="bg-white/20 hover:bg-white/30 rounded px-4 py-2"
            onClick={() =>
              dispatch(splitPane({ nodeId: node.id, direction: "horizontal" }))
            }
          >
            h
          </button>
          {parentId && (
            <button
              className="bg-white/20 hover:bg-white/30 rounded px-4 py-2"
              onClick={() =>
                dispatch(removePane({ nodeId: node.id, parentId }))
              }
            >
              -
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full flex ${
        node.direction === "vertical" ? "flex-row" : "flex-col"
      }`}
    >
      <div style={{ flex: `${node.sizes[0]} 1 0%` }}>
        <SplitPane node={node.children[0]} parentId={node.id} />
      </div>
      <div
        className={`${
          node.direction === "vertical"
            ? "cursor-col-resize w-1"
            : "cursor-row-resize h-1"
        } bg-white/20 ${isDragging ? "select-none" : ""}`}
        onMouseDown={handleMouseDown}
      />
      <div style={{ flex: `${node.sizes[1]} 1 0%` }}>
        <SplitPane node={node.children[1]} parentId={node.id} />
      </div>
    </div>
  );
};

export default SplitPane;
