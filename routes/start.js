import express from 'express';
import AuthentificationController from '../controllers/AuthentificationController.js';
import PostsController from '../controllers/PostsController.js';
import UsersController from '../controllers/UsersController.js';
import { authentificateToken } from '../middlewares/Auth.js';

const router = express.Router();

router.get('/users', UsersController.index)
router.post('/users', UsersController.store)
router.get('/users/:id', UsersController.show)
router.put('/users/:id', UsersController.update)
router.delete('/users/:id', UsersController.destroy)

router.get('/posts', PostsController.index)
router.post('/posts', PostsController.store)
router.get('/posts/:id', PostsController.show)
router.put('/posts/:id', PostsController.update)
router.delete('/posts/:id', PostsController.destroy)

router.post('/login', AuthentificationController.login)
router.get('/getProfile', authentificateToken, AuthentificationController.getProfile)
router.post('/logout', AuthentificationController.logout)


export default router;