import { createContext, useEffect, useState } from "react";

export const ChannelsContext = createContext();

const ChannelsProvider = (props) => {

  const [ channels, setChannels ] = useState(null);

  
  useEffect(() => {
    getAllChannels();
  }, []);

  const getAllChannels = async () => {
    let channels = await fetch("/api/v1/channels");
    channels = await channels.json();
    await setChannels(channels.channels);
    await console.log(channels);
  }

  const values={
    channels,
    setChannels,
  }
  return (
    <ChannelsContext.Provider value={values}>
      {props.children}
    </ChannelsContext.Provider>
  )
}
export default ChannelsProvider;