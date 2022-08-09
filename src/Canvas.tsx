import React, {useRef} from "react";

interface Props {
    value: number;
  }
  
  const Canvas = ({ value }: Props): JSX.Element => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);
    if(canvasRef.current){
      canvasCtxRef.current = canvasRef.current.getContext('2d');
      let ctx = canvasCtxRef.current;
      // clear the canvas, since React reuses the canvas component in dev
      ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); 
      
      // A stub drawing
      ctx?.fillRect(value,value,50,30); 
    }

    return <canvas ref={canvasRef}/>
}
export default Canvas