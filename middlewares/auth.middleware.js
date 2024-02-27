module.exports = (req, res, next) => {
  const pathName = req.baseUrl + req.path;
  console.log(pathName);
//   console.log(req.user);
    if (req.user && pathName === "/admin/login") {
    return res.redirect("/admin");
    }

    if (req.user ||  pathName === "/admin/login") {
        return next();
    }
  
    return res.redirect("/admin/login");
};
