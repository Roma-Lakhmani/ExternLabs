const validateToken = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(404).send({
      auth: false,
      message: "token not found!",
    });
  }
  //To check authenticated user we can get the token from databse
  const staticKey = process.env["HEADER_SECRET_KEY"];
  if (token === staticKey) {
    next();
  } else {
    return res.status(403).send({
      auth: false,
      message: "Invalid token!",
    });
  }
};

module.exports = {
  validateToken,
};
