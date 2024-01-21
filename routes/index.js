const express = require('express')
const router = express.Router()

router.get('/', (req, res)=> {
    res.render('index')
})

//需要使用module.exports而不是export ...
module.exports = router