import Cafe from "../models/Cafe.js";
import Employee from "../models/Employee.js";

/* GET endpoint: api/cafes?location=<location>
 * get location of Cafe
 * sorted by highest # of employees that a Cafe has
 */
const getCafeLocation = async (req, res, next) => {};

/* GET endpoint: /cafes/employees
 * get all employees
 * sorted by highest # of days_worked
 */
const getAllEmployees = async (req, res, next) => {
  const { name, description, employees, location } = req.body;
};

/* POST endpoint: api/cafe
 * create a new Cafe with 0 employee
 */
const createCafe = async (req, res, next) => {
  const { name, description, employees, location } = req.body;
  try {
    const newCafe = await Cafe.create({
      name,
      description,
      employees,
      location,
    });

    res.status(201).json({
      newCafe,
    });
  } catch (err) {
    res.status(404).json({ error: err.errors });
  }
};

/* POST endpoint: api/cafe/employee
 * create a new employee to the cafe
 * no same employee can work in 2 cafes
 */
const createCafeEmployee = async (req, res, next) => {
  const { name, employeeName } = req.body;

  // const newCafe = await new Cafe({ name, description, employees, location });
  // newCafe.save();

  // check if cafe exists
  const cafeExist = await Cafe.findOne({ name });
  console.log(cafeExist);
  if (!cafeExist) {
    res.status(404).json({ msg: "Cafe does not exist" });
  }

  // check if employee is working in other cafe or already works in this cafe
  const employeeExist = await Cafe.findOne({});
  // if(){

  // }

  // can only create employee after cafe is created or exist
  if (cafeExist) {
    const newEmployee = await new Employee({
      name: employeeName,
      cafe: cafeExist._id,
    });
    newEmployee.save();

    res.status(201).json({
      cafeExist,
      newEmployee,
    });
  }
};

export { createCafe, createCafeEmployee, getAllEmployees, getCafeLocation };
