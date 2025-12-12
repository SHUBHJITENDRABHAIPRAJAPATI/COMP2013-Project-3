import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GroceriesAppContainer from "./Components/GroceriesAppContainer";
import NotAuthorized from "./Components/NotAuthorized";
import PageNotFound from "./Components/PageNotFound";
import CreatePage from "./Components/createPage";

//Jacob Tummon

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<CreatePage />} />

        {/* TEMPORARY FOR DEBUGGING, GROCERIESAPPCONTAINER WILL BE "/main" */}
        <Route path="/main" element={<GroceriesAppContainer />} />

        {/*Not authorized page*/}
        <Route path="/not-authorized" element={<NotAuthorized />} />

        {/*Not found page, catches any paths that don't exist - KEEP AT BOTTOM OF ROUTES*/}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
