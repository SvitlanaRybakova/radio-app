import styles from "../styles/Filter.module.css";

const Filter = ({channelCategory,  filterOnChange}) => {

  return (
    <>
      <li className={styles.radioItem}>
        <input
          className={styles.inputItem}
          type="checkbox" id={channelCategory.id} value={channelCategory.name} 
          onChange={(e)=>filterOnChange(e)}
          />
          <label className={styles.labelItem} htmlFor={channelCategory.id}
          >
            {channelCategory.name}</label>
      </li>
    </>
  )
}
export default Filter;