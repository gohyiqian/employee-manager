import { call, takeEvery, put } from "redux-saga/effects";
import { actions } from "../slice/employeeSlice";
import { types } from "../types/index";
import axios from "axios";
const URL = "https://6164f6e709a29d0017c88ed9.mockapi.io/fetest/employees";

let callAPI = async ({ url, method, data }) => {
  return await axios({
    url,
    method,
    data,
  });
};

export function* getEmployeesSaga() {
  try {
    let response = yield call(() => callAPI({ url: URL }));
    yield put(actions.getEmployees(response.data));
  } catch (err) {
    yield put(
      actions.errorEmployee({
        error: err.message,
      })
    );
  }
}

export function* addEmployeeSaga() {
  let response = yield call();
  const data = yield response.json();
  yield put(actions.addEmployee(data));
}

export function* updateEmployeeSaga() {
  let response = yield call();
  const data = yield response.json();
  yield put(actions.updateEmployee(data));
}

export function* deleteEmployeeSaga(id) {
  try {
    yield put(actions.deleteEmployee(id));
  } catch (err) {
    yield put(
      actions.errorEmployee({
        error: err.message,
      })
    );
  }
}

export function* watchEmployeeAsync() {
  yield takeEvery(types.GET_EMPLOYEES, getEmployeesSaga);
  // yield takeEvery(types.CREATE_EMPLOYEE, addEmployeeSaga);
  // yield takeEvery(types.GET_EMPLOYEES_BY_ID, editEmployeeSaga);
  // yield takeEvery(types.DELETE_EMPLOYEE_BY_ID, deleteEmployeeSaga);
}
