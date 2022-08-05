import { useState, useEffect } from "react" ;
import { StyleSheet, Image, Text, View, TouchableOpacity } from "react-native" ;
import { setDoc, doc, onSnapshot, DocumentReference, DocumentData, DocumentSnapshot, Unsubscribe } from "firebase/firestore" ;
// ...
import Images from "../components/Images" ;
import db from "../components/firebaseProvider" ;

// Snapshot Interface
interface Snapshot
{
  game: boolean
  turn: boolean
  slots: string[]
} ;

// Online Red
function OnlineRed({ navigation, route }: any): JSX.Element
{
  // Variables
  const slotsObj: string[] = ["emp1", "emp2", "emp3", "emp4", "emp5", "emp6", "emp7", "emp8", "emp9"] ;
  const snapshotObj: Snapshot = { game: true, turn: true, slots: slotsObj } ;
  const serverKey: string = route.params.serverKey ;
  const ref: DocumentReference<DocumentData> = doc(db, `server/${ serverKey }`) ;
  // ...
  const [snapshot, setSnapshot] = useState<Snapshot>(snapshotObj) ;
  const [game, setGame] = useState<boolean>(true) ;
  const [turn, setTurn] = useState<boolean>(true) ;
  const [slots, setSlots] = useState<string[]>(slotsObj) ;
  const [message, setMes] = useState<string>(`Room Key: ${ serverKey }`) ;

  // Read Snapshot
  useEffect(() =>
  {
    const unsub: Unsubscribe = onSnapshot(ref, (doc: DocumentSnapshot<DocumentData>) =>
    {
      try
      {
        const source: string = doc.metadata.hasPendingWrites ? "Local" : "Server" ;

        if (source === "Server")
        {
          setSnapshot({ game: doc.data()!.game, turn: doc.data()!.turn, slots: doc.data()!.slots }) ;
        }
      }
      catch (err: any)
      {
        setMes("Server Error!") ;
        setTimeout(() => navigation.navigate("Menu"), 1500) ;
      }
    }) ;

    return () => unsub() ;
  }, []) ;

  // Update State
  useEffect(() =>
  {
    setGame(snapshot.game) ;
    setTurn(snapshot.turn) ;
    setSlots((): string[] => [...snapshot.slots]) ;

    // Check Game
    checkGame() ;
  }, [snapshot]) ;

  // Update Database
  async function update(): Promise<void>
  {
    try
    {
      await setDoc(ref, { game: snapshot.game, turn: snapshot.turn, slots: snapshot.slots }) ;
    }
    catch (err: any)
    {
      setMes("Server Error!") ;
      setTimeout(() => navigation.navigate("Menu"), 1500) ;
    }
  }

  // Handle Click
  function handleClick(x: number): void
  {
    if (snapshot.game)
    {
      if (!snapshot.turn)
      {
        let index: number = x - 1 ;

        if (slots[index] === ("emp" + x))
        {
          // Change Slots
          slots[index] = ("crs" + x) ;
          snapshot.slots[index] = ("crs" + x) ; 

          // Change Turn
          setTurn(!turn) ;
          snapshot.turn = !snapshot.turn ;

          // Check Game
          checkGame() ;

          // Call Update
          update() ;
        }
      }
    }
  }

  // Check Game
  function checkGame(): void
  {
    // Set Player
    let player: string = turn ? "cir" : "crs" ;
    let gameContinue: boolean = true ;

    // Tie
    let tie: boolean = true ;

    for (let i: number = 0; i < 9; i++)
    {
      if (snapshot.slots[i] === (`emp${ i + 1 }`))
      {
        tie = false ;
      }
    }

    if (tie)
    {
      setMes("MATCH TIE!") ;

      setGame(false) ;
      snapshot.game = false ;
    }

    // Check Win
    function checkWin(a: number, b: number, c: number): void
    {
      if ((snapshot.slots[a] === (player + (a + 1))) && (snapshot.slots[b] === (player + (b + 1))) &&
      (snapshot.slots[c] === (player + (c + 1))))
      {
        slots[a] = (player + "W" + (a + 1)) ;
        slots[b] = (player + "W" + (b + 1)) ;
        slots[c] = (player + "W" + (c + 1)) ;

        snapshot.slots[a] = (player + "W" + (a + 1)) ;
        snapshot.slots[b] = (player + "W" + (b + 1)) ;
        snapshot.slots[c] = (player + "W" + (c + 1)) ;

        gameContinue = false ;
      }
    }

    // Rows
    checkWin(0, 1, 2) ;
    checkWin(3, 4, 5) ;
    checkWin(6, 7, 8) ;

    // Columns
    checkWin(0, 3, 6) ;
    checkWin(1, 4, 7) ;
    checkWin(2, 5, 8) ;

    // Diagonals
    checkWin(0, 4, 8) ;
    checkWin(2, 4, 6) ;

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

      setGame(false) ;
      snapshot.game = false ;
    }
  }

  // Reset
  async function reset(): Promise<void>
  {
    // Reset Frontend
    setSnapshot(snapshotObj) ;
    setGame(true) ;
    setTurn(true) ;
    setSlots(slotsObj) ;
    setMes(`Room Key: ${ serverKey }`) ;

    // Reset Backend
    try
    {
      await setDoc(ref, { game: true, turn: true, slots: slotsObj }) ;
    }
    catch (err: any)
    {
      setMes("Server Error!") ;
      setTimeout(() => navigation.navigate("Menu"), 1500) ;
    }
  }

  return (
  <>
    <View style={ styles.Offline }>

      <View style={ styles.Group }>
        
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

        <Text style={ styles.TxtHeader }> { message } </Text>
      </View>

      <View style={ styles.Board }>

        <TouchableOpacity onPress={ () => handleClick(1) } style={ styles.Image1 }>
          <Image style={ styles.Image } source={ Images[slots[0]] } />
        </TouchableOpacity>
        <TouchableOpacity onPress={ () => handleClick(2) } style={ styles.Image2 }>
          <Image style={ styles.Image } source={ Images[slots[1]] } />
        </TouchableOpacity>
        <TouchableOpacity onPress={ () => handleClick(3) } style={ styles.Image3 }>
          <Image style={ styles.Image } source={ Images[slots[2]] } />
        </TouchableOpacity>

        <TouchableOpacity onPress={ () => handleClick(4) } style={ styles.Image4 }>
          <Image style={ styles.Image } source={ Images[slots[3]] } />
        </TouchableOpacity>
        <TouchableOpacity onPress={ () => handleClick(5) } style={ styles.Image5 }>
          <Image style={ styles.Image } source={ Images[slots[4]] } />
        </TouchableOpacity>
        <TouchableOpacity onPress={ () => handleClick(6) } style={ styles.Image6 }>
          <Image style={ styles.Image } source={ Images[slots[5]] } />
        </TouchableOpacity>

        <TouchableOpacity onPress={ () => handleClick(7) } style={ styles.Image7 }>
          <Image style={ styles.Image } source={ Images[slots[6]] } />
        </TouchableOpacity>
        <TouchableOpacity onPress={ () => handleClick(8) } style={ styles.Image8 }>
          <Image style={ styles.Image } source={ Images[slots[7]] } />
        </TouchableOpacity>
        <TouchableOpacity onPress={ () => handleClick(9) } style={ styles.Image9 }>
          <Image style={ styles.Image } source={ Images[slots[8]] } />
        </TouchableOpacity>

      </View>

      <View style={ styles.Card1 }>
        <Text style={ styles.TxtCard }> BLUE </Text>
      </View>

      <View style={ styles.Card2 }>
        <Text style={ styles.TxtCard }> RED </Text>
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
    backgroundColor: "rgba(245,245,245,1)"
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
    right: 30,
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
    right: 30,
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
    right: 30,
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
    right: 30,
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
    right: -20,
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
    right: 230,
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
    right: 0,
    backgroundColor: "rgba(7,87,103,1)"
  }
}) ;

// Export Online Red
export default OnlineRed ;