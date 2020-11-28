import express from 'express';
import usersController from '../controllers/users.js';

const router = express.Router();

router.get('/', usersController.getAll);
router.get('/login/:username/:password', usersController.logUser);

router.post('/',  usersController.createUser);

router.patch('/:id', usersController.updateUser);
router.patch('/like/:userId/:animeId', usersController.likeAnime)

router.delete('/:id', usersController.deleteUser);

export default router;