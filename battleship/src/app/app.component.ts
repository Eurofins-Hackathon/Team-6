import { Component, OnInit } from '@angular/core';
import { BoardService } from '../services/board.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'battleship';
  playerBoard: string[][] = [];
  opponentBoard: string[][] = [];
  boardSize: number = 7; // Set default board size to 7x7
  ships = [
    { name: 'Destroyer', length: 2, symbol: 'D' },
    { name: 'Submarine', length: 3, symbol: 'S' },
    { name: 'Battleship', length: 4, symbol: 'B' }
  ];
  isPlayerTurn: boolean = true; // Track whose turn it is
  isGameOver: boolean = false;
  isPlayerVsPlayer: boolean = false; // Track if the game is player vs player

  constructor(private boardService: BoardService) {}

  ngOnInit(): void {
    this.resetGame();
  }

  initializeBoard(): string[][] {
    return this.boardService.initializeBoard(this.boardSize);
  }

  resetGame(): void {
    this.playerBoard = this.initializeBoard();
    this.opponentBoard = this.initializeBoard();
    this.isPlayerTurn = true;
    this.isGameOver = false;
  }

  startGame(isPlayerVsPlayer: boolean): void {
    this.isPlayerVsPlayer = isPlayerVsPlayer;
    console.log(`Game started! Mode: ${isPlayerVsPlayer ? 'Player vs Player' : 'Player vs AI'}`);

    // Populate opponent's board with ships for Player vs AI mode
    if (!isPlayerVsPlayer) {
      this.ships.forEach(ship => {
        let placed = false;
        while (!placed) {
          const row = Math.floor(Math.random() * this.boardSize);
          const col = Math.floor(Math.random() * this.boardSize);
          const isHorizontal = Math.random() > 0.5;

          if (this.boardService.validateShipPlacement(this.opponentBoard, row, col, ship.length, isHorizontal)) {
            this.boardService.placeShip(this.opponentBoard, row, col, ship.length, isHorizontal, ship.symbol);
            placed = true;
          }
        }
      });
    }
  }

  onPlayerCellClick(event: { row: number; col: number }): void {
    if (!this.isPlayerTurn || this.isGameOver) return;

    if (this.opponentBoard[event.row][event.col] === '') {
      this.opponentBoard[event.row][event.col] = 'X';
      console.log(`Player attacked cell: (${event.row}, ${event.col})`);
      this.checkGameOver();
      this.isPlayerTurn = this.isPlayerVsPlayer ? !this.isPlayerTurn : false;

      if (!this.isPlayerVsPlayer) {
        this.aiTurn();
      }
    }
  }

  onOpponentCellClick(event: { row: number; col: number }): void {
    if (this.isPlayerVsPlayer && !this.isPlayerTurn && !this.isGameOver) {
      if (this.playerBoard[event.row][event.col] === '') {
        this.playerBoard[event.row][event.col] = 'X';
        console.log(`Opponent attacked cell: (${event.row}, ${event.col})`);
        this.checkGameOver();
        this.isPlayerTurn = true;
      }
    }
  }

  onShipDropped(event: { row: number; col: number; ship: string }): void {
    if (this.isGameOver) return;

    const ship = this.ships.find(s => s.name === event.ship);
    if (ship) {
      const isHorizontal = true; // Default to horizontal placement for now
      const board = this.isPlayerTurn ? this.playerBoard : this.opponentBoard;
      if (this.boardService.validateShipPlacement(board, event.row, event.col, ship.length, isHorizontal)) {
        this.boardService.placeShip(board, event.row, event.col, ship.length, isHorizontal, ship.symbol);
        console.log(`${ship.name} placed at (${event.row}, ${event.col})`);
      } else {
        console.error('Invalid ship placement');
      }
    }
  }

  onDragStart(event: DragEvent, shipName: string): void {
    event.dataTransfer?.setData('text', shipName);
    console.log(`Dragging ship: ${shipName}`);
  }

  aiTurn(): void {
    if (this.isGameOver) return;

    // Basic AI logic: randomly attack a cell on the player's board
    let attempts = 0;
    const maxAttempts = this.boardSize * this.boardSize;
    let row: number, col: number;

    do {
      row = Math.floor(Math.random() * this.boardSize);
      col = Math.floor(Math.random() * this.boardSize);
      attempts++;
    } while (this.playerBoard[row][col] !== '' && attempts < maxAttempts);

    if (this.playerBoard[row][col] === '') {
      this.playerBoard[row][col] = 'X';
      console.log(`AI attacked cell: (${row}, ${col})`);
      this.checkGameOver();
    } else {
      console.log('AI could not find a valid cell to attack.');
    }

    this.isPlayerTurn = true;
  }

  checkGameOver(): void {
    // Check if all ships are hit on either board
    const playerLost = this.playerBoard.flat().every((cell: string) => cell === '' || cell === 'X');
    const opponentLost = this.opponentBoard.flat().every((cell: string) => cell === '' || cell === 'X');

    if (playerLost || opponentLost) {
      this.isGameOver = true;
      console.log(playerLost ? 'Opponent wins!' : 'Player wins!');
    }
  }
}
