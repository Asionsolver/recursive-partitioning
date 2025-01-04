import { Provider } from "react-redux";
import { store } from "./store";
import SplitContainer from "./components/SplitContainer";

function App() {
  return (
    <Provider store={store}>
      <div className="w-screen h-screen">
        <SplitContainer />
      </div>
    </Provider>
  );
}

export default App;
