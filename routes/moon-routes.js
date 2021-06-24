const express = require('express');
const { getMoon,
    updateMoon
} = require('../controllers/moonController');

const router = express.Router();

router.get('/moon/:id', getMoon);
router.put('/moon/:id', updateMoon);


module.exports = {
    routes: router
}