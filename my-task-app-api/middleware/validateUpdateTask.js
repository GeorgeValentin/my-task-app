function validateUpdateTask(req, res, next) {
  const data = req.body;

  // Check that at least one of priority, assignedUser, or status is present
  if (
    data.priority === undefined &&
    data.assignedUser === undefined &&
    data.status === undefined
  ) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: [
        'At least one of priority, assignedUser, or status must be provided for update.',
      ],
    });
  }

  // Optional: validate types if present
  const errors = [];

  if (data.priority !== undefined && typeof data.priority !== 'string') {
    errors.push('priority must be a string.');
  }

  if (
    data.assignedUser !== undefined &&
    typeof data.assignedUser !== 'string'
  ) {
    errors.push('assignedUser must be a string.');
  }

  if (data.status !== undefined && typeof data.status !== 'string') {
    errors.push('status must be a string.');
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: 'Validation failed', errors });
  }

  next();
}

module.exports = validateUpdateTask;
