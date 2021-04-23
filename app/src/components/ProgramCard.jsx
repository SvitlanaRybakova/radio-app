import style from "../styles/ProgramCard.module.css"
const ProgramCard = ({ elem }) => {
  console.log(elem);
  return (
    <>
      <div className={style.scheduleWrapper}>
        <div className={style.header}>
          <div className={style.imgsWrapper}>
            <img style={{ width: "100%" }} src={elem.imageurl} alt={elem.title} />
          </div>
          <h2>{elem.title}</h2>
          <div className={style.dateWrapper}>
            <span>{new Date(parseInt(elem.starttimeutc.replace(/\/Date\((\d+)\)\//g, "$1"))).toLocaleString('en-GB', { timeZone: 'UTC' })}</span>
            <span>-</span>
            <span>{new Date(parseInt(elem.endtimeutc.replace(/\/Date\((\d+)\)\//g, "$1"))).toLocaleString('en-GB', { timeZone: 'UTC' })}</span>
          </div>
          <i className="far fa-star"></i>
        </div>
        <div className="">
          <p>{elem.title} <span>{elem.subtitle}</span></p>
          
          <p>{elem.description}</p>
        </div>
      </div>

    </>
  )
}
export default ProgramCard;