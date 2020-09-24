var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var User = require("../model/User");

/* GET users listing. */
router.get("/", function (req, res, next) {
  User.find(function (err, user) {
    if (err) {
      res.next(err);
    } else {
      res.json(user);
    }
  });
});

//Post User
router.post("/add", function (req, res, next) {
  var user = new User(req.body);
  user.save(function (err) {
    if (err) res.json(err);
    res.json({
      User: user,
    });
  });
});

//getByid

router.get("/:id", function (req, res, next) {
  var id = parseInt(req.params.id);
  User.findOne({ id: req.params.id }, function (err, user) {
    if (err) {
      return next(err);
    } else {
      res.json(user);
    }
  });
});
//Update User

router.put("/add/:id", function (req, res, next) {
  var id = parseInt(req.params.id);
  User.findOne({ id: req.params.id }, function (err, user) {
    if (err) {
      return next(err);
    } else {
      user.name = req.body.name;
      user.course = req.body.course;
      user.email = req.body.email;

      user.save(function (err) {
        if (err) res.json(err);
        else {
          res.json({
            User: user,
          });
        }
      });
    }
  });
});

router.delete("/:id", function (req, res, next) {
  var id = parseInt(req.params.id);
  User.findOne({ id: req.params.id }, function (err, user) {
    if (err) {
      return next(err);
    } else {

      user.deleteOne(function (err) {
        if (err) res.json(err);
        else {
          res.json({
            User: user,
          });
        }
      });
    }
  });
});

module.exports = router;
