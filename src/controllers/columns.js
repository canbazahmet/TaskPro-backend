import createHttpError from 'http-errors';

import * as columnsServices from '../services/columns.js';

const ensureColumnOwnership = async (columnId, userId) => {
  const column = await columnsServices.getColumnById(columnId);
  if (!column) {
    throw createHttpError(404, 'Column not found');
  }
  if (column.userId.toString() !== userId.toString()) {
    throw createHttpError(403, 'User does not have access to this column');
  }
  return column;
};

export const addColumnController = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { boardId } = req.body;

  if (!boardId) {
    return next(createHttpError(400, 'Missing boardId'));
  }

  const newColumn = await columnsServices.addColumn({ ...req.body, userId });

  res.status(201).json({
    status: 201,
    message: 'Column successfully created',
    data: newColumn,
  });
};

export const updateColumnController = async (req, res, next) => {
  const { id: _id } = req.params;
  const { _id: userId } = req.user;

  await ensureColumnOwnership(_id, userId);

  const updatedColumn = await columnsServices.updateColumn(
    { _id, userId },
    req.body,
  );

  if (!updatedColumn) {
    return next(createHttpError(404, 'Column not found'));
  }

  res.json({
    status: 200,
    message: 'Column successfully updated',
    data: updatedColumn,
  });
};

export const deleteColumnController = async (req, res, next) => {
  const { id: _id } = req.params;
  const { _id: userId } = req.user;

  await ensureColumnOwnership(_id, userId);

  const deletedColumn = await columnsServices.deleteColumn({ _id, userId });

  if (!deletedColumn) {
    return next(createHttpError(404, 'Column not found'));
  }

  res.status(204).send();
};
