import ColumnCollection from '../db/Columns.js';
import TasksCollection from '../db/Tasks.js';

export const postTask = async (payload) => {
  const newTask = await TasksCollection.create(payload);

  const { boardId, columnId, userId, _id } = newTask;

  if (newTask) {
    await ColumnCollection.findOneAndUpdate(
      { _id: columnId, boardId, userId },
      { $addToSet: { tasks: _id } },
    );
  }

  return newTask;
};

export const replaceTask = async (oldColumn, newColumn, taskId) => {
  await ColumnCollection.findOneAndUpdate(oldColumn, {
    $pull: { tasks: taskId },
  });

  await ColumnCollection.findOneAndUpdate(newColumn, {
    $push: { tasks: taskId },
  });
};

export const checkColumn = async (filter) => {
  return await ColumnCollection.findOne(filter);
};

export const updateTask = async (filter, payload) => {
  return await TasksCollection.findOneAndUpdate(filter, payload, {
    new: true,
  });
};

export const findOldColumnId = async (filter) => {
  const data = await TasksCollection.findOne(filter, { columnId: 1 });

  return data ? data.columnId : null;
};

export const deleteTask = async (filter) => {
  const deletedTask = await TasksCollection.findOneAndDelete(filter);

  if (deletedTask) {
    await ColumnCollection.findOneAndUpdate(
      { _id: deletedTask.columnId },
      { $pull: { tasks: deletedTask._id } },
    );
  }

  return deletedTask;
};

export const filterTasksByPriority = async (priority, userId) => {
  return await TasksCollection.find({ priority, userId });
};
