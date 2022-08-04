import { useState, useRef } from "react" ;
import { StyleSheet, Image, Text, View, TouchableOpacity, ImageSourcePropType } from "react-native" ;
import { setDoc, doc, getDocs } from "firebase/firestore" ;
// ...
import Images from "../components/Images" ;
import db from "../components/firebaseProvider" ;

// Online Blue
function OnlineBlue({ navigation }: any): JSX.Element
{
  // Variables
  const imgObj: ImageSourcePropType[] =
  [
    Images["emp1"], Images["emp2"], Images["emp3"], 
    Images["emp4"], Images["emp5"], Images["emp6"], 
    Images["emp7"], Images["emp8"], Images["emp9"]
  ] ;
  const [turn, setTurn] = useState<boolean>(true) ;
  const slots = useRef<string[]>(["emp1", "emp2", "emp3", "emp4", "emp5", "emp6", "emp7", "emp8", "emp9"]) ;
  const [game, setGame] = useState<boolean>(true) ;
  const [message, setMes] = useState<string>("") ;
  const [img, setImg] = useState<ImageSourcePropType[]>(imgObj) ;

  // Update Server
  async function update(): Promise<void>
  {
    try
    {
      let document: string = (Math.floor(Math.random() * 99999) + 10000).toString() ; 
      let ref = doc(db, `server/${ document }`) ;

      await setDoc(ref, { slots: slots }) ;
    }
    catch (err: any)
    {
      console.log(err) ;

      setMes("Server Down!") ;
      setTimeout(() => navigation.navigate("Menu"), 1500) ;
    }
  }

  // Handle Click
  function handleClick(x: number): void
  {
    if (game)
    {
      let index: number = x - 1 ;

      if (img[index] === Images["emp" + x])
      {
        let temp: ImageSourcePropType[] = img ;

        // Change Image
        if (turn)
        {
          temp[index] = Images["cir" + x] ;
        }
        else
        {
          temp[index] = Images["crs" + x] ;
        }

        checkGame(temp) ;

        setTurn(!turn) ;
        setImg(temp) ;
      }
    }
  }

  // Check Game
  function checkGame(temp: ImageSourcePropType[]): void
  {
    // Set Player
    let x: string = turn ? "cir" : "crs" ;
    let gameContinue: boolean = true ;

    // Tie
    if ((temp[0] !== Images["emp1"]) && (temp[1] !== Images["emp2"]) && (temp[2] !== Images["emp3"]) && 
    (temp[3] !== Images["emp4"]) && (temp[4] !== Images["emp5"]) && (temp[5] !== Images["emp6"]) && 
    (temp[6] !== Images["emp7"]) && (temp[7] !== Images["emp8"]) && (temp[8] !== Images["emp9"]))
    {
      setMes("MATCH TIE!") ;
      setGame(false) ;
    }

    // Row 1
    if ((temp[0] === Images[x + "1"]) && (temp[1] === Images[x + "2"]) && (temp[2] === Images[x + "3"]))
    {
      temp[0] = Images[x + "W1"] ;
      temp[1] = Images[x + "W2"] ;
      temp[2] = Images[x + "W3"] ;

      gameContinue = false ;
    }

    // Row 2
    if ((temp[3] === Images[x + "4"]) && (temp[4] === Images[x + "5"]) && (temp[5] === Images[x + "6"]))
    {
      temp[3] = Images[x + "W4"] ;
      temp[4] = Images[x + "W5"] ;
      temp[5] = Images[x + "W6"] ;

      gameContinue = false ;
    }

    // Row 3
    if ((temp[6] === Images[x + "7"]) && (temp[7] === Images[x + "8"]) && (temp[8] === Images[x + "9"]))
    {
      temp[6] = Images[x + "W7"] ;
      temp[7] = Images[x + "W8"] ;
      temp[8] = Images[x + "W9"] ;

      gameContinue = false ;
    }

    // Column 1
    if ((temp[0] === Images[x + "1"]) && (temp[3] === Images[x + "4"]) && (temp[6] === Images[x + "7"]))
    {
      temp[0] = Images[x + "W1"] ;
      temp[3] = Images[x + "W4"] ;
      temp[6] = Images[x + "W7"] ;

      gameContinue = false ;
    }

    // Column 2
    if ((temp[1] === Images[x + "2"]) && (temp[4] === Images[x + "5"]) && (temp[7] === Images[x + "8"]))
    {
      temp[1] = Images[x + "W2"] ;
      temp[4] = Images[x + "W5"] ;
      temp[7] = Images[x + "W8"] ;

      gameContinue = false ;
    }

    // Column 3
    if ((temp[2] === Images[x + "3"]) && (temp[5] === Images[x + "6"]) && (temp[8] === Images[x + "9"]))
    {
      temp[2] = Images[x + "W3"] ;
      temp[5] = Images[x + "W6"] ;
      temp[8] = Images[x + "W9"] ;

      gameContinue = false ;
    }

    // L To R
    if ((temp[0] === Images[x + "1"]) && (temp[4] === Images[x + "5"]) && (temp[8] === Images[x + "9"]))
    {
      temp[0] = Images[x + "W1"] ;
      temp[4] = Images[x + "W5"] ;
      temp[8] = Images[x + "W9"] ;

      gameContinue = false ;
    }

    // R To L
    if ((temp[2] === Images[x + "3"]) && (temp[4] === Images[x + "5"]) && (temp[6] === Images[x + "7"]))
    {
      temp[2] = Images[x + "W3"] ;
      temp[4] = Images[x + "W5"] ;
      temp[6] = Images[x + "W7"] ;

      gameContinue = false ;
    }

    // Victor
    if (!gameContinue)
    {
      if (turn)
      {
        setMes("PLAYER 1 WON!") ;
      }
      else
      {
        setMes("PLAYER 2 WON!") ;
      }

      setGame(gameContinue) ;
    }
  }

  // Reset
  function reset(): void
  {
    setTurn(true) ;
    setGame(true) ;
    setMes("") ;
    setImg(imgObj) ;
  }

  return (
  <>
    <View style={ styles.Offline }>

      <View style={ styles.Group }>
        
        { game &&
        <>
          <TouchableOpacity onPress={ update } style={ turn ? styles.CircleBlue : styles.CircleRed } />
        </>
        }

        { !game &&
        <>
          <TouchableOpacity onPress={ reset } style={ styles.CircleReload } />
        </>
        }

        <Text style={ styles.TxtHeader }> { message } </Text>
      </View>

      <View style={ styles.Board }>

        <TouchableOpacity onPress={ () => handleClick(1) } style={ styles.Image1 }>
          <Image style={ styles.Image } source={ img[0] } />
        </TouchableOpacity>
        <TouchableOpacity onPress={ () => handleClick(2) } style={ styles.Image2 }>
          <Image style={ styles.Image } source={ img[1] } />
        </TouchableOpacity>
        <TouchableOpacity onPress={ () => handleClick(3) } style={ styles.Image3 }>
          <Image style={ styles.Image } source={ img[2] } />
        </TouchableOpacity>

        <TouchableOpacity onPress={ () => handleClick(4) } style={ styles.Image4 }>
          <Image style={ styles.Image } source={ img[3] } />
        </TouchableOpacity>
        <TouchableOpacity onPress={ () => handleClick(5) } style={ styles.Image5 }>
          <Image style={ styles.Image } source={ img[4] } />
        </TouchableOpacity>
        <TouchableOpacity onPress={ () => handleClick(6) } style={ styles.Image6 }>
          <Image style={ styles.Image } source={ img[5] } />
        </TouchableOpacity>

        <TouchableOpacity onPress={ () => handleClick(7) } style={ styles.Image7 }>
          <Image style={ styles.Image } source={ img[6] } />
        </TouchableOpacity>
        <TouchableOpacity onPress={ () => handleClick(8) } style={ styles.Image8 }>
          <Image style={ styles.Image } source={ img[7] } />
        </TouchableOpacity>
        <TouchableOpacity onPress={ () => handleClick(9) } style={ styles.Image9 }>
          <Image style={ styles.Image } source={ img[8] } />
        </TouchableOpacity>

      </View>

      <View style={ styles.Card1 }>
        <Text style={ styles.TxtCard }> PLAYER 1 </Text>
      </View>

      <View style={ styles.Card2 }>
        <Text style={ styles.TxtCard }> PLAYER 2 </Text>
      </View>

      <View style={ styles.Footer } />

    </View>
  </>
  ) ;
}

