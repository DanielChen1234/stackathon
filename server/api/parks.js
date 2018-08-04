const router = require('express').Router()
const {Park} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
    try {
      const parks = await Park.findAll()
      res.json(parks)
    } catch (err) {
      next(err)
    }
  })
