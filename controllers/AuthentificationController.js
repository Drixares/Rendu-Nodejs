import vine, { errors } from '@vinejs/vine';
import { client } from "../config/prisma.js";
import { comparePassword } from "../utils/bcrypt.js";
import generateAccessToken from "../utils/jwt.js";
import { loginValidator } from "../validators/userValidator.js";

class AuthentificationController {

  async login(req, res) {
    try {
      const body = req.body;

      const output = await vine.validate({
        schema: loginValidator,
        data: body
      })

      const user = await client.user.findUnique({
        where: {
          email: body.email,
        }
      })

      if (!user) return res.status(404).json({ message: "User not found" })
      
      const match = await comparePassword(body.password, user.password)
      if (!match) return res.status(403).json({ message: "Invalid credentials" })
      
      const token = generateAccessToken(body.email)
      return res.status(200).json({ message: "Connected !", token })

    } catch (error) {

      if (error instanceof errors.E_VALIDATION_ERROR) {
        return res.status(500).json({ message: error.messages[0].message })
      }

      return res.status(500).json({ message: error.message })
    }
  }

  async getProfile(req, res) {

    try {
      const user = await client.user.findUnique({
        where: {
          email: req.user.data,
        }
      })

      return res.status(200).json({
        name: user.name,
        email: user.email,
      })

    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  async logout(req, res) {
    return res.status(200).json({ message: "Disconnected !" })
  }

}

export default new AuthentificationController();