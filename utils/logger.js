// function logger (req,res, next) {}
const logger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}]${req.method} ${req.originalUrl}`);
  next();
};

module.exports = logger;
