import { StyleSheet, Image, Text, View, ImageSourcePropType } from "react-native" ;
// ...
const logo: ImageSourcePropType = require("../assets/logos/logo_inverted.png") ;

// Error
function Error(): JSX.Element
{
  return (
  <>
    <View style={ styles.Error }>
      <View style={ styles.Group }>
        <Image
          style={ styles.Image }
          source={ logo }
        />
        <Text style={ styles.Txt1 }> OOPS! </Text>
        <Text style={ styles.Txt2 }> App Crashed </Text>
      </View>
    </View>
  </>
  ) ;
}

// Styles
const styles = StyleSheet.create({
  Error: 
  {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop: 50,
    paddingBottom: 135,
    paddingLeft: 35,
    paddingRight: 35,
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
    marginBottom: 10
  },
  Txt1: 
  {
    fontSize: 95,
    fontFamily: "Roboto",
    fontWeight: "500",
    color: "rgba(245,245,245,1)",
    textAlign: "center",
    justifyContent: "center",
    width: 300,
    height: 150,
    textTransform: "uppercase"
  },
  Txt2: 
  {
    position: "absolute",
    top: 385,
    fontSize: 35,
    fontFamily: "Roboto",
    fontWeight: "500",
    color: "rgba(245,245,245,1)",
    textAlign: "center",
    justifyContent: "center",
    width: 300,
    height: 100,
    textTransform: "uppercase"
  }
}) ;

// Export Error
export default Error ;