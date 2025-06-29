function slide(row: number[]): {newRow:number[];finalscore:number} {
  const filtered = row.filter(n => n !== 0);
  const merged: number[] = [];
  let score = 0;
  let skip = false;

  for(let i=0;i<filtered.length;i++){

    if(skip){skip = false;continue;}

    if(filtered[i] === filtered[i+1]){
      const mixValue = filtered[i]*2; 
      merged.push(mixValue);
      score += mixValue;
      skip = true;
    }else{
      merged.push(filtered[i])
    }

  }

  while (merged.length<row.length){
    merged.push(0);
  }

  return {newRow:merged,finalscore:score};

  // let i = 0;
  // while (i < filtered.length) {
  //   if (filtered[i] === filtered[i + 1]) {
  //     merged.push(filtered[i] * 2);
  //     i += 2; // 跳過合併過的
  //   } else {
  //     merged.push(filtered[i]);
  //     i += 1;
  //   }
  // }

  // while (merged.length < row.length) {
  //   merged.push(0);
  // }

  // return merged;
}

// left
export function moveLeft(board: number[][]) {

  let score = 0;
  const newBoard = board.map(row =>{
    const {newRow,finalscore} = slide(row);
    score += finalscore
    return newRow;
  })
  return{board:newBoard,score};

  // return board.map(row => slide(row));
}

// right
export function moveRight(board: number[][]) {
  let score = 0;
  const newBoard = board.map(row=>{
    const reversed = [...row].reverse();
    const {newRow,finalscore} = slide(reversed);
    score += finalscore
    return newRow.reverse();
  })

  return{board:newBoard,score}; 
  // return board.map(row => slide([...row].reverse()).reverse());
}

// up
export function moveUp(board: number[][]) {
  let score = 0;
  const transposed = transpose(board);
  const newone = transposed.map(row =>{
    const {newRow,finalscore} = slide(row);
    score += finalscore
    return newRow
  })

  return {board:transpose(newone),score}; 

  // const moved = transposed.map(row => slide(row));
  // return transpose(moved);
}

// down
export function moveDown(board: number[][]) {
  let score = 0;
  const transposed = transpose(board);
  const newone = transposed.map(row=>{
    const reversed = [...row].reverse();
    const {newRow,finalscore} = slide(reversed);
    score += finalscore
    return newRow.reverse()
  })
  // const moved = transposed.map(row => slide([...row].reverse()).reverse());
  return {board:transpose(newone),score};
}


function transpose(matrix: number[][]) {
  return matrix[0].map((_, i) => matrix.map(row => row[i]));
}