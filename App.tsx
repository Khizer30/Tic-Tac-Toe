import { useState, useEffect } from "react" ;
import { StatusBar } from "expo-status-bar" ;
import { NavigationContainer } from "@react-navigation/native" ;
import { createNativeStackNavigator } from "@react-navigation/native-stack" ;
import * as Font from "expo-font" ;
// ...
import Error from "./pages/Error" ;
import Menu from "./pages/Menu" ;
import Offline from "./pages/Offline" ;
import CPU from "./pages/CPU" ;
import Modal from "./pages/Modal" ;
import OnlineBlue from "./pages/OnlineBlue" ;
import OnlineRed from "./pages/OnlineRed" ;

// App
function App(): JSX.Element
{
  // Variables
  const [appState, setAppState] = useState<boolean>(false) ;
  const [error, setError] = useState<boolean>(false) ;
  const Stack = createNativeStackNavigator() ;

  // Set Up
  useEffect(() =>
  {
    async function prepare(): Promise<void>
    {
      try
      {
        // Fonts
        await Font.loadAsync({
          "Raleway": require("./assets/fonts/Raleway.ttf")
        }) ;

        setAppState(true) ;
      }
      catch
      {
        setError(true) ;
      }
    }

    prepare() ;
  }, []) ;

  return (
  <>

    <StatusBar
      animated
      backgroundColor="#075767"
      style="light"
    />

  { appState &&
  <>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Menu" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Menu" component={ Menu } />
        <Stack.Screen name="Offline" component={ Offline } />
        <Stack.Screen name="CPU" component={ CPU } />
        <Stack.Screen name="OnlineBlue" component={ OnlineBlue } />
        <Stack.Screen name="OnlineRed" component={ OnlineRed } />

        <Stack.Screen name="Modal" component={ Modal } options={{ presentation: "containedTransparentModal" }} />

      </Stack.Navigator>
    </NavigationContainer>
  </>
  }

  { error &&
  <>
    <Error />
  </>
  }

  </>
  ) ;
}

// Export App
export default App ;