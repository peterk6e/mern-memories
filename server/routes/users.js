import express from "express";
import { signIn } from "../../client/src/actions/auth.js";
import { signin, signup } from "../controllers/user.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);

export default router;