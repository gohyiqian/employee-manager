import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "../App.css";
import { Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../redux/slice/employeeSlice";
import { flexStyle, btnStyle, modalStyle } from "./pagesStyle";
import { types } from "../redux/types";

const HomePage = () => {
  const [gridApi, setGridApi] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const { employeeInfo } = useSelector((state) => state.employees);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (employeeInfo.length === 0) {
      loadData();
    }
  }, []);

  const loadData = () => {
    dispatch({ type: types.GET_EMPLOYEES });
  };

  const DeleteBtn = () => {
    const onDelete = () => {
      setShowDeleteModal(true);
    };
    return (
      <Button color="error" variant="contained" onClick={onDelete}>
        Delete
      </Button>
    );
  };

  const EditBtn = () => {
    const onEdit = () => {
      setShowEditModal(true);
    };
    return (
      <Button color="primary" variant="contained" onClick={onEdit}>
        Edit
      </Button>
    );
  };

  const handleDelete = () => {
    dispatch(actions.deleteEmployee(getSelectedRows()));
    setShowDeleteModal(false);
  };

  const handleEdit = () => {
    dispatch(actions.getEmployeesById(getSelectedRows()));
    setShowEditModal(false);
    navigate(`/employee/edit/${getSelectedRows()}`);
  };

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const getRowNodeId = (params) => {
    return params.id;
  };

  const getSelectedRows = () => {
    let selectedRows = gridApi.getSelectedRows();
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
      <Container style={flexStyle}>
        <h1>Table of Employees</h1>

        <Button
          color="primary"
          variant="contained"
          style={btnStyle}
          onClick={() => navigate("/employee/add")}
        >
          Add Employee
        </Button>
        <Button
          color="primary"
          variant="contained"
          style={btnStyle}
          onClick={loadData}
        >
          Refresh Data
        </Button>

        <div className="ag-theme-alpine" style={{ height: 600, width: 900 }}>
          <AgGridReact
            rowData={employeeInfo}
            columnDefs={columnDefs}
            onGridReady={onGridReady}
            getRowNodeId={getRowNodeId}
            enableRangeSelection={true}
            rowSelection={"multiple"}
            enableSorting={true}
            enableFilter={true}
          ></AgGridReact>
        </div>
        {showDeleteModal && (
          <Modal
            open={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
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
        )}
        {showEditModal && (
          <Modal
            open={showEditModal}
            onClose={() => setShowEditModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box style={modalStyle}>
              <Typography variant="h6" id="modal-title">
                Confirm to Edit
              </Typography>
              <Typography variant="subtitle1" id="simple-modal-description">
                Click button to Edit Page
              </Typography>
              <br />
              <Button color="warning" variant="contained" onClick={handleEdit}>
                Confirm
              </Button>
            </Box>
          </Modal>
        )}
      </Container>
    </>
  );
};

export default HomePage;
