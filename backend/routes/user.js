import express from "express"
import { loginUser, userSignup } from "../controller/User.js"

const Router = express.Router()

Router.post("/signup", userSignup)
Router.post("/signin", loginUser)

export default Router; 