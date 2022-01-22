// HTML DOM Elements
let error = document.getElementById("error") ;
let img1 = document.getElementById("img1") ;
let img2 = document.getElementById("img2") ;
let img3 = document.getElementById("img3") ;
let img4 = document.getElementById("img4") ;
let img5 = document.getElementById("img5") ;
let img6 = document.getElementById("img6") ;
let img7 = document.getElementById("img7") ;
let img8 = document.getElementById("img8") ;
let img9 = document.getElementById("img9") ;

// Variables
var gameOver = false ;
var count = 2 ;
const grid = ["", "", "", "", "", "", "", "", ""] ;

// Game Functions
function clicked(x)
{
  if (gameOver == false)
  {
    // Selected Image
    var img = document.getElementById("img" + x) ;

    // Player 1
    if (count % 2 == 0)
    {
      if (img.src == "http://localhost/Tic-Tac-Toe/assets/img/click_" + x + ".png")
      {
        img.src = "assets/img/tick_" + x + ".png" ;
        game("Tick", x) ;
        count++ ;
      }
      else
      {
        error.style.visibility = "visible" ;
        error.innerHTML = "Already Selected" ;
      }
    }
    // Player 2
    else if (count % 2 != 0)
    {
      if (img.src == "http://localhost/Tic-Tac-Toe/assets/img/click_" + x + ".png")
      {
        img.src = "assets/img/cross_" + x + ".png" ;
        game("Cross", x) ;
        count++ ;
      }
      else
      {
        error.style.visibility = "visible" ;
        error.innerHTML = "Already Selected" ;
      }
    }
  }
}

function game(choice, pos)
{
  // Add to Grid
  grid[pos - 1] = choice ;

  // Check Draw
  checkDraw() ;

  // Check Game Over
  // 1st Row
  if (grid[0] == choice && grid[1] == choice && grid[2] == choice)
  {
    gameOver = true ;
    error.style.visibility = "visible" ;
    error.innerHTML = choice + " Wins" ;
    img1.src = "assets/img/Won" + choice + "_1.png" ;
    img2.src = "assets/img/Won" + choice + "_2.png" ;
    img3.src = "assets/img/Won" + choice + "_3.png" ;
  }
  // 2nd Row
  if (grid[3] == choice && grid[4] == choice && grid[5] == choice)
  {
    gameOver = true ;
    error.style.visibility = "visible" ;
    error.innerHTML = choice + " Wins" ;
    img4.src = "assets/img/Won" + choice + "_4.png" ;
    img5.src = "assets/img/Won" + choice + "_5.png" ;
    img6.src = "assets/img/Won" + choice + "_6.png" ;
  }
  // 3rd Row
  if (grid[6] == choice && grid[7] == choice && grid[8] == choice)
  {
    gameOver = true ;
    error.style.visibility = "visible" ;
    error.innerHTML = choice + " Wins" ;
    img7.src = "assets/img/Won" + choice + "_7.png" ;
    img8.src = "assets/img/Won" + choice + "_8.png" ;
    img9.src = "assets/img/Won" + choice + "_9.png" ;
  }
  // 1st Column
  if (grid[0] == choice && grid[3] == choice && grid[6] == choice)
  {
    gameOver = true ;
    error.style.visibility = "visible" ;
    error.innerHTML = choice + " Wins" ;
    img1.src = "assets/img/Won" + choice + "_1.png" ;
    img4.src = "assets/img/Won" + choice + "_4.png" ;
    img7.src = "assets/img/Won" + choice + "_7.png" ;
  }
  // 2nd Column
  if (grid[1] == choice && grid[4] == choice && grid[7] == choice)
  {
    gameOver = true ;
    error.style.visibility = "visible" ;
    error.innerHTML = choice + " Wins" ;
    img2.src = "assets/img/Won" + choice + "_2.png" ;
    img5.src = "assets/img/Won" + choice + "_5.png" ;
    img8.src = "assets/img/Won" + choice + "_8.png" ;
  }
  // 3rd Column
  if (grid[2] == choice && grid[5] == choice && grid[8] == choice)
  {
    gameOver = true ;
    error.style.visibility = "visible" ;
    error.innerHTML = choice + " Wins" ;
    img3.src = "assets/img/Won" + choice + "_3.png" ;
    img6.src = "assets/img/Won" + choice + "_6.png" ;
    img9.src = "assets/img/Won" + choice + "_9.png" ;
  }
  // Left-To-Right Diagonal
  if (grid[6] == choice && grid[4] == choice && grid[2] == choice)
  {
    gameOver = true ;
    error.style.visibility = "visible" ;
    error.innerHTML = choice + " Wins" ;
    img7.src = "assets/img/Won" + choice + "_7.png" ;
    img5.src = "assets/img/Won" + choice + "_5.png" ;
    img3.src = "assets/img/Won" + choice + "_3.png" ;
  }
  // Right-To-Left Diagonal
  if (grid[0] == choice && grid[4] == choice && grid[8] == choice)
  {
    gameOver = true ;
    error.style.visibility = "visible" ;
    error.innerHTML = choice + " Wins" ;
    img1.src = "assets/img/Won" + choice + "_1.png" ;
    img5.src = "assets/img/Won" + choice + "_5.png" ;
    img9.src = "assets/img/Won" + choice + "_9.png" ;
  }
}

function checkDraw()
{
  var allClicked = true ;
  for (var i = 0; i < 9; i++)
  {
    if (grid[i] == "")
    {
      allClicked = false ;
    }
  }

  if (allClicked == true)
  {
    gameOver = true ;
    error.style.visibility = "visible" ;
    error.innerHTML = "Match Draw" ;
  }
}