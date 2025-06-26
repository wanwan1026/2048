import { useRef,useEffect } from "react";

const cell_size = 100 // 寬高
const grid_size = 4 // 4*4
const padding = 10 //間距
const canvas_size = cell_size*grid_size+padding*(grid_size+1) //畫布大小

const board = [
    [0,2,0,0],
    [0,0,4,0],
    [0,0,0,0],
    [0,0,0,0]
]

export default function game_canvas(){

    const canvasref = useRef<HTMLCanvasElement>(null); //目標畫布

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
                    ctx.fillStyle = value === 0 ? '#cdc1b4':'#eee4da';
                    ctx.fillRect(x,y,cell_size,cell_size)

                    if (value !== 0){
                        ctx.fillStyle = '#776e65';
                        ctx.font = 'bold 32px AriaL';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillText(String(value),x+cell_size/2,y+cell_size/2);
                    }
                }
            }
        }    
    ,[]);

    return(
        <canvas ref = {canvasref} width={canvas_size} height={canvas_size} style={{border: '2px solid #aaa', background: '#bbada0'}}/>
    )
}