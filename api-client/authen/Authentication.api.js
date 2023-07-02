import axiosClient from "../axiosClient";
import axios from "axios";

export const postSignIn = async ({username, password}) => {
  return await axiosClient.post(process.env.NEXT_PUBLIC_API_SIGN_IN, {
    username : username,
    password : password
  })
}

export const postSignOut = async () => {
  return await axiosClient.post(process.env.NEXT_PUBLIC_API_SIGN_OUT)
}

export const postOtpSignIn = async ({username, password, otp}) => {
  return await axiosClient.post(process.env.NEXT_PUBLIC_API_CONFIRM_OTP_LOGIN, {
    username : username,
    password : password,
    otp : otp
  })
}

