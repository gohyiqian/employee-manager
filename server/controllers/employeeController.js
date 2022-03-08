import Employee from "../models/Employee.js";
import Cafe from "../models/Cafe.js";

// not in requirement
/* POST endpoint: /employee
 * create a new employee
 */
const createEmployee = async (req, res, next) => {
  const { name, days_worked, cafe: _id } = req.body;
  console.log(_id);

  // check if cafe exist
  const cafeExist = await Cafe.findById({ _id });
  console.log(cafeExist);

  if (!cafeExist) {
    res.status(404).json({ msg: "Cafe does not exist" });
  }
  try {
    const newEmployee = await Employee.create({
      name,
      days_worked,
      cafe: _id,
    });
    res.status(201).json({
      newEmployee,
    });
  } catch (err) {
    res.status(404).json({ error: err.errors });
  }
};

export { createEmployee };
