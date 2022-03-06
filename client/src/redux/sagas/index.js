import { all } from "redux-saga/effects";
import { watchEmployeeAsync } from "./employeeSaga";

export default function* employeeSaga() {
  yield all([watchEmployeeAsync()]);
}
