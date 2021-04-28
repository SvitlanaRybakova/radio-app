import { createContext, useState } from "react";


export const ProgramsContext = createContext();

const ProgramsProvider = (props) => {
  // const [programsByChannel, setProgramsByChannel] = useState(null);


  const [programCategories] = useState([
    { "id": 0, "name": "All" },
    { "id": 2, "name": "Barn 3 - 8 år" },
    { "id": 132, "name": "Barn 9 - 13 år" },
    { "id": 82, "name": "Dokumentär" },
    { "id": 134, "name": "Drama" },
    { "id": 135, "name": "Ekonomi" },
    { "id": 133, "name": "Humor" },
    { "id": 3, "name": "Kultur/Nöje" },
    { "id": 14, "name": "Livsstil" },
    { "id": 4, "name": "Livsåskådning" },
    { "id": 5, "name": "Musik" },
    { "id": 11, "name": "News in other languages" },
    { "id": 68, "name": "Nyheter" },
    { "id": 7, "name": "Samhälle" },
    { "id": 10, "name": "Sport" },
    { "id": 12, "name": "Vetenskap/Miljö" }
  ])


  const getAllPrograms = async () => {
    let response = await fetch("/api/v1/programs");
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }
    const programs = await response.json()
    return programs.programs;
  }

  const getProgramsByCategory = async (categoryId) => {
    let response = await fetch(`/api/v1/programs/programms-by-category/${categoryId}`)
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }

    let programs = await response.json();
    console.log(programs);
    return programs.programs;
  }


  const getProgById = async (programId) => {
    let response = await fetch(`/api/v1/programs/${programId}`);
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }

    let program = await response.json();

    return program.program
  }
  
  const values = {
    programCategories,
    getAllPrograms,
    getProgramsByCategory,
    getProgById,
  }
  return (
    <ProgramsContext.Provider value={values}>
      {props.children}
    </ProgramsContext.Provider>
  )
}
export default ProgramsProvider;