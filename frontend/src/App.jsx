import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GroceriesAppContainer from "./Components/GroceriesAppContainer";
import NotAuthorized from "./Components/NotAuthorized";
import PageNotFound from "./Components/PageNotFound";
import LoginPage from "./Components/LoginPage";
import AddProductPage from "./Components/AddProductPage";
import EditProductPage from "./Components/EditProductPage";

//Jacob Tummon

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* TEMPORARY FOR DEBUGGING, GROCERIESAPPCONTAINER WILL BE "/main" */}
        <Route path="/main" element={<GroceriesAppContainer />} />

        {/*Not authorized page*/}
        <Route path="/not-authorized" element={<NotAuthorized />} />

        {/* Public Routes */}
        <Route path="/" element={<LoginPage />} />

        <Route path="/login" element={<LoginPage />} />

        {/* Privte Routes */}
        <Route path="/add-product" element={<AddProductPage />} />
        <Route path="/edit-product/:id" element={<EditProductPage />} />

        {/*Not found page, catches any paths that don't exist - KEEP AT BOTTOM OF ROUTES*/}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
