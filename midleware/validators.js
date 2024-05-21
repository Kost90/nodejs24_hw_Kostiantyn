const { object, string } = require("yup");

const userSchema = object({
  username: string().required().nonNullable().min(3),
  email: string().email().required(),
});


const validateUserData = async (req, res, next) => {
  try {
    const data = req.body;
    const user = await userSchema.validate(data);
    if (user) {
      next();
    }
  } catch (error) {
    res.status(400).send({ error: `Validation of user is failed: ${error}` });
  }
};

module.exports = 
    validateUserData
;