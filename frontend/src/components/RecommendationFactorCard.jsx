/* eslint-disable react/prop-types */
import { Avatar, Card } from "@mui/joy";
import RecommendationFactorList from "./RecommendationFactorList";
import BotProfile from "../assets/bot.jpg";

const RecommendationFactorCard = () => {
  return (
    <Card
      variant="soft"
      color="neutral"
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "start",
        gap: "1rem",
        width: "fit-content",
        alignSelf: "flex-end",
      }}
    >
      <Avatar variant="soft" src={BotProfile} />
      <div>
        <RecommendationFactorList />
      </div>
    </Card>
  );
};

export default RecommendationFactorCard;
