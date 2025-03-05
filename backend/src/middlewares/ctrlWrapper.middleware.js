const crtlWrapper = (ctrl) => {
  const func = (req, res, next) => {
    try {
      ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  return func;
};

module.exports = crtlWrapper;
