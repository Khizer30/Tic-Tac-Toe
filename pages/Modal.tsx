import { useState } from "react" ;
import { StyleSheet, Text, View, TouchableHighlight, TextInput } from "react-native" ;
import { setDoc, doc, DocumentReference, DocumentData, getDoc, DocumentSnapshot } from "firebase/firestore" ;
// ...
import db from "../components/firebaseProvider" ;

// Modal
function Modal({ navigation }: any): JSX.Element
{
  // Variables
  const [key, setKey] = useState<number>() ;
  const [mes, setMes] = useState<string>("") ;

  // Handle Change
  function handleChange(x: string): void
  {
    setKey(~~x) ;
  }

  // Create Server
  async function createServer(): Promise<void>
  {
    let serverKey: string = (Math.floor(Math.random() * 89999) + 10000).toString() ;
    let ref: DocumentReference<DocumentData> = doc(db, `server/${ serverKey }`) ;

    setMes("Creating Room...") ;

    await setDoc(ref, { game: true, turn: true, slots: ["emp1", "emp2", "emp3", "emp4", "emp5", "emp6", "emp7", "emp8", "emp9"] }) ;

    setMes("") ;

    navigation.navigate("OnlineBlue", { serverKey: serverKey }) ;
  }

  // Find Server
  async function findServer(): Promise<void>
  {
    if (key !== undefined)
    {
      let ref: DocumentReference<DocumentData> = doc(db, `server/${ key }`) ;

      setMes("Finding Room...") ;

      let docSnap: DocumentSnapshot<DocumentData> = await getDoc(ref) ;
      
      if (docSnap.exists())
      {
        setMes("") ;

        navigation.navigate("OnlineRed", { serverKey: key }) ;
      }
      else
      {
        setMes("Room Does Not Exists!") ;
      }
    }
    else
    {
      setMes("Enter a Server Key!") ;
    }
  }

  return (
  <>
    <View style={ styles.Modal }>
      <View style={ styles.Group736 }>

        <Text style={ styles.Message }> { mes } </Text>

        <TouchableHighlight onPress={ createServer } style={ styles.Button }>
          <Text style={ styles.Txt645 }> Create Room </Text>
        </TouchableHighlight>

        <TextInput
          onChangeText={ handleChange }
          textAlign="center"
          returnKeyType="done"
          placeholder="Room Key"
          maxLength={ 5 }
          editable={ true }
          autoFocus={ false }
          autoCorrect={ false }
          autoComplete="off"
          placeholderTextColor="rgba(245,245,245,1)"
          keyboardType="number-pad"
          style={ styles.Txt858 }
        />

        <TouchableHighlight onPress={ findServer } style={ styles.Button }>
          <Text style={ styles.Txt645 }> Join Room </Text>
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
  },
  Message:
  {
    fontSize: 15,
    fontFamily: "Raleway",
    color: "rgba(245,245,245,1)",
    textAlign: "center",
    justifyContent: "center",
    width: 175,
    height: 35
  }
}) ;

// Export Modal
export default Modal ;