import { StyleSheet, Image, Text, View, TouchableHighlight, ImageSourcePropType } from "react-native" ;
// ...
const logo: ImageSourcePropType = require("../assets/logos/logo_inverted.png") ;

// Menu
function Menu({ navigation }: any): JSX.Element
{
  return (
  <>
    <View style={ styles.Screen }>
      <View style={ styles.Group }>
        <Image
          style={ styles.Image }
          source={ logo }
        />

        <TouchableHighlight onPress={ () => navigation.navigate("Offline") } style={ styles.Button }>
          <Text style={ styles.Txt }> OFFLINE </Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={ () => navigation.navigate("CPU") } style={ styles.Button }>
          <Text style={ styles.Txt }> vs CPU </Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={ () => navigation.navigate("Modal") } style={ styles.Button }>
          <Text style={ styles.Txt }> ONLINE </Text>
        </TouchableHighlight>

      </View>
    </View>
  </>
  ) ;
}

// Styles
const styles = StyleSheet.create({
  Screen: 
  {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop: 50,
    paddingBottom: 135,
    paddingLeft: 55,
    paddingRight: 55,
    backgroundColor: "rgba(7,87,103,1)"
  },
  Group: 
  {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  Image: 
  {
    width: 250,
    height: 250,
    marginBottom: 50
  },
  Button: 
  {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 30,
    borderRadius: 100,
    backgroundColor: "rgba(245,245,245,1)",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(0,0,0,1)",
    shadowColor: "rgba(0,0,0,0.25)",
    elevation: 0,
    shadowOffset: { width: 0, height: 3 },
    width: 175,
    height: 45
  },
  Txt: 
  {
    fontSize: 20,
    fontFamily: "Raleway",
    color: "rgba(7,87,103,1)",
    textAlign: "center",
    justifyContent: "center",
    width: 130,
    height: 30
  }
}) ;

// Export Menu
export default Menu ;