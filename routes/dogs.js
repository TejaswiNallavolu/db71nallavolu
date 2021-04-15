var express = require('express');
var router = express.Router();
const dog_controlers=require('../controllers/dogs')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('dogs', { title: 'Search Results for Dogs' });
});
/* GET detail dog page */
router.get('/detail', dog_controlers.dog_view_one_Page);

/* GET create dog page */
router.get('/create', dog_controlers.dog_create_Page);

/* GET create update page */
router.get('/update', dog_controlers.dog_update_Page);

/* GET create costume page */
router.get('/delete', dog_controlers.dog_delete_Page);






module.exports = router;