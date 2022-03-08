import Cafe from "../models/Cafe.js";
import Employee from "../models/Employee.js";

/* GET endpoint: api/cafes?location=<location>
 * get location of Cafe
 * sorted by highest # of employees that a Cafe has
 */
const getCafeLocation = async (req, res, next) => {
  let locationQuery = req.query.location;
  // console.log(locationQuery);

  // check if location exist
  try {
    // sort by highest # of employees first
    const cafeExist = await Cafe.find({ location: locationQuery }).sort({
      employees: -1,
    });
    if (cafeExist.length !== 0) {
      res.status(200).json({
        cafeExist,
      });
    }
    if (cafeExist.length === 0) {
      // can choose to return empty list too but a msg will be better
      res.status(404).json({
        msg: "No such Cafe",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

/* GET endpoint: /cafes/employees
 * get all employees
 * sorted by highest # of days_worked
 */
const getAllEmployees = async (req, res, next) => {
  const { name, description, employees, location } = req.body;
  try {
    const AllEmployees = await Employee.find().sort({ days_worked: -1 });
    if (AllEmployees.length !== 0) {
      res.status(200).json({
        AllEmployees,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

/* POST endpoint: /cafe
 * create a new Cafe with default 0 employee if not stated in req.body
 */
const createCafe = async (req, res, next) => {
  const { name, description, employees, location } = req.body;

  try {
    const cafeExist = await Cafe.findOne({ name });
    if (cafeExist) {
      res.status(404).json({ msg: "Cafe already exist" });
    }
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

/* POST endpoint: /cafe/employee
 * create a new employee to the cafe
 * no same employee can work in 2 cafes
 */
const createCafeEmployee = async (req, res, next) => {
  const { cafeName, employeeName } = req.body;

  // check if cafe exists
  try {
    const cafeExist = await Cafe.findOne({ cafeName });
    if (!cafeExist) {
      res.status(404).json({ msg: "Cafe does not exist" });
    }
    // check if employee already works in this cafe or working in other cafe (non-empty "")
    const employeeExist = await Employee.findOne({ name: employeeName });
    if (employeeExist) {
      if (cafeExist._id === employeeExist.cafe || employeeExist.cafe !== "") {
        res.status(404).json({
          msg: `${employeeExist.name} is already working in ${cafeExist.name} Cafe`,
        });
      }
    }

    // can only create employee after cafe is created & employee does not work for the cafe
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
  } catch (err) {
    console.log(err);
  }
};

export { createCafe, createCafeEmployee, getAllEmployees, getCafeLocation };
