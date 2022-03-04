import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";

const URL = "https://6164f6e709a29d0017c88ed9.mockapi.io/fetest/employees";

const Employee = () => {
  useEffect(() => {
    const fetchStocks = async () => {
      let response = await fetch(URL);
      const data = await response.json();
      console.log(data);
    };
    fetchStocks();
  }, []);

  const [rowData] = useState([
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxter", price: 72000 },
    { make: "Porsche", model: "Boxter", price: 72000 },
    { make: "Porsche", model: "Boxter", price: 72000 },
    { make: "Porsche", model: "Boxter", price: 72000 },
  ]);

  const [columnDefs] = useState([
    { field: "make" },
    { field: "model" },
    { field: "price" },
    { field: "price" },
    { field: "price" },
    { field: "price" },
  ]);

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 1000 }}>
      <AgGridReact rowData={rowData} columnDefs={columnDefs}></AgGridReact>
    </div>
  );
};

export default Employee;
