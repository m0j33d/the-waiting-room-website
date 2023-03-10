import { db } from "../model/index.js"
import { hashPassword, validateUser } from "../../config/helper.js";
import  * as authenticate from "../middleware/authenticate.js";

const UserModel = db.users;

const createUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    const newUser = {
      first_name,
      last_name,
      email,
      password,
    };

    newUser.password = await hashPassword(newUser.password);
    await UserModel.create(newUser);

    return res.status(201).json({
      type: "success",
      message: "Registration successful",
    });
  } catch (error) {
    return res.status(500).json({
      type: "error",
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await validateUser(email, password);
    if (!user) {
      return res.status(401).json({
        type: "error",
        message: "Invalid crendentials!",
      });
    }

    const token = authenticate.getToken({ id: user.id });

    return res.status(200).json({
      type: "success",
      message: "Login successful",
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      type: "error",
      message: error.message,
    });
  }
};

export {
  createUser,
  loginUser,
};
