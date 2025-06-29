const router = require('express').Router();
const { db } = require('../firebaseConfig');
const validateCreateTask = require('../middleware/validateCreateTask');
const validateUpdateTask = require('../middleware/validateUpdateTask');

// GET /api/tasks/allTasks - Get all tasks
router.route('/allTasks').get(async (req, res) => {
  try {
    const tasksCollection = db.collection('tasks');
    const tasksSnapshot = await tasksCollection.get();

    const tasks = tasksSnapshot.docs.map((doc) => ({
      taskId: doc.id,
      ...doc.data(),
    }));

    return res.status(200).json(tasks);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET /api/tasks/:id - Get task by ID
router
  .route('/:id')
  .get(async (req, res) => {
    try {
      const taskDoc = await db.collection('tasks').doc(req.params.id).get();

      if (!taskDoc.exists) {
        return res.status(404).json({ message: 'Task not found' });
      }

      res.status(200).json({ taskId: taskDoc.id, ...taskDoc.data() });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: 'Failed to fetch task', error: err.message });
    }
  })

  // UPDATE /api/tasks/ - Update a task
  .put(validateUpdateTask, async (req, res) => {
    try {
      const updateData = req.body;
      const taskRef = db.collection('tasks').doc(req.params.id);
      const taskDoc = await taskRef.get();

      if (!taskDoc.exists) {
        return res.status(404).json({ message: 'Task not found' });
      }

      await taskRef.update(updateData);
      res.status(200).json({ message: 'Task updated successfully' });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: 'Failed to update task', error: err.message });
    }
  })

  // DELETE /api/tasks/ - Delete a task
  .delete(async (req, res) => {
    try {
      const taskRef = db.collection('tasks').doc(req.params.id);
      const taskDoc = await taskRef.get();

      if (!taskDoc.exists) {
        return res.status(404).json({ message: 'Task not found' });
      }

      await taskRef.delete();
      res.status(200).json({ message: 'Task deleted successfully' });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: 'Failed to delete task', error: err.message });
    }
  });

// POST /api/tasks/ - Create a new task
router.post('/', validateCreateTask, async (req, res) => {
  try {
    const taskData = req.body;
    const docRef = await db.collection('tasks').add(taskData);
    res.status(201).json({ taskId: docRef.id, ...taskData });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: 'Failed to create task', error: err.message });
  }
});

module.exports = router;
