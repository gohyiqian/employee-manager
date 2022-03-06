import { createSlice } from "@reduxjs/toolkit";

// const URL = "https://6164f6e709a29d0017c88ed9.mockapi.io/fetest/employees";

// export const getEmployees = createAsyncThunk("employee/list", async () => {
//   try {
//     let response = await fetch(URL);
//     const data = await response.json();
//     console.log(data);
//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// });

export const employeeSlice = createSlice({
  name: "employees",
  initialState: {
    employeeInfo: [] || JSON.parse(localStorage.getItem("employeeInfo")),
  },
  reducers: {
    getEmployees: (state, action) => {
      localStorage.setItem("employeeInfo", JSON.stringify(action.payload));
      return {
        employeeInfo: action.payload,
      };
    },
    getEmployeesById: (state, action) => {
      let newEmployeeInfo = [...state.employeeInfo];
      newEmployeeInfo = newEmployeeInfo.filter((i) => i.id === action.payload);
      console.log(newEmployeeInfo);
      // localStorage.setItem("employeeInfo", JSON.stringify(state.employeeInfo));
      return {
        ...state,
        employeeInfo: newEmployeeInfo,
      };
    },
    addEmployee: (state, action) => {
      action.payload["id"] = state.employeeInfo.length; //add id
      state.employeeInfo.push(action.payload);
      localStorage.setItem("employeeInfo", JSON.stringify(state.employeeInfo));
      return state;
    },
    updateEmployee: (state, action) => {
      console.log(action.payload);
      let newEmployeeInfo = [...state.employeeInfo];
      // replace with new
      newEmployeeInfo = newEmployeeInfo.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
      console.log(newEmployeeInfo);
      localStorage.setItem("employeeInfo", JSON.stringify(state.employeeInfo));
      return {
        ...state,
        employeeInfo: newEmployeeInfo,
      };
    },
    deleteEmployee: (state, action) => {
      let newEmployeeInfo = [...state.employeeInfo];
      newEmployeeInfo = newEmployeeInfo.filter((i) => i.id !== action.payload);
      localStorage.setItem("employeeInfo", JSON.stringify(newEmployeeInfo));
      return {
        ...state,
        employeeInfo: newEmployeeInfo,
      };
    },
    errorEmployee: (state, action) => {
      state = action.payload;
      return state;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(getEmployees.pending, (state) => {
  //       state.status = "loading";
  //     })
  //     .addCase(getEmployees.fulfilled, (state, action) => {
  //       state.employeeInfo = action.payload;
  //       state.status = "success";
  //       localStorage.setItem("employeeInfo", JSON.stringify(action.payload));
  //     })
  //     .addCase(getEmployees.rejected, (state) => {
  //       state.status = "failed";
  //     });
  // },
});

export const { actions } = employeeSlice;
export const employeeReducer = employeeSlice.reducer;
