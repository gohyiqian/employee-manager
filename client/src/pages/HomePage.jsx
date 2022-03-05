import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "../App.css";
import { Button, Container } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { getEmployees } from "../redux/slice/employeeSlice";
import { actions } from "../redux/slice/employeeSlice";

const URL = "https://6164f6e709a29d0017c88ed9.mockapi.io/fetest/employees";

const flexStyle = {
  display: "flex",
  flexDirection: "column",
  padding: "20px",
};

const btnStyle = {
  textDecoration: "none",
  paddingBottom: "10px",
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "white",
  border: "2px solid orange",
  borderRadius: "10px",
  padding: "15px",
};

const HomePage = () => {
  const [userData, setUserData] = useState();
  const [gridApi, setGridApi] = useState(null);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { employeeInfo, status } = useSelector((state) => state.employees);

  // useEffect(() => {
  //   const fetchEmployees = async () => {
  //     let response = await fetch(URL);
  //     const data = await response.json();
  //     console.log(data);
  //     setUserData(data);
  //   };
  //   fetchEmployees();
  // }, []);

  useEffect(() => {
    dispatch(getEmployees());
    setUserData(employeeInfo);
  }, [dispatch]);

  const DeleteBtn = () => {
    const onDelete = () => {
      setShow(true);
    };
    return (
      <Button color="error" variant="contained" onClick={onDelete}>
        Delete
      </Button>
    );
  };

  const EditBtn = () => {
    const onEdit = () => {
      console.log("Edit");
      navigate("/employee/edit");
    };
    return (
      <Button color="primary" variant="contained" onClick={onEdit}>
        Edit
      </Button>
    );
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleDelete = (params) => {
    setShow(false);
    dispatch(actions.deleteEmployee(getSelectedRows()));
  };

  const onGridReady = (params) => {
    console.log(params.api);
    setGridApi(params.api);
  };

  const getRowNodeId = (params) => {
    console.log(params);
    return params.id;
  };

  const getSelectedRows = () => {
    let selectedRows = gridApi.getSelectedRows();
    console.log(selectedRows[0].id);
    // const selectedNodes = gridApi.getSelectedNodes();
    // console.log(selectedNodes);
    return selectedRows[0].id;
  };

  const [columnDefs] = useState([
    { field: "firstName", maxWidth: 120 },
    { field: "lastName", maxWidth: 120 },
    { field: "email", maxWidth: 250 },
    { field: "number", maxWidth: 120 },
    { field: "gender", maxWidth: 100 },
    { field: "", cellRenderer: EditBtn, maxWidth: 100 },
    { field: "", cellRenderer: DeleteBtn, maxWidth: 120 },
  ]);

  return (
    <>
      {!employeeInfo && status === "loading" ? (
        <h1>Loading...</h1>
      ) : (
        <Container style={flexStyle}>
          <h1>Table of Employees</h1>
          <Link to="/employee/add" className="btn btn-hero" style={btnStyle}>
            <Button color="primary" variant="contained">
              Add
            </Button>
          </Link>

          <div className="ag-theme-alpine" style={{ height: 600, width: 900 }}>
            <AgGridReact
              rowData={userData}
              columnDefs={columnDefs}
              onGridReady={onGridReady}
              getRowNodeId={getRowNodeId}
              enableRangeSelection={true}
              rowSelection={"multiple"}
              enableSorting={true}
              enableFilter={true}
            ></AgGridReact>
          </div>
          <Modal
            open={show}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box style={modalStyle}>
              <Typography variant="h6" id="modal-title">
                Confirm you want to delete?
              </Typography>
              <Typography variant="subtitle1" id="simple-modal-description">
                Once confirmed, item will be deleted from database.
              </Typography>
              <br />
              <Button
                color="warning"
                variant="contained"
                onClick={handleDelete}
              >
                Confirm
              </Button>
            </Box>
          </Modal>
        </Container>
      )}
    </>
  );
};

export default HomePage;
