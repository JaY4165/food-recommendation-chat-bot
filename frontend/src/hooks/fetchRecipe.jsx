import axios from "axios";

const fetchRecipe = async (food) => {
  try {
    const response = await axios.post("http://localhost:8081/api/v1/recipe", {
      food: food,
    });
    const parsedRes = await JSON.parse(response.data);
    console.log(parsedRes);
    return parsedRes;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default fetchRecipe;
