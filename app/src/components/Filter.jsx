import styles from "../styles/Filter.module.css";

const Filter = ({value, handleToggle}) => {

  return (
    <>
      <li className={styles.radioItem}>
        <input
          className={styles.inputItem}
          type="radio" 
          name="category"
          id={value.id} 
          value={value.name} 
          onChange={(e)=> handleToggle(e)}
          />
          <label className={styles.labelItem} htmlFor={value.id}
          >
            {value.name}</label>
      </li>
    </>
  )
}
export default Filter;