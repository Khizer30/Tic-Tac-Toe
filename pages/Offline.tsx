import { useState } from "react" ;
import { StyleSheet, Image, Text, View, TouchableOpacity, ImageSourcePropType } from "react-native" ;
// ...
import Images from "../components/Images" ;

// Offline
function Offline(): JSX.Element
{
  // Variables
  const imgObj: ImageSourcePropType[] =
  [
    Images["emp1"], Images["emp2"], Images["emp3"], 
    Images["emp4"], Images["emp5"], Images["emp6"], 
    Images["emp7"], Images["emp8"], Images["emp9"]
  ] ;
  // ...
  const [turn, setTurn] = useState<boolean>(true) ;
  const [game, setGame] = useState<boolean>(true) ;
  const [message, setMes] = useState<string>("") ;
  const [img, setImg] = useState<ImageSourcePropType[]>(imgObj) ;

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
        setMes("BLUE WON!") ;
      }
      else
      {
        setMes("RED WON!") ;
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
      <View style={ styles.Main }>
  
        <View style={ styles.Header }>
  
          <View style={ styles.CardBlue }>
            <Text style={ styles.TxtCard }> BLUE </Text>
          </View>
  
          <View style={ styles.CardRed }>
            <Text style={ styles.TxtCard }> RED </Text>
          </View>
  
        { game &&
        <>
          <TouchableOpacity onPress={ reset } style={ turn ? styles.CircleBlue : styles.CircleRed } />
        </>
        }
  
        { !game &&
        <>
          <TouchableOpacity onPress={ reset } style={ styles.CircleReload } />
        </>
        }
  
          <Text style={ styles.HeaderTxt }> { message } </Text>
  
        </View>
  
        <View style={ styles.Board }>
  
          <View style={ styles.Row }>
            <TouchableOpacity onPress={ () => handleClick(1) } style={ styles.ImagePos }>
              <Image style={ styles.Image } source={ img[0] } />
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => handleClick(2) } style={ styles.ImagePos }>
              <Image style={ styles.Image } source={ img[1] } />
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => handleClick(3) } style={ styles.ImagePos }>
              <Image style={ styles.Image } source={ img[2] } />
            </TouchableOpacity>
          </View>
  
          <View style={ styles.Row }>
            <TouchableOpacity onPress={ () => handleClick(4) } style={ styles.ImagePos }>
              <Image style={ styles.Image } source={ img[3] } />
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => handleClick(5) } style={ styles.ImagePos }>
              <Image style={ styles.Image } source={ img[4] } />
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => handleClick(6) } style={ styles.ImagePos }>
              <Image style={ styles.Image } source={ img[5] } />
            </TouchableOpacity>
          </View>
  
          <View style={ styles.Row }>
            <TouchableOpacity onPress={ () => handleClick(7) } style={ styles.ImagePos }>
              <Image style={ styles.Image } source={ img[6] } />
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => handleClick(8) } style={ styles.ImagePos }>
              <Image style={ styles.Image } source={ img[7] } />
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => handleClick(9) } style={ styles.ImagePos }>
              <Image style={ styles.Image } source={ img[8] } />
            </TouchableOpacity>
          </View>
  
        </View>
  
      </View>
    </>
    ) ;
}

// Styles
const styles = StyleSheet.create({
  Main: 
  {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "relative",
    paddingTop: 15
  },
  Header: 
  {
    position: "relative",
    alignItems: "center",
    width: 400,
    marginBottom: 60
  },
  CardBlue: 
  {
    position: "absolute",
    top: 50,
    left: 0,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 100,
    backgroundColor: "rgba(30,35,140,1)",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(0,0,0,1)",
    width: 150,
    height: 50
  },
  TxtCard:
  {
    fontSize: 20,
    fontFamily: "Raleway",
    color: "rgba(245,245,245,1)",
    textAlign: "center",
    justifyContent: "center",
    width: 150,
    height: 30,
    textTransform: "uppercase"
  },
  CardRed:
  {
    position: "absolute",
    top: 50,
    right: 0,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 100,
    backgroundColor: "rgba(140,30,30,1)",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(0,0,0,1)",
    width: 150,
    height: 50
  },
  CircleBlue: 
  {
    position: "absolute",
    top: 55,
    backgroundColor: "rgba(30,35,140,1)",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(0,0,0,1)",
    width: 35,
    height: 35,
    borderRadius: 17.5
  },
  CircleRed: 
  {
    position: "absolute",
    top: 55,
    backgroundColor: "rgb(140,30,30)",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(0,0,0,1)",
    width: 35,
    height: 35,
    borderRadius: 17.5
  },
  CircleReload:
  {
    position: "absolute",
    top: 55,
    backgroundColor: "rgb(1,150,75)",
    borderWidth: 3,
    borderStyle: "solid",
    borderColor: "rgba(0,0,0,1)",
    width: 35,
    height: 35,
    borderRadius: 17.5
  },
  HeaderTxt:
  {
    fontFamily: "Raleway",
    fontSize: 30,
    color: "rgba(7,87,103,1)",
    textAlign: "center",
    justifyContent: "center",
    width: 300,
    height: 50,
    marginTop: 120,
    textTransform: "uppercase"
  },
  Board:
  {
    position: "relative",
    alignItems: "center",
    width: 300,
    height: 300,
    marginBottom: 60
  },
  Row:
  {
    position: "relative",
    flexDirection: "row",
    alignItems: "center"
  },
  ImagePos:
  {
    width: 100,
    height: 100
  },
  Image:
  {
    width: 100,
    height: 100
  },
  Footer:
  {
    backgroundColor: "rgba(7,87,103,1)",
    height: 50,
    width: 500,
    bottom: -80
  }
}) ;

// Export Offline
export default Offline ;