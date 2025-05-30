# Battleship Game

This is a web-based implementation of the classic Battleship game built using Angular. The game supports two modes:
- **Player vs AI**: Play against a basic AI opponent.
- **Player vs Player**: Two players take turns attacking each other's boards.

## Features
- Drag-and-drop ship placement.
- Turn-based gameplay.
- Visual feedback for hits, misses, and sunken ships.
- Dynamic board size (default is 7x7).

## How to Play

### Game Modes
1. **Player vs AI**:
   - You play against a basic AI opponent.
2. **Player vs Player**:
   - Two players take turns attacking each other's boards.

### Steps to Play
1. **Start the Game**:
   - Choose the game mode by clicking:
     - **"Start Player vs Player"** for Player vs Player mode.
     - **"Start Player vs AI"** for Player vs AI mode.

2. **Place Your Ships**:
   - Drag and drop ships from the ship container onto your board (Player's Board).
   - Ships must be placed before starting the game.

3. **Take Turns**:
   - **Player's Turn**:
     - Click on a cell in the opponent's board to attack.
     - Hits, misses, and sunken ships are visually represented:
       - **Red**: Hit
       - **Light Blue**: Miss
       - **Dark Red**: Sunken ship
   - **AI's Turn (Player vs AI)**:
     - The AI will automatically attack a random cell on your board.
   - **Opponent's Turn (Player vs Player)**:
     - The second player clicks on a cell in the first player's board to attack.

4. **Winning the Game**:
   - The game ends when all ships on one board are hit.
   - A message will display the winner:
     - **"Player wins!"** if the opponent's ships are all hit.
     - **"Opponent wins!"** if the player's ships are all hit.

5. **Reset the Game**:
   - Click the **"Reset Game"** button to clear the boards and start over.

## Development

### Prerequisites
- Node.js (v14 or later)
- Angular CLI

### Setup
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd battleship
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   Navigate to `http://localhost:4200/` in your browser.

### Running Tests
- **Unit Tests**:
  ```bash
  npm test
  ```
- **End-to-End Tests**:
  ```bash
  npm run e2e
  ```

## File Structure
- `src/app/`: Contains the main application code.
  - `game-board/`: Component for rendering the game board.
  - `services/board.service.ts`: Logic for board initialization and ship placement.
- `e2e/`: End-to-end test files.
- `assets/`: Static assets.
- `environments/`: Environment-specific configurations.

## Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.

## License
This project is licensed under the MIT License.
#   t e a m - 6 1  
 #   T e a m - 6  
 