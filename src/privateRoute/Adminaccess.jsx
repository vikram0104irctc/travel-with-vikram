import { Children, useContext, useEffect } from "react"
import { LoginContext } from "../context/loginContext"
import { useNavigate } from "react-router-dom"

export const PrivateRoute = (props)=>{
  let {login} = useContext(LoginContext)
  let {Component} = props
  let navigate = useNavigate()
  useEffect(()=>{
    if (!login){
      navigate("/login")
    }
  })
  return (
    <Component/>
  )
}