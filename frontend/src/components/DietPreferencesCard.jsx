/* eslint-disable react/prop-types */
import { Avatar, Card } from "@mui/joy";
import DietPreferenceList from "./DietPreferenceList";
import BotProfile from "../assets/bot.jpg";

const DietPreferencesCard = () => {
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
        <DietPreferenceList />
      </div>
    </Card>
  );
};

export default DietPreferencesCard;
