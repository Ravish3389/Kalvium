const express = require('express');
const router = express.Router();
const mathController = require('../controllers/mathController');

router.get("/",mathController.displayOperations);
router.get("/history",mathController.history);
router.get(/^\/(.*)/, mathController.performOperation);

module.exports = router;
