import { useColorScheme } from "@mui/joy/styles";
import Button from "@mui/joy/Button";

export default function ToggleMode() {
  const { mode, setMode } = useColorScheme();
  return (
    <Button
      variant="soft"
      color="primary"
      onClick={() => setMode(mode === "dark" ? "light" : "dark")}
    >
      {mode === "dark" ? "Turn light" : "Turn dark"}
    </Button>
  );
}
