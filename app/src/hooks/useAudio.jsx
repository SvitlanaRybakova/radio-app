import  { useState, useEffect } from "react";

// example of a custom hook that would be able to call functionality anywhere in the program 
const useAudio = url => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  useEffect(()=>{
    audio.src = url
  },[url])

  useEffect(() => {
      playing ? audio.play() : audio.pause();
    },
    [playing]
  );

  const toggle = () =>{
    setPlaying(!playing);
  }


  return {playing, toggle}
}
export default useAudio;