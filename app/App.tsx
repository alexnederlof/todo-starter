import { createStackNavigator, createAppContainer } from "react-navigation";
import TodoScreen from "./src/containers/TodoScreen";
import AboutScreen from "./src/containers/AboutScreen";

const MainNavigator = createStackNavigator(
  {
    Todo: TodoScreen,
    About: AboutScreen
  },
  {
    initialRouteName: "Todos",
    headerMode: "none"
  }
);

const App = createAppContainer(MainNavigator);

export default App;
