const { getUserList } = require("../services/usersServices");

async function getAllUsers(req, res) {
  const userList = getUserList();
  res.send(userList);
}

module.exports = {
  getAllUsers,
};
