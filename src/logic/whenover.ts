export function whenover(board: number[][]): boolean {
  const size = board.length;

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (board[row][col] === 0) return false;
    }
   }

    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            const current = board[row][col];
            if (
                (row > 0 && board[row - 1][col] === current) || 
                (row < size - 1 && board[row + 1][col] === current) || 
                (col > 0 && board[row][col - 1] === current) || 
                (col < size - 1 && board[row][col + 1] === current) 
            ) { return false;}
    }
  }

  return true; 
}