// Styles
const styles = StyleSheet.create({
  Image:
  {
    width: 100,
    height: 100
  },
  Image1: 
  {
    position: "absolute",
    top: 70,
    left: 30,
    width: 100,
    height: 100
  },
  Image2: 
  {
    position: "absolute",
    top: 70,
    left: 130,
    width: 100,
    height: 100
  },
  Image3: 
  {
    position: "absolute",
    top: 70,
    left: 230,
    width: 100,
    height: 100
  },
  Image4: 
  {
    position: "absolute",
    top: 170,
    left: 30,
    width: 100,
    height: 100
  },
  Image5: 
  {
    position: "absolute",
    top: 170,
    left: 130,
    width: 100,
    height: 100
  },
  Image6: 
  {
    position: "absolute",
    top: 170,
    left: 230,
    width: 100,
    height: 100
  },
  Image7: 
  {
    position: "absolute",
    top: 270,
    left: 30,
    width: 100,
    height: 100
  },
  Image8: 
  {
    position: "absolute",
    top: 270,
    left: 130,
    width: 100,
    height: 100
  },
  Image9: 
  {
    position: "absolute",
    top: 270,
    left: 230,
    width: 100,
    height: 100
  },
  // ...
  Offline: 
  {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    position: "relative",
    paddingTop: 50,
    paddingBottom: 140,
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: "rgba(245,245,245,1)",
    width: 360,
    height: 640
  },
  Group: 
  {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  CircleBlue: 
  {
    backgroundColor: "rgba(30,35,140,1)",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(0,0,0,1)",
    width: 35,
    height: 35,
    borderRadius: 17.5,
    left: 30,
    top: 7
  },
  CircleRed: 
  {
    backgroundColor: "rgb(140,30,30)",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(0,0,0,1)",
    width: 35,
    height: 35,
    borderRadius: 17.5,
    left: 30,
    top: 7
  },
  CircleReload:
  {
    backgroundColor: "rgb(1,150,75)",
    borderWidth: 3,
    borderStyle: "solid",
    borderColor: "rgba(0,0,0,1)",
    width: 35,
    height: 35,
    borderRadius: 17.5,
    left: 30,
    top: 7
  },
  TxtHeader: 
  {
    fontFamily: "Raleway",
    fontSize: 30,
    color: "rgba(7,87,103,1)",
    textAlign: "center",
    justifyContent: "center",
    left: 30,
    width: 300,
    height: 50,
    marginBottom: 30,
    marginTop: 30,
    textTransform: "uppercase"
  },
  Card1: 
  {
    position: "absolute",
    top: 50,
    left: -20,
    paddingTop: 7,
    paddingBottom: 10,
    paddingLeft: 0,
    paddingRight: 0,
    borderRadius: 100,
    backgroundColor: "rgba(30,35,140,1)",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(0,0,0,1)",
    width: 150,
    height: 50
  },
  Card2: 
  {
    position: "absolute",
    top: 50,
    left: 230,
    paddingTop: 7,
    paddingBottom: 10,
    paddingLeft: 0,
    paddingRight: 0,
    borderRadius: 100,
    backgroundColor: "rgb(140,30,30)",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(0,0,0,1)",
    width: 150,
    height: 50
  },
  TxtCard: 
  {
    fontFamily: "Raleway",
    fontSize: 20,
    color: "rgba(245,245,245,1)",
    textAlign: "center",
    justifyContent: "center",
    width: 150,
    height: 30,
    textTransform: "uppercase"
  },
  Board: 
  {
    position: "relative",
    width: 300,
    height: 300
  },
  Footer:
  {
    width: 500,
    height: 70,
    top: 200,
    left: 0,
    backgroundColor: "rgba(7,87,103,1)"
  }
}) ;

// Export Online Blue
export default OnlineBlue ;