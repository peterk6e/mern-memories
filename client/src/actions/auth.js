import * as api from "../api"
import { AUTH } from "./../constants/actionTypes"

export const signIn = (formData, navigate) => async dispatch => {
  try {
    // const { data } = await api.createUser(FormData)
    // dispatch({ type: AUTH, payload: data })

    navigate("/")
  } catch (error) {
    console.log(error)
  }
}

export const signUp = (formData, navigate) => async dispatch => {
  try {
    // const { data } = await api.createUser(FormData)
    // dispatch({ type: AUTH, payload: data })

    navigate("/")
  } catch (error) {
    console.log(error)
  }
}
