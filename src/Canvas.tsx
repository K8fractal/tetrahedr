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
      ctx!.fillRect(value,value,10,30);
      /* Only updates when I change and save. Can get multiple boxes on Canvas. Why?? */
    }

    return <canvas ref={canvasRef}/>
}
export default Canvas