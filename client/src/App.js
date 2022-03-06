import "./App.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddPage from "./pages/AddPage";
import EditPage from "./pages/EditPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/employee/list" element={<HomePage />} />
        <Route path="/employee/add" element={<AddPage />} />
        <Route path="/employee/edit/:id" element={<EditPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
