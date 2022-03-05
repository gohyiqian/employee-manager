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
import { useNavigate, Link } from "react-router-dom";

const flexStyle = {
  display: "flex",
  flexDirection: "column",
  padding: "20px",
};

const btnStyle = {
  textDecoration: "none",
  paddingBottom: "10px",
};

const phoneRegExp = /^\+65(6|8|9)\d{7}$/;

const validationSchema = yup.object({
  firstname: yup
    .string("Enter your firstname")
    .min(6, "First name should have minimum 6 characters length")
    .max(10, "First name should have maximum 10 characters length")
    .required("First name is required"),
  lastname: yup
    .string("Enter your lastname")
    .min(6, "Last name should have minimum 6 characters length")
    .max(10, "Last name should have maximum 10 characters length")
    .required("Last name is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  phone: yup
    .string()
    .matches(phoneRegExp, "Phone number should starts with 65")
    .required("Phone number is required"),
});

const AddPage = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "foobar@example.com",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      navigate("/employee/list");
    },
  });

  return (
    <Container style={flexStyle}>
      <h1>Edit Employee</h1>
      <Link to="/employee/list" className="btn btn-hero" style={btnStyle}>
        <Button color="primary" variant="contained">
          Back
        </Button>
      </Link>
      <form onSubmit={formik.handleSubmit}>
        <Grid item sm={5} md={5}>
          <Paper elevation={3} style={flexStyle}>
            <TextField
              id="firstname"
              name="firstname"
              label="First Name"
              value={formik.values.firstname}
              onChange={formik.handleChange}
              error={
                formik.touched.firstname && Boolean(formik.errors.firstname)
              }
              helperText={formik.touched.firstname && formik.errors.firstname}
            />
            <TextField
              id="lastname"
              name="lastname"
              label="Last Name"
              placeholder=""
              value={formik.values.lastname}
              onChange={formik.handleChange}
              error={formik.touched.lastname && Boolean(formik.errors.lastname)}
              helperText={formik.touched.lastname && formik.errors.lastname}
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
              name="phone"
              label="Phone Number"
              placeholder="65 XXXX XXXX"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
            <br />

            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
              style={{ padding: "10px" }}
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
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
