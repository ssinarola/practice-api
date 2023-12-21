const router = require('express').Router()

router.use('/auth', require('./authRoute'))
router.use('/product', require('./admin/productRoute'))
router.use('/category', require('./admin/categoryRoute'))

module.exports = router
