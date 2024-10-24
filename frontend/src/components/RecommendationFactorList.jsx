/* eslint-disable react/prop-types */
import Box from "@mui/joy/Box";
import Checkbox from "@mui/joy/Checkbox";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Typography from "@mui/joy/Typography";
import { Button } from "@mui/joy";
import { useContext, useState } from "react";
import { ArrowRight } from "@mui/icons-material";
import recommendationFactors from "../data/recommendationFactors";
import StepsContext from "../contexts/stepsContext";
import FoodContext from "../contexts/foodContext";

export default function RecommendationFactorList() {
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const { incrementStep } = useContext(StepsContext);
  const { updateFactor } = useContext(FoodContext);

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
    console.log("Selected Diet Preferences:", selectedPreferences);
    await updateFactor(selectedPreferences);
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
          {recommendationFactors.map((item) => (
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
        Get Food
        <ArrowRight />
      </Button>
    </Box>
  );
}
