export const authorize = (...authorizedRole) => {
  return (req, res, next) => {
    if (!authorizedRole.includes(req.user.role)) {
      res.status(403).json({ message: "Access Denied" });
    }
    next();
  };
};
