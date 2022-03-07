import axios from "axios";
const coffeeURL = "https://api.sampleapis.com/coffee/hot";
const beerURL = "https://api.sampleapis.com/beers/ale";
const imgURL = "https://coffee.alexflipnote.dev/random.json";
import { v4 as uuidv4 } from "uuid";
import { descData } from "../config/descData.js";

/* GET endpoint: /drinks?type=<type>
 * get coffees
 */
const getDrinksByType = async (req, res, next) => {
  let drinkType = req.query.type;

  if (drinkType === "coffee") {
    try {
      const response = await axios.get(coffeeURL);
      const coffeeDetails = await response.data;

      const coffeeImg = await axios.get(imgURL);
      const imageURL = coffeeImg.data.file;
      console.log(imageURL);

      const formatArray = await coffeeDetails.map((item, index) => ({
        name: item.title,
        price: `$${Math.floor(Math.random() * 12) + 8 + ".99"}`, //Math.floor(Math.random() * (max - min)) + min;
        rating: (Math.random() * 4 + 1).toFixed(3),
        description: item.description,
        image: imageURL,
        id: uuidv4(),
      }));
      await res.json(formatArray);
    } catch (err) {
      res.json({ err: err });
    }
  }

  if (drinkType === "beer") {
    try {
      const response = await axios.get(beerURL);
      const beerDetails = await response.data;

      // Sort beerAPI's description
      const checkDescMatch = (data) => {
        return descData
          .filter((item) => data.includes(item.name))
          .map((item) => item.desc)
          .toString();
      };
      // checkDescMatch("Ale");

      const formatArray = await beerDetails.map((item, index) => ({
        name: item.name,
        price: item.price,
        rating: item.rating.average.toFixed(3),
        description: checkDescMatch(item.name) || "",
        image: item.image,
        id: uuidv4(),
      }));
      await res.json(formatArray);
    } catch (err) {
      res.json({ err: err });
    }
  }

  if (!drinkType) {
    try {
    } catch (err) {
      res.json();
    }
    res.send();
    // return blend of coffee and beer
    // sorted by highest rating first
    // res.send("Please query a drink type");
  }

  await res.send("No such drink type");
};

export { getDrinksByType };
