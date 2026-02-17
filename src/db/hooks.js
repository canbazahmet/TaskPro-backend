export const handleSaveError = (error, data, next) => {
  const { code, name } = error;
  error.status =
    code === 11000 && name === 'MongoServerError' ? (409, '') : 400;
  if (next) next();
};

export const setUpdateSettings = function () {
  this.options.runValidators = true;
  this.options.new = true;
};
