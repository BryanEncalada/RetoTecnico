const { getFilmsData, addFilmData } = require("../controllers/filmsController");
const { Router } = require('express');
const router = Router();
 

router.get('/', getFilmsData);
router.post("/", addFilmData);

module.exports = router;
