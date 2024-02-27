import "./App.css";
import Layout from "./components/Layout/Layout";
import Navigation from "./routing/Navigation";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";

const App: React.FC = () => {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Layout />
          <Navigation />
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
