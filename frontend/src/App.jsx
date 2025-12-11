import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GroceriesAppContainer from "./Components/GroceriesAppContainer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* TEMPORARY FOR DEBUGGING, GROCERIESAPPCONTAINER WILL BE "/main" */}
        <Route path="/" element={<GroceriesAppContainer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
