import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GroceriesAppContainer from "./Components/GroceriesAppContainer";
import NotAuthorized from "./Components/NotAuthorized";
import PageNotFound from "./Components/PageNotFound";

//Jacob Tummon

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* TEMPORARY FOR DEBUGGING, GROCERIESAPPCONTAINER WILL BE "/main" */}
        <Route path="/" element={<GroceriesAppContainer />} />

        {/*Not authorized page*/}
        <Route path="/not-authorized" element={<NotAuthorized />} />

        {/*Not found page, catches any paths that don't exist - KEEP AT BOTTOM OF ROUTES*/}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
