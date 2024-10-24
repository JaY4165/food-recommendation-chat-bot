import MessagesPane from "./components/MessagesPane";
import FoodContextProvider from "./providers/FoodContextProvider";
import StepsContextProvider from "./providers/StepsContextProvider";

function App() {
  return (
    <StepsContextProvider>
      <FoodContextProvider>
        <MessagesPane />
      </FoodContextProvider>
    </StepsContextProvider>
  );
}

export default App;
