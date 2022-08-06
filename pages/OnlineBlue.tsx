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

// Online Blue
function OnlineBlue({ navigation, route }: any): JSX.Element
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
  const [message, setMes] = useState<string>("") ;

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
    setMes("") ;

    setGame(snapshot.game) ;
    setSlots((): string[] => [...snapshot.slots]) ;

    // Check Game
    checkGame() ;

    setTurn(snapshot.turn) ;
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
      if (snapshot.turn)
      {
        let index: number = x - 1 ;

        if (slots[index] === ("emp" + x))
        {
          // Change Slots
          slots[index] = ("cir" + x) ;
          snapshot.slots[index] = ("cir" + x) ; 

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

    // Check Tie
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
  }

  // Reset
  async function reset(): Promise<void>
  {
    // Reset Frontend
    setSnapshot(snapshotObj) ;
    setGame(true) ;
    setTurn(true) ;
    setSlots(slotsObj) ;
    setMes("") ;

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
              <Image style={ styles.Image } source={ Images[slots[0]] } />
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => handleClick(2) } style={ styles.ImagePos }>
              <Image style={ styles.Image } source={ Images[slots[1]] } />
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => handleClick(3) } style={ styles.ImagePos }>
              <Image style={ styles.Image } source={ Images[slots[2]] } />
            </TouchableOpacity>
          </View>
  
          <View style={ styles.Row }>
            <TouchableOpacity onPress={ () => handleClick(4) } style={ styles.ImagePos }>
              <Image style={ styles.Image } source={ Images[slots[3]] } />
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => handleClick(5) } style={ styles.ImagePos }>
              <Image style={ styles.Image } source={ Images[slots[4]] } />
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => handleClick(6) } style={ styles.ImagePos }>
              <Image style={ styles.Image } source={ Images[slots[5]] } />
            </TouchableOpacity>
          </View>
  
          <View style={ styles.Row }>
            <TouchableOpacity onPress={ () => handleClick(7) } style={ styles.ImagePos }>
              <Image style={ styles.Image } source={ Images[slots[6]] } />
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => handleClick(8) } style={ styles.ImagePos }>
              <Image style={ styles.Image } source={ Images[slots[7]] } />
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => handleClick(9) } style={ styles.ImagePos }>
              <Image style={ styles.Image } source={ Images[slots[8]] } />
            </TouchableOpacity>
          </View>
  
        </View>
  
        <View style={ styles.Key }>
          <Text style={ styles.Txt1 }> ROOM KEY </Text>
          <Text style={ styles.Txt2 }> { serverKey } </Text>
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
  Key:
  {
    position: "relative",
    alignItems: "center"
  },
  Txt1:
  {
    fontFamily: "Raleway",
    fontSize: 17,
    color: "rgba(7,87,103,1)",
    textAlign: "center",
    justifyContent: "center",
    textTransform: "uppercase"
  },
  Txt2:
  {
    fontFamily: "Raleway",
    fontSize: 15,
    color: "rgba(7,87,103,1)",
    textAlign: "center",
    justifyContent: "center",
    textTransform: "uppercase"
  },
  Footer:
  {
    backgroundColor: "rgba(7,87,103,1)",
    height: 50,
    width: 500,
    bottom: -35
  }
}) ;

// Export Online Blue
export default OnlineBlue ;