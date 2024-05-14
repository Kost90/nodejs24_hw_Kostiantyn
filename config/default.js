module.exports = {
  colors: process.env.COLORS_ENABLED || 0,
  logLevel:process.env.LOG_LEVEL || 'warn',
  port:process.env.PORT || 3001,
};
