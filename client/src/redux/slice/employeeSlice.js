import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const URL = "https://6164f6e709a29d0017c88ed9.mockapi.io/fetest/employees";

export const getEmployees = createAsyncThunk("employee/list", async () => {
  try {
    let response = await fetch(URL);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
});

const employeeInfo = JSON.parse(localStorage.getItem("employeeInfo")) || {
  id: 0,
  firstName: "",
  lastName: "",
  email: "",
  number: "",
  gender: "",
};

export const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    employeeInfo,
    status: "idle",
  },
  reducers: {
    addEmployee: (state, action) => {
      state = action.payload;
      return state;
    },
    editEmployee: (state, action) => {
      state = state.employeeInfo.map((i) =>
        i.id === action.payload.id ? action.payload : i
      );
      return state;
    },
    deleteEmployee: (state, action) => {
      let newEmployeeInfo = [...state.employeeInfo];
      console.log(newEmployeeInfo);
      newEmployeeInfo = newEmployeeInfo.filter((i) => i.id !== action.payload);
      return {
        ...state,
        employeeInfo: newEmployeeInfo,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEmployees.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getEmployees.fulfilled, (state, action) => {
        state.employeeInfo = action.payload;
        state.status = "success";
        localStorage.setItem("employeeInfo", JSON.stringify(action.payload));
      })
      .addCase(getEmployees.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { actions } = employeeSlice; //export all actions
export const employeeReducer = employeeSlice.reducer;
