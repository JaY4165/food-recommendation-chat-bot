import { Avatar, Card, Typography } from "@mui/joy";
import BotProfile from "../assets/bot.jpg";

const WelcomeCard = () => {
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
      }}
    >
      <Avatar variant="soft" src={BotProfile} size="sm" />
      <Typography level="body-md">
        Welcome to food recommendation chatbot
      </Typography>
    </Card>
  );
};

export default WelcomeCard;
