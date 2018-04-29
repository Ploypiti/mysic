var express = require('express')
var router = express.Router()
var auth = require('../controllers/auth')

//Get homepage
router.get('/', function(req, res){
    res.render('index', {user: req.user});
})

//Get canvas
router.get('/canvas', function(req, res){
    res.render('canvas', {user: req.user});
})

//Get login
router.get('/signin', auth.get_login)

//Get register
router.get('/signup', function(req, res){
    res.render('register', {message: null})
})

router.post('/signin', auth.post_login)

router.post('/signup', auth.post_register)

router.get('/signout', auth.get_logout)

module.exports = router;
