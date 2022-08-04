import { useState } from "react" ;
import { StyleSheet, Text, View, TouchableHighlight, TextInput } from "react-native" ;

// Modal
function Modal({ navigation }: any): JSX.Element
{
  // Variable
  const [key, setKey] = useState<number>() ;

  // Handle Change
  function handleChange(x: string): void
  {
    setKey(~~x) ;
  }

  return (
  <>
    <View style={ styles.Modal }>
      <View style={ styles.Group736 }>

        <TouchableHighlight onPress={ () => navigation.navigate("OnlineBlue") } style={ styles.Button }>
          <Text style={ styles.Txt645 }> Create Server </Text>
        </TouchableHighlight>

        <TextInput
          onChangeText={ handleChange }
          textAlign="center"
          returnKeyType="done"
          placeholder="Server Key"
          maxLength={ 5 }
          editable={ true }
          autoFocus={ false }
          autoCorrect={ false }
          autoComplete="off"
          placeholderTextColor="rgba(245,245,245,1)"
          keyboardType="number-pad"
          style={ styles.Txt858 }
        />

        <TouchableHighlight onPress={ () => navigation.navigate("OnlineRed") } style={ styles.Button }>
          <Text style={ styles.Txt645 }> Join Server </Text>
        </TouchableHighlight>

      </View>
    </View>
  </>
  ) ;
}

// Styles
const styles = StyleSheet.create({
  Modal: 
  {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: 235,
    paddingLeft: 80,
    paddingRight: 80,
    backgroundColor: "rgba(7,87,103,1)",
    width: 360,
    height: 500
  },
  Group736: 
  {
    marginTop: 100,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  Button: 
  {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 30,
    borderRadius: 100,
    backgroundColor: "rgba(245,245,245,1)",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(0,0,0,1)",
    width: 200,
    height: 45
  },
  Txt645: 
  {
    fontSize: 18,
    fontFamily: "Raleway",
    color: "rgba(7,87,103,1)",
    textAlign: "center",
    justifyContent: "center",
    marginTop: 1,
    width: 175,
    height: 35
  },
  Txt858: 
  {
    fontSize: 30,
    fontFamily: "Raleway",
    color: "rgba(245,245,245,1)",
    textAlign: "center",
    justifyContent: "center",
    width: 200,
    height: 80,
    marginBottom: 25,
    textTransform: "uppercase",
    borderBottomColor: "rgba(245,245,245,1)",
    borderBottomWidth: 1
  }
}) ;

// Export Modal
export default Modal ;