const express = require('express');
const router = express.Router();

router.get('/admin/users', (req, res) => {
  return res.json({});
});

module.exports = router;