function validateCreateTask(req, res, next) {
  const data = req.body;
  const errors = [];

  if (
    !data.title ||
    typeof data.title !== 'string' ||
    data.title.trim() === ''
  ) {
    errors.push('Title is required and must be a non-empty string.');
  }

  if (data.description && typeof data.description !== 'string') {
    errors.push('Description must be a string if provided.');
  }

  if (data.dueDate && isNaN(Date.parse(data.dueDate))) {
    errors.push('dueDate must be a valid date string if provided.');
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: 'Validation failed', errors });
  }

  next();
}

module.exports = validateCreateTask;
