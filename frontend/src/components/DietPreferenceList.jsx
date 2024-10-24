import Box from "@mui/joy/Box";
import Checkbox from "@mui/joy/Checkbox";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Typography from "@mui/joy/Typography";
import dietaryPreferences from "../data/dietPreferences";
import { Button } from "@mui/joy";
import { useContext, useState } from "react";
import { ArrowRight } from "@mui/icons-material";
import StepsContext from "../contexts/stepsContext";
import FoodContext from "../contexts/foodContext";

export default function DietPreferenceList() {
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const { incrementStep } = useContext(StepsContext);
  const { updateDiet } = useContext(FoodContext);

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    if (selectedPreferences.includes(value)) {
      setSelectedPreferences(
        selectedPreferences.filter((preference) => preference !== value)
      );
    } else {
      setSelectedPreferences([...selectedPreferences, value]);
    }
  };

  const getDietPreferences = async (e) => {
    e.preventDefault();
    await updateDiet(selectedPreferences);
    await incrementStep();
  };
  return (
    <Box sx={{ width: "auto" }}>
      <Typography
        id="topping"
        level="body-sm"
        fontWeight="lg"
        sx={{ paddingBottom: "0.1rem" }}
      >
        Select type of diet
      </Typography>
      <div role="group" aria-labelledby="topping">
        <List
          orientation="horizontal"
          wrap
          sx={{
            marginTop: "1rem",
            "--List-gap": "1.2rem",
            "--ListItem-radius": "20px",
          }}
        >
          {dietaryPreferences.map((item) => (
            <ListItem
              key={item}
              sx={{
                border: "0.1rem solid #333638",
              }}
            >
              <Checkbox
                overlay
                disableIcon
                variant="soft"
                label={item}
                value={item}
                onChange={handleCheckboxChange}
              />
            </ListItem>
          ))}
        </List>
      </div>
      <Button
        variant="soft"
        sx={{ width: "100%", marginTop: "2rem" }}
        onClick={getDietPreferences}
      >
        Next
        <ArrowRight />
      </Button>
    </Box>
  );
}
