const { object, string, number } = require("yup");

const userSchema = object({
  username: string().required().nonNullable().min(3),
  email: string().email().required(),
});

const id = number().required().positive().integer();

const validateUserData = async (req, res, next) => {
  try {
    const data = req.body;
    const user = await userSchema.validate(data);
    if (user) {
      res.status(201).send(`User created`);
    }
  } catch (error) {
    res.status(400).send({ error: `Validation of user is failed: ${error}` });
  }
  next();
};


const validateUserId = async (req, res, next) => {
  try {
    const data = req.params.userId;
    const userId = Number(data);
    const idValidated = await id.validate(userId);
    if (idValidated && userId > 0) {
      if (req.method === "DELETE") {
        res.status(204);
      } else {
        res.send({ userId: userId });
      }
    }
  } catch (error) {
    res
      .status(400)
      .send({ error: `Validation of user "id" is failed: ${error}` });
  }
  next();
};


module.exports = {
    validateUserData,
  validateUserId,
};
