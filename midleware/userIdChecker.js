const { number } = require("yup");

const id = number().required().positive().integer();

const UserIdChecker = async (req, res, next) => {
  try {
    const data = req.params.userId;
    const userId = Number(data);
    const idValidated = await id.validate(userId);
    if (idValidated && userId > 0) {
      res.body = userId;
      next();
    }
  } catch (error) {
    res
      .status(400)
      .send({ error: `Validation of user "id" is failed: ${error}` });
  }
  next();
};

module.exports = UserIdChecker;
