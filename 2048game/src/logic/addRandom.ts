export function addRandom(board:number[][]): number[][]{

    const emptyCells:{row:number ;col:number}[]=[];

    for(let row = 0;row<board.length;row++){
        for(let col = 0;col<board[row].length;col++){
            if(board[row][col] === 0 ){
                emptyCells.push({row,col})
            }
        }
    }

    if(emptyCells.length === 0) return board;

    const{row,col} = emptyCells[Math.floor(Math.random()*emptyCells.length)];

    const newValue = Math.random() < 0.9 ? 2 : 4 ;

    const newBoard = board.map( r =>[...r])
    newBoard[row][col] = newValue;
    return newBoard


}