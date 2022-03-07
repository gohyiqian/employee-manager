import Cafe from "../models/Cafe.js";

/* GET endpoint: /cafes?location=<location>
 * get location of Cafe
 * sorted by highest # of employees that a Cafe has
 */

/* GET endpoint: /cafes/employees
 * get all employees
 * sorted by highest # of days_worked
 */

/* POST endpoint: /cafe
 * create a new Cafe
 */
const createCafe = async (req, res, next) => {
  const { name, description, employees, location } = req.body;
  const newCafe = await Cafe.create({ name, description, employees, location });
  res.status(201).json({
    newCafe,
  });
};

/* POST endpoint: /cafe/employee
 * create a new employee to the cafe
 * no same employee can work in 2 cafes
 */

export { createCafe };
