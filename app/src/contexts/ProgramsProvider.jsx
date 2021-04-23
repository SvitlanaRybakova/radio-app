import { createContext } from "react";

export const ProgramsContext = createContext();

const ProgramsProvider = (props) => {

  

  // const getAllCategoriesName = async() => {
  //   let smt = await fetch("/api/v1/programs/categories/:categoryId")
  // }
  const values={

  }
  return(
    <ProgramsContext.Provider value={values}>
      {props.children}
    </ProgramsContext.Provider>
  )
}
export default ProgramsProvider;