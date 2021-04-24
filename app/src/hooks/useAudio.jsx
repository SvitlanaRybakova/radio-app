import  { useState, useEffect } from "react";

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
    console.log('inside hook');
    setPlaying(!playing);
  }

  // useEffect(() => {
  //   audio.addEventListener('ended', () => setPlaying(false));
  //   return () => {
  //     audio.removeEventListener('ended', () => setPlaying(false));
  //   };
  // }, []);

  return {playing, toggle}
}
export default useAudio;