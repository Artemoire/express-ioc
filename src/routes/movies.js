const express = require('express');
const appSerloc = require('../app.serloc');
const router = express.Router();

/* GET home page. */
router.get('/', async function (req, res, next) {
  const serloc = appSerloc(req, res, next);

  /**
   * @type {vendor.IMoviesEndpoint}
   */
  const movies = serloc.locate('movies.endpoint');

  res.json(await movies.all());

});

module.exports = router;
