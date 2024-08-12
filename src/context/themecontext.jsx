import { createContext, useState } from "react";
 
export const ThemeContext = createContext();

export const ThemeProvider = ({children})=>{
  let [lightmode, setLightMode] = useState(localStorage.getItem("themeprefrence") ? JSON.parse(localStorage.getItem("themeprefrence")) : true) ;
  function SetLightMode (lightmode){
    setLightMode(lightmode)
  }
  return (
    <ThemeContext.Provider value={{lightmode, SetLightMode}}>
      {children}
    </ThemeContext.Provider>
  )
}