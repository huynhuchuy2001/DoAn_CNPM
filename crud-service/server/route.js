import express from 'express';
import { getUsers, addUser, getUserById, editUser, deleteUser, getAllUsers, sendEmail } from '../controller/user-controller.js';

const router = express.Router();
router.get('/all', getAllUsers);
router.get('/', getUsers);
router.post('/add', addUser);
router.get('/:id', getUserById);
router.put('/:id', editUser);
router.delete('/:id', deleteUser);
router.put('/sendEmail/:id',sendEmail);
export default router;