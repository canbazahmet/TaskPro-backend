import ColumnCollection from '../db/Columns.js';
import TasksCollection from '../db/Tasks.js';

export const postTask = async (payload) => {
  const newTask = await TasksCollection.create(payload);
  const { boardId, columnId, userId, _id } = newTask;

  await ColumnCollection.findOneAndUpdate(
    { _id: columnId, boardId, userId },
    { $addToSet: { tasks: _id } },
  );

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
  const result = await TasksCollection.findOneAndUpdate(filter, payload, {
    new: true,
  });

  return result;
};

export const findOldColumnId = async (_id) => {
  const data = await TasksCollection.findById(_id, { columnId: 1 });
  return data?.columnId;
};

export const deleteTask = async (filter) => {
  const deletedTask = await TasksCollection.findByIdAndDelete(filter._id);

  if (deletedTask) {
    await ColumnCollection.findOneAndUpdate(
      { _id: deletedTask.columnId },
      { $pull: { tasks: filter._id } },
    );
  }

  return deletedTask;
};

export const filterTasksByPriority = async (priority, userId) => {
  return await TasksCollection.find({ priority, userId });
};
