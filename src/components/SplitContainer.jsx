import { useSelector } from "react-redux";
import SplitPane from "./SplitPane";

const SplitContainer = () => {
  const root = useSelector((state) => state.panes.root);

  return <SplitPane node={root} />;
};

export default SplitContainer;
