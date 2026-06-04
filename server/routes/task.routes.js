const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const { getTasks, createTask, updateTask, toggleStatus, deleteTask } = require('../controllers/task.controller');

// All task routes are protected — must be logged in
router.use(auth);

router.get('/',          getTasks);
router.post('/',         createTask);
router.put('/:id',       updateTask);
router.patch('/:id',     toggleStatus);
router.delete('/:id',    deleteTask);

module.exports = router;