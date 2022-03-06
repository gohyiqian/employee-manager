import { flexStyle, btnStyle } from "./pagesStyle";
import { Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { types } from "../redux/types/index";

const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onBtnClick = () => {
    dispatch({ type: types.GET_EMPLOYEES });
    setTimeout(() => {
      navigate("/employee/list");
    }, 1500);
  };

  return (
    <Container style={flexStyle}>
      <h1>Welcome</h1>

      <Button
        onClick={onBtnClick}
        color="primary"
        variant="contained"
        style={btnStyle}
      >
        Employees List
      </Button>
    </Container>
  );
};

export default LandingPage;
