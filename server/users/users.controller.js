const express = require('express');
const router = express.Router();
const userService = require('./user.service');
const fs = require('fs');
var multer = require('multer');
var path = require('path');
let location = path.join(__dirname, './../uploads');
let storege = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, location);
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);

  },
  limits: {
    fileSize: 1024 * 1024
  }
})
var upload = multer({
  storage: storege,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      return callback(new Error('Only images are allowed'))
    }
    callback(null, true)
  },
});
// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.post('/uploadProfile', upload.any(), uploadProfile);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function authenticate(req, res, next) {
  userService.authenticate(req.body)
    .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
    .catch(err => next(err));
}

function uploadProfile(req, res, next) {
  res.send(req.files);
}


function register(req, res, next) {
  userService.create(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function getAll(req, res, next) {
  userService.getAll()
    .then(users => res.json(users))
    .catch(err => next(err));
}

function getCurrent(req, res, next) {
  userService.getById(req.user.sub)
    .then(user => user ? res.json(user) : res.sendStatus(404))
    .catch(err => next(err));
}

function getById(req, res, next) {
  userService.getById(req.params.id)
    .then(user => user ? res.json(user) : res.sendStatus(404))
    .catch(err => next(err));
}

function update(req, res, next) {
  userService.update(req.params.id, req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function _delete(req, res, next) {
  userService.delete(req.params.id)
    .then(() => res.json({}))
    .catch(err => next(err));
}