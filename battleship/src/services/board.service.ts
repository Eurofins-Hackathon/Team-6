import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  initializeBoard(size: number): string[][] {
    return Array.from({ length: size }, () => Array(size).fill(''));
  }

  updateCell(board: string[][], row: number, col: number, value: string): void {
    if (board[row][col] === '') {
      board[row][col] = value;
    }
  }

  validateShipPlacement(board: string[][], row: number, col: number, length: number, isHorizontal: boolean): boolean {
    for (let i = 0; i < length; i++) {
      const r = isHorizontal ? row : row + i;
      const c = isHorizontal ? col + i : col;
      if (r >= board.length || c >= board[0].length || board[r][c] !== '') {
        return false;
      }
    }
    return true;
  }

  placeShip(board: string[][], row: number, col: number, length: number, isHorizontal: boolean, shipSymbol: string): void {
    for (let i = 0; i < length; i++) {
      const r = isHorizontal ? row : row + i;
      const c = isHorizontal ? col + i : col;
      board[r][c] = shipSymbol;
    }
  }
}