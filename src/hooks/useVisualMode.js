import {useState} from 'react'

export default function useVisualMode(initial) {
  
  const [history, setHistory] = useState([initial]);
  const [mode, setMode] = useState(initial);
  

  const transition = (mode, replace = false)=>{
    setMode(mode);
    setHistory(prev => {
      if(replace){
        const hold = [...prev]
        hold.pop()
        return [...hold, mode]
      }
      
      return [...prev,mode]
    })
  }

  const back = () => {
    setHistory(prev=>{
      if(prev.length>1){
        prev.pop()
        return prev;
      }
      return prev[0];
    })
    setMode(prev =>{
      const mode = history[history.length-1];
      return mode;
    })
  }

  return{mode, transition, back};
}
