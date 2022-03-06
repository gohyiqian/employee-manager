import { Button, Paper } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import {
  Container,
  Grid,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { flexStyle, btnStyle } from "./pagesStyle";
import { actions } from "../redux/slice/employeeSlice";
import { useDispatch } from "react-redux";

const phoneRegExp = /^65(6|8|9)\d{7}$/;

const validationSchema = yup.object({
  firstName: yup
    .string("Enter your firstname")
    .min(6, "First name should have minimum 6 characters length")
    .max(10, "First name should have maximum 10 characters length")
    .required("First name is required"),
  lastName: yup
    .string("Enter your lastname")
    .min(6, "Last name should have minimum 6 characters length")
    .max(10, "Last name should have maximum 10 characters length")
    .required("Last name is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  number: yup
    .string()
    .matches(
      phoneRegExp,
      "Phone number should start with 65, followed by 8 or 9"
    )
    .required("Phone number is required"),
  gender: yup.string(),
});

const AddPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {},
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      dispatch(actions.addEmployee(values));
      navigate("/employee/list");
    },
  });

  return (
    <Container style={flexStyle}>
      <h1>Add Employee</h1>

      <Button
        color="primary"
        variant="contained"
        onClick={() => navigate("/employee/list")}
        style={btnStyle}
      >
        Back
      </Button>

      <form onSubmit={formik.handleSubmit}>
        <Grid item sm={5} md={5}>
          <Paper elevation={3} style={flexStyle}>
            <TextField
              id="firstname"
              name="firstName"
              label="First Name"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <TextField
              id="lastname"
              name="lastName"
              label="Last Name"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
            <TextField
              id="email"
              name="email"
              label="Email"
              placeholder="XXX@email.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              id="phone"
              name="number"
              label="Phone Number"
              placeholder="65 XXXX XXXX"
              value={formik.values.number}
              onChange={formik.handleChange}
              error={formik.touched.number && Boolean(formik.errors.number)}
              helperText={formik.touched.number && formik.errors.number}
            />
            <br />

            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
              style={{ padding: "10px" }}
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={formik.values.gender}
              name="gender"
            >
              <FormControlLabel
                id="female"
                name="gender"
                value="female"
                onChange={formik.handleChange}
                control={<Radio />}
                label="female"
              />
              <FormControlLabel
                id="male"
                name="gender"
                value="male"
                onChange={formik.handleChange}
                control={<Radio />}
                label="male"
              />
              <FormControlLabel
                id="other"
                name="gender"
                value="other"
                onChange={formik.handleChange}
                control={<Radio />}
                label="other"
              />
            </RadioGroup>

            <br />
            <Button color="primary" variant="outlined" type="submit">
              Submit
            </Button>
          </Paper>
        </Grid>
      </form>
    </Container>
  );
};

export default AddPage;
