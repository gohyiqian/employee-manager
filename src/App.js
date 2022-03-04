import "./App.css";
import { Container } from "@mui/material";
import Employee from "./components/Employee";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

function App() {
  return (
    <Container>
      <Employee />
    </Container>
  );
}

export default App;
