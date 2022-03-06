import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
// import {rootSaga} from './redux/sagas'
import createSagaMiddleware from "@redux-saga/core";
import { employeeReducer } from "./redux/slice/employeeSlice";
import employeeSaga from "./redux/sagas";

const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

const store = configureStore({
  reducer: {
    employees: employeeReducer,
  },
  middleware,
});

sagaMiddleware.run(employeeSaga);

export default store;
