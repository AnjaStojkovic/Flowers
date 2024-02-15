import "./App.css";
import Layout from "./components/Layout/Layout";
import Navigation from "./routing/Navigation";
import { Provider } from "react-redux";
import { store } from "./store/store";

const App: React.FC = () => {
  return (
    <>
      <Provider store={store}>
        <Layout />
        <Navigation />
      </Provider>
    </>
  );
};

export default App;
