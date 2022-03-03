const express = require('express');
const initialData = require('../../controllers/admin/initialData-controller');
const router = express.Router();





router.post('/initialdata', initialData);





module.exports = router;