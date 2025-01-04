/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { splitPane, removePane } from "../store/slices/paneSlice";

const PaneControls = ({ nodeId, parentId }) => {
  const dispatch = useDispatch();

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-2">
      <button
        className="bg-white/20 hover:bg-white/30 rounded px-4 py-2"
        onClick={() => dispatch(splitPane({ nodeId, direction: "vertical" }))}
      >
        v
      </button>
      <button
        className="bg-white/20 hover:bg-white/30 rounded px-4 py-2"
        onClick={() => dispatch(splitPane({ nodeId, direction: "horizontal" }))}
      >
        h
      </button>
      {parentId !== undefined && (
        <button
          className="bg-white/20 hover:bg-white/30 rounded px-4 py-2"
          onClick={() => dispatch(removePane({ nodeId, parentId }))}
        >
          -
        </button>
      )}
    </div>
  );
};

export default PaneControls;
