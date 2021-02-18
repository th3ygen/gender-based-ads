const root = require('app-root-path').path;

const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.use('/video', express.static(path.join(root, '/res/video')));

module.exports = router;