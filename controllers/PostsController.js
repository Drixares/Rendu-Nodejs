import { client } from "../config/prisma.js";

class PostsController {

  async index(req, res) {
    try {
      const posts = await client.post.findMany();

      return res.status(200).json(posts);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async store(req, res) {
    const body = req.body;

    try {
      const post = await client.post.create({
        data: body
      })
      return res.status(201).json({ message: "Post created !", post})
    } catch (error) {
      return res.status(500).json({message: error.message });
    }
  }

  async show(req, res) {
    const id = parseInt(req.params.id);

    try {
      const post = await client.post.findUnique({
        where: {
          id: id,
        }
      });

      return res.status(200).json(post)
    } catch (error) {
      return res.status(500).json({message: error.message})
    }
  }

  async update(req, res) {
    const id = parseInt(req.params.id);
    const body = req.body;

    try {
      const post = await client.post.update({
        where: {
          id: id
        }, 
        data: body
      })

      return res.status(201).json({message: "Post updated !", post})
    } catch (error) {
      return res.status(500).json({message: error.message })
    }
  }

  async destroy(req, res) {
    const id = parseInt(req.params.id);
    
    try {
      const post = await client.post.findUnique({
        where: {
          id: id,
        }
      })

      if (!post) {
        return res.status(404).json({message: "Post not found."})
      }

      await client.post.delete({
        where: {
          id: id
        }
      })

      return res.status(200).json({message: "Post deleted."})
    } catch (error) {
      return res.status(500).json({message: error.message})
    }
  }
}

// module.exports = new PostsController();
export default new PostsController();
