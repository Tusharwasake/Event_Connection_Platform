const isAdmin = (req, res, next) => {
  if (req.user.role === "organizer") {
    // console.log(req.user);
    next();
  } else {
    return res.status(403).json({ message: "you are not authorized" });
  }
};

export { isAdmin };
