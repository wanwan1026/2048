import { useRef, useEffect, useState, useCallback } from "react";
import { useKeyboardInput } from '../hooks/useKeyboardInput';
import {moveLeft, moveRight, moveUp, moveDown} from '../logic/moveBoard';
import {addRandom} from '../logic/addRandom';
import {checkChange} from '../logic/checkChange';
import { whenover } from '../logic/whenover';

const cell_size = 100 // 寬高
const grid_size = 4 // 4*4
const padding = 10 //間距
const canvas_size = cell_size*grid_size+padding*(grid_size+1) //畫布大小

export default function game_canvas(){

    const canvasref = useRef<HTMLCanvasElement>(null); //目標畫布    

    const [board,setboard] = useState<number[][]>([
    [0,2,2,0],
    [0,0,4,0],
    [0,0,0,0],
    [0,0,0,0]
    ]);

    const [score, setScore] = useState(0);
    const [isOver, setIsOver] = useState(false);

    const handleKey = useCallback((key: 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight') => {
        let result;

        switch (key) {
        case 'ArrowLeft':
            result = moveLeft(board);
            break;
        case 'ArrowRight':
            result = moveRight(board);
            break;
        case 'ArrowUp':
            result = moveUp(board);
            break;
        case 'ArrowDown':
            result = moveDown(board);
            break;
        }
        
        console.log('before:', board);
        console.log('after:', result);

        if (result && checkChange(board, result.board)) {
            const withNewTile = addRandom(result.board);
            setboard(withNewTile);
            setScore(prev => prev + result.score); // 加上這次合併得分

            if (whenover(withNewTile)) {
            setIsOver(true);
        }
        }

        // if(checkChange(board,newBoard)){
        //     const withNew = addRandom(newBoard);
        //     setboard(withNew);            
        // }

    }, [board]);

    useKeyboardInput(handleKey);

    useEffect(() =>{
            // clear
            const canvas = canvasref.current!;
            const ctx = canvas.getContext('2d')!;
            ctx.clearRect(0,0,canvas.width,canvas.height);

            // draw new in 
            ctx.fillStyle = '#bbada0'
            ctx.fillRect(0,0,canvas.width,canvas.height)

            // draw 4*4
            for(let row = 0;row<grid_size;row++){
                for (let col = 0;col<grid_size;col++){
                    const x = padding + col*(cell_size+padding) // x
                    const y = padding + row*(cell_size+padding) // y

                    const value = board[row][col];
                    ctx.fillStyle = getTileColor(value)
                    ctx.fillRect(x,y,cell_size,cell_size)

                    if (value !== 0){
                        ctx.fillStyle = '#776e65';
                        ctx.font = 'bold 32px Arial';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillText(String(value),x+cell_size/2,y+cell_size/2);
                    }
                }
            }

        }    
    ,[board]);

    return(
        <div style={{ textAlign: 'center' }}>
            <h2>Score: {score}</h2>
            {isOver && (<h2 style={{ color: 'red', fontWeight: 'bold' }}>Game Over</h2>)}
            <canvas ref = {canvasref} width={canvas_size} height={canvas_size} style={{border: '2px solid #aaa', background: '#bbada0'}}/>
        </div>
    )
}

const getTileColor = (value: number) => {
  switch (value) {
    case 0: return '#cdc1b4';       
    case 2: return '#eee4da';       
    case 4: return '#ede0c8';       
    case 8: return '#f2b179';       
    case 16: return '#f59563';      
    case 32: return '#f67c5f';      
    case 64: return '#f65e3b';      
    case 128: return '#edcf72';     
    case 256: return '#edcc61';     
    case 512: return '#edc850';     
    case 1024: return '#edc53f';    
    case 2048: return '#edc22e';    
    default: return '#3c3a32';      
  }
};