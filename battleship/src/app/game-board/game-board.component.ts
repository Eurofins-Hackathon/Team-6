import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {
  @Input() board: string[][] = [];
  @Input() boardSize: number = 7; // Default to 7x7 board
  @Input() isPlayerBoard: boolean = false;
  @Output() cellClick = new EventEmitter<{ row: number; col: number }>();
  @Output() shipDropped = new EventEmitter<{ row: number; col: number; ship: string }>();

  ngOnInit(): void {
    if (this.board.length === 0) {
      this.initializeBoard();
    }
  }

  initializeBoard(): void {
    this.board = Array.from({ length: this.boardSize }, () => Array(this.boardSize).fill(''));
  }

  handleCellClick(row: number, col: number): void {
    this.cellClick.emit({ row, col });
  }

  handleDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  handleDrop(event: DragEvent, row: number, col: number): void {
    event.preventDefault();
    const ship = event.dataTransfer?.getData('text');
    if (ship) {
      this.shipDropped.emit({ row, col, ship });
    }
  }
}
