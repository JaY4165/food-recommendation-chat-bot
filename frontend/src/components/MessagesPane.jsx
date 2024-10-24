import {
  Avatar,
  Box,
  Button,
  Card,
  CardCover,
  List,
  ListItem,
  Typography,
} from "@mui/joy";
import BackgroundImage from "../assets/background.jpg";
import StepsContext from "../contexts/stepsContext";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import WelcomeCard from "./WelcomeCard";
import DietPreferencesCard from "./DietPreferencesCard";
import RecommendationFactorCard from "./RecommendationFactorCard";
import { AnimatePresence, motion } from "framer-motion";
import FoodContext from "../contexts/foodContext";
import useFoodRecommendations from "../hooks/fetchFoodRecommendations";
import BotProfile from "../assets/bot.jpg";
import { CardContent } from "@mui/material";
import fetchRecipe from "../hooks/fetchRecipe";

const cardVariant1 = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 1 } },
};

const cardVariant2 = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 2 } },
};

const MessagesPane = () => {
  const bottomRef = useRef(null);
  const { currentStep } = useContext(StepsContext);
  const { diet, factor } = useContext(FoodContext);
  const [selectedFoodRecipe, setSelectedFoodRecipe] = useState(null);
  const { recommendations, isLoading, error } = useFoodRecommendations(
    diet,
    factor,
    currentStep
  );

  const handleClick = async (food) => {
    const resData = await fetchRecipe(food);
    if (resData) {
      console.log(resData);
      setSelectedFoodRecipe(resData);
      return;
    }
    setSelectedFoodRecipe(null);
  };

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [currentStep, scrollToBottom, recommendations, selectedFoodRecipe]);

  return (
    <Box sx={{ height: "100vh" }}>
      <Card
        variant="soft"
        color="neutral"
        sx={{
          p: 5,
          height: "100%",
          display: "flex",
          overflowY: "hidden",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        <CardCover sx={{ objectFit: "cover" }}>
          <img src={BackgroundImage} loading="lazy" alt="" />
        </CardCover>
        <CardCover
          sx={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.4) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
          }}
        />

        <Box
          className="hide-scroll hide-scroll-firefox"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "2em",
            overflowY: "scroll",
          }}
        >
          <AnimatePresence>
            {currentStep >= 0 && (
              <motion.div
                key="welcome"
                initial="hidden"
                animate="visible"
                variants={cardVariant1}
              >
                <WelcomeCard />
              </motion.div>
            )}
            {currentStep >= 0 && (
              <motion.div
                key="diet"
                initial="hidden"
                animate="visible"
                variants={cardVariant2}
              >
                <DietPreferencesCard />
              </motion.div>
            )}
            {currentStep >= 1 && (
              <motion.div
                key="factor"
                initial="hidden"
                animate="visible"
                variants={cardVariant1}
              >
                <RecommendationFactorCard />
              </motion.div>
            )}
            {currentStep >= 2 && (
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "2em" }}
              >
                {isLoading && <p>Loading recommendations...</p>}
                {error && <p>Error: {error}</p>}
                {recommendations &&
                  recommendations.map((recommendation) => {
                    return (
                      <motion.div
                        key={crypto.randomUUID()}
                        initial="hidden"
                        animate="visible"
                        variants={cardVariant2}
                      >
                        <Card
                          className="desc-card"
                          variant="soft"
                          color="neutral"
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Avatar variant="soft" src={BotProfile} />
                          <CardContent>
                            <Typography
                              level="title-lg"
                              sx={{ marginBottom: "0.5em" }}
                            >
                              {recommendation.name}
                            </Typography>
                            <Typography level="body-md">
                              {recommendation.description}
                            </Typography>
                            <Button
                              variant="soft"
                              size="sm"
                              color="primary"
                              sx={{ marginTop: "1em" }}
                              onClick={() => handleClick(recommendation)}
                            >
                              View Recipe
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
              </Box>
            )}

            {selectedFoodRecipe && (
              <motion.div
                key="recipe"
                initial="hidden"
                animate="visible"
                variants={cardVariant1}
              >
                <Card
                  className="desc-card"
                  variant="soft"
                  color="neutral"
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Avatar variant="soft" src={BotProfile} />
                  <CardContent>
                    <Typography level="title-lg" sx={{ marginBottom: "0.5em" }}>
                      {selectedFoodRecipe.name}
                    </Typography>
                    <Typography level="body-lg">Ingredients:</Typography>
                    <List marker="decimal">
                      {selectedFoodRecipe.recipe.ingredients.map(
                        (ingredient) => (
                          <ListItem key={crypto.randomUUID()} level="body-sm">
                            {ingredient}
                          </ListItem>
                        )
                      )}
                    </List>
                    <Typography level="body-lg">Instructions:</Typography>
                    <List marker="decimal">
                      {selectedFoodRecipe.recipe.instructions.map(
                        (instruction) => (
                          <ListItem key={crypto.randomUUID()} level="body-sm">
                            {instruction}
                          </ListItem>
                        )
                      )}
                    </List>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={bottomRef} />
        </Box>
      </Card>
    </Box>
  );
};

export default MessagesPane;
