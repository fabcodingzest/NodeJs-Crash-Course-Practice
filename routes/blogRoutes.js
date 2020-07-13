const express = require('express');
const blogController = require('../controllers/blogController')
const router = express.Router();

// blog routes
router.get('/', blogController.blog_index)
router.get('/create', blogController.blog_create_get)
router.post('/', blogController.blog_create_post)
router.get('/:id', blogController.blog_details)
router.get('/edit/:id', blogController.blog_edit_get)
router.post('/edit/:id', blogController.blog_edit_post)
router.delete('/:id', blogController.blog_delete)

module.exports = router;