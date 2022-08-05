import * as api from "../api"
import { AUTH } from "./../constants/actionTypes"
import { toast } from "react-hot-toast";

export const signIn = (formData, navigate) => async dispatch => {
  try {
    const { data } = await api.signIn(formData)
    dispatch({ type: AUTH, data })

    toast(
      "😊 Welcome Back!\n\n Share your best memories with your friends and family 🚀",
      {
        duration: 6000,
        style: { 
          padding: '16px',
          fontSize: '20px',
          color: '#3f51b5'
        },
      }
    );

    navigate("/")
  } catch (error) {
    console.log(error)
  }
}

export const signUp = (formData, navigate) => async dispatch => {
  try {
    const { data } = await api.signUp(formData)
    dispatch({ type: AUTH, data })

    toast(
      "You have just signed up! 😊 WELCOME!\n\n You can now share your best memories with your friends and family,\n\n ENJOY 🚀",
      {
        duration: 6000,
        style: { 
          padding: '16px',
          fontSize: '20px',
          color: '#3f51b5'
        },
      }
    );

    navigate("/")
  } catch (error) {
    console.log(error)
  }
}
