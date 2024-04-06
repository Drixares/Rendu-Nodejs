import vine, { errors } from '@vinejs/vine';
import { client } from '../config/prisma.js';
import { hashPassword } from '../utils/bcrypt.js';
import { storeUserValidator } from '../validators/userValidator.js';

class UsersController {

    // GET /users
    async index (req, res) {
      try {
        const users = await client.user.findMany();
        return res.status(200).json(users);

      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    }

    // POST /users
    async store(req, res) {
      const body = req.body;
      
      try {

        const output = await vine.validate({
          schema: storeUserValidator,
          data: body
        });

        const user = await client.user.create({
          data: {
            name: body.name,
            email: body.email,
            password: await hashPassword(body.password)
          }
        });

        return res.status(201).json({
          message: "User created successfully !",
          user: {
            name: user.name,
            email: user.email
          } 
        });
        
      } catch (error) {
        
        if (error instanceof errors.E_VALIDATION_ERROR) {
          // array created by SimpleErrorReporter
          console.log(error.messages[0].message)
          return res.status(500).json({ message: error.messages[0].message });
        }

        return res.status(500).json({ message: error.message });
      }
    }

    // GET /users/:id
    async show(req, res) {
      const id = parseInt(req.params.id);

      try {
        const user = await client.user.findUnique({
          where: {
            id: id
          }
        });

        if (!user) return res.status(404).json({ message: 'User not found' })

        return res.status(200).json(user);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    }

    // PUT /users/:id
    async update(req, res) {
      const id  = parseInt(req.params.id);
      const body = req.body

      const output = await vine.validate({
        schema: storeUserValidator,
        data: body
      })

      try {

        const user = client.user.findUnique({
          where: {
            id: id,
          }
        })

        if (!user) return res.status(404).json({ message: 'User not found' })

        const userUpdate = await client.user.update({
          where: {
            id: id
          }, data: {
            name: body.name,
            email: body.email
          }
        })
      
        return res.status(200).json('User updated');

      } catch (error) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
          return res.status(500).json({ message: error.messages[0].message })
        }

        return res.status(500).json({ message: error.message });
      }
    } 

    // DELETE /users/:id
    async destroy(req, res) {
      const id = parseInt(req.params.id);

      try {

        const user = await client.user.findUnique({
          where: {
            id: id,
          }
        })

        if (!user) {
          return res.status(404).json({message: "User not found !"})
        }

        await client.user.delete({
          where: {
            id: id
          }
        });

        return res.status(200).json('User deleted');
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    }
}

export default new UsersController();
// module.exports = new UsersController();