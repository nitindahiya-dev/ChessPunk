import { Chess } from 'chess.js';

// Simple material-based evaluation
function evaluateBoard(game: Chess): number {
  const pieceValues: { [key: string]: number } = {
    p: 1, n: 3, b: 3, r: 5, q: 9, k: 0,
  };
  let score = 0;
  const board = game.board();
  for (const row of board) {
    for (const square of row) {
      if (square) {
        const value = pieceValues[square.type.toLowerCase()];
        score += square.color === 'w' ? value : -value;
      }
    }
  }
  return score;
}

// Minimax with alpha-beta pruning
function minimax(
  game: Chess,
  depth: number,
  alpha: number,
  beta: number,
  isMaximizing: boolean
): number {
  if (depth === 0 || game.isGameOver()) {
    return evaluateBoard(game);
  }
  const moves = game.moves();
  if (isMaximizing) {
    let maxEval = -Infinity;
    for (const move of moves) {
      game.move(move);
      const evalScore = minimax(game, depth - 1, alpha, beta, false);
      game.undo();
      maxEval = Math.max(maxEval, evalScore);
      alpha = Math.max(alpha, evalScore);
      if (beta <= alpha) break;
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (const move of moves) {
      game.move(move);
      const evalScore = minimax(game, depth - 1, alpha, beta, true);
      game.undo();
      minEval = Math.min(minEval, evalScore);
      beta = Math.min(beta, evalScore);
      if (beta <= alpha) break;
    }
    return minEval;
  }
}

// Get AI move based on difficulty
export function getAIMove(game: Chess, difficulty: 'easy' | 'medium' | 'hard'): string {
  const depthMap = { easy: 1, medium: 3, hard: 5 };
  const depth = depthMap[difficulty];
  let bestMove = '';
  let bestValue = -Infinity;
  const moves = game.moves();
  for (const move of moves) {
    game.move(move);
    const boardValue = minimax(game, depth - 1, -Infinity, Infinity, false);
    game.undo();
    if (boardValue > bestValue) {
      bestValue = boardValue;
      bestMove = move;
    }
  }
  return bestMove;
}