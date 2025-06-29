export function checkChange(oldbox:number[][],newbox:number[][]):boolean{
    for(let row =0;row<oldbox.length;row++){
        for(let col=0;col<oldbox.length;col++){
            if(oldbox[row][col] !== newbox[row][col]) return true
        }
    }
    return false
}