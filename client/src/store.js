import { configureStore } from "@reduxjs/toolkit";
// import {rootSaga} from './redux/sagas'
import createSagaMiddleware from "@redux-saga/core";
import { employeeReducer } from "./redux/slice/employeeSlice";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    employees: employeeReducer,
  },
});

export default store;
