// import Grid from "./Grid.js"
// import Tile from "./Tile.js"
// import { setupMobile } from "./mobile.js";


// const gameBoard = document.getElementById("game-board")

// const grid = new Grid(gameBoard)
// grid.randomEmptyCell().tile = new Tile(gameBoard)
// grid.randomEmptyCell().tile = new Tile(gameBoard)
// setupInput()

// function setupInput() {
//   window.addEventListener("keydown", handleInput, { once: true })
//   setupMobile()
// }

// async function handleInput(e) {
//   switch (e.key) {
//     case "ArrowUp":
//       if (!canMoveUp()) {
//         setupInput()
//         return
//       }
//       await moveUp()
//       break
//     case "ArrowDown":
//       if (!canMoveDown()) {
//         setupInput()
//         return
//       }
//       await moveDown()
//       break
//     case "ArrowLeft":
//       if (!canMoveLeft()) {
//         setupInput()
//         return
//       }
//       await moveLeft()
//       break
//     case "ArrowRight":
//       if (!canMoveRight()) {
//         setupInput()
//         return
//       }
//       await moveRight()
//       break
//     default:
//       setupInput()
//       return
//   }

//   grid.cells.forEach(cell => cell.mergeTiles())

//   const newTile = new Tile(gameBoard)
//   grid.randomEmptyCell().tile = newTile

//   if (!canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight()) {
//     newTile.waitForTransition(true).then(() => {
//       alert("You lose")
//     })
//     return
//   }

//   setupInput()
// }

// function moveUp() {
//   return slideTiles(grid.cellsByColumn)
// }

// function moveDown() {
//   return slideTiles(grid.cellsByColumn.map(column => [...column].reverse()))
// }

// function moveLeft() {
//   return slideTiles(grid.cellsByRow)
// }

// function moveRight() {
//   return slideTiles(grid.cellsByRow.map(row => [...row].reverse()))
// }

// function slideTiles(cells) {
//   return Promise.all(
//     cells.flatMap(group => {
//       const promises = []
//       for (let i = 1; i < group.length; i++) {
//         const cell = group[i]
//         if (cell.tile == null) continue
//         let lastValidCell
//         for (let j = i - 1; j >= 0; j--) {
//           const moveToCell = group[j]
//           if (!moveToCell.canAccept(cell.tile)) break
//           lastValidCell = moveToCell
//         }

//         if (lastValidCell != null) {
//           promises.push(cell.tile.waitForTransition())
//           if (lastValidCell.tile != null) {
//             lastValidCell.mergeTile = cell.tile
//           } else {
//             lastValidCell.tile = cell.tile
//           }
//           cell.tile = null
//         }
//       }
//       return promises
//     })
//   )
// }

// function canMoveUp() {
//   return canMove(grid.cellsByColumn)
// }

// function canMoveDown() {
//   return canMove(grid.cellsByColumn.map(column => [...column].reverse()))
// }

// function canMoveLeft() {
//   return canMove(grid.cellsByRow)
// }

// function canMoveRight() {
//   return canMove(grid.cellsByRow.map(row => [...row].reverse()))
// }

// function canMove(cells) {
//   return cells.some(group => {
//     return group.some((cell, index) => {
//       if (index === 0) return false
//       if (cell.tile == null) return false
//       const moveToCell = group[index - 1]
//       return moveToCell.canAccept(cell.tile)
//     })
//   })
// }
// // Add this function to handle touch events


// script.js

import Grid from "./Grid.js";
import Tile from "./Tile.js";

const gameBoard = document.getElementById("game-board");

const grid = new Grid(gameBoard);
grid.randomEmptyCell().tile = new Tile(gameBoard);
grid.randomEmptyCell().tile = new Tile(gameBoard);
setupInput();

function setupInput() {
  window.addEventListener("keydown", handleInput, { once: true });

  let startX, startY;

  document.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  });

  document.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;

    const deltaX = endX - startX;
    const deltaY = endY - startY;

    const threshold = 50; // Adjust as needed

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      if (deltaX > threshold) {
        handleInput({ key: "ArrowRight" });
      } else if (deltaX < -threshold) {
        handleInput({ key: "ArrowLeft" });
      }
    } else {
      // Vertical swipe
      if (deltaY > threshold) {
        handleInput({ key: "ArrowDown" });
      } else if (deltaY < -threshold) {
        handleInput({ key: "ArrowUp" });
      }
    }
  });
}
 async function handleInput(e) {
    switch (e.key) {
      case "ArrowUp":
        if (!canMoveUp()) {
          setupInput()
          return
        }
        await moveUp()
        break
      case "ArrowDown":
        if (!canMoveDown()) {
          setupInput()
          return
        }
        await moveDown()
        break
      case "ArrowLeft":
        if (!canMoveLeft()) {
          setupInput()
          return
        }
        await moveLeft()
        break
      case "ArrowRight":
        if (!canMoveRight()) {
          setupInput()
          return
        }
        await moveRight()
        break
      default:
        setupInput()
        return
    }
  
    grid.cells.forEach(cell => cell.mergeTiles())
  
    const newTile = new Tile(gameBoard)
    grid.randomEmptyCell().tile = newTile
  
    if (!canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight()) {
      newTile.waitForTransition(true).then(() => {
        alert("You lose")
      })
      return
    }
  
    setupInput()
  }
  
  function moveUp() {
    return slideTiles(grid.cellsByColumn)
  }
  
  function moveDown() {
    return slideTiles(grid.cellsByColumn.map(column => [...column].reverse()))
  }
  
  function moveLeft() {
    return slideTiles(grid.cellsByRow)
  }
  
  function moveRight() {
    return slideTiles(grid.cellsByRow.map(row => [...row].reverse()))
  }
  
  function slideTiles(cells) {
    return Promise.all(
      cells.flatMap(group => {
        const promises = []
        for (let i = 1; i < group.length; i++) {
          const cell = group[i]
          if (cell.tile == null) continue
          let lastValidCell
          for (let j = i - 1; j >= 0; j--) {
            const moveToCell = group[j]
            if (!moveToCell.canAccept(cell.tile)) break
            lastValidCell = moveToCell
          }
  
          if (lastValidCell != null) {
            promises.push(cell.tile.waitForTransition())
            if (lastValidCell.tile != null) {
              lastValidCell.mergeTile = cell.tile
            } else {
              lastValidCell.tile = cell.tile
            }
            cell.tile = null
          }
        }
        return promises
      })
    )
  }
  
  function canMoveUp() {
    return canMove(grid.cellsByColumn)
  }
  
  function canMoveDown() {
    return canMove(grid.cellsByColumn.map(column => [...column].reverse()))
  }
  
  function canMoveLeft() {
    return canMove(grid.cellsByRow)
  }
  
  function canMoveRight() {
    return canMove(grid.cellsByRow.map(row => [...row].reverse()))
  }
  
  function canMove(cells) {
    return cells.some(group => {
      return group.some((cell, index) => {
        if (index === 0) return false
        if (cell.tile == null) return false
        const moveToCell = group[index - 1]
        return moveToCell.canAccept(cell.tile)
      })
    })
  }
  // Add this function to handle touch events
  