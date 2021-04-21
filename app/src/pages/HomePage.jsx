import { useState, useContext, useEffect } from "react";
import { ChannelsContext } from "../contexts/ChannelsProvider";
import style from "../styles/HomePage.module.css";
import Spinner from "../components/Spinner";
import ListItemCard from "../components/ListItemCard";
import Filter from "../components/Filter";


const HomePage = (props) => {
  const [isChannels, setIsChannels] = useState(true);
  const [channelCategory, setChannelCategory] = useState([
    { id: 1, name: "All", isChecked: false },
    { id: 2, name: "Rikskanal", isChecked: false },
    { id: 3, name: "Lokal kanal", isChecked: false },
    { id: 4, name: "Minoritet och språk", isChecked: false },
    { id: 5, name: "Fler kanaler", isChecked: false },
    { id: 6, name: "Extrakanaler", isChecked: false },
  ])

  const { channels, setChannels } = useContext(ChannelsContext)


  useEffect(() => {
    renderChannels();
    console.log('channels', channels);
  }, [channels])


  const renderChannels = () => {
    if (channels) {
      return channels.map((channel) => (
        <ListItemCard key={channel.id} channelItem={channel} />
      ))
    }
    else {
      return <Spinner />
    }


  }

  const renderPrograms = () => {
    return (
      <h1>List of programs</h1>
    )
  }


  const filterOnChange = (e) => {
    const value = e.target.value;
    console.log(value);
    if (channels) {
      const result = channels.filter((channel) => {
        return (channel.channeltype === value)
      })
  
      setChannels(result)
    }
    else {
     
      return <Spinner />
    }
  }

    return (

      <div className={style.wrapper}>
        <div className={style.container}>
          <section className={style.list}>
            <div className={style.listBtn, style.active}
              onClick={() => setIsChannels(true)}>Kanaler
          </div>
            <div className={style.listBtn, style.active}
              onClick={() => setIsChannels(false)}
            >
              Program</div>
          </section>

          {/* filter */}
          <ul className={style.cboxtags}>
            {channelCategory.map(category => (
              <Filter key={category.id} channelCategory={category}
                setChannelCategory={setChannelCategory}
                filterOnChange={filterOnChange} />
            ))}
          </ul>
          {/* filter end */}
          
          <div className={style.listContent}>
            <div className={style.cardWrapper}>
              {isChannels ? renderChannels() :  renderChannels()}
            </div>
          </div>
        </div>

      </div>
    )
  }
  export default HomePage;