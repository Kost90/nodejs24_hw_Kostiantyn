const express = require('express');
const router = express.Router();
const {validateUserData,validateUserId} = require('../midleware/validators');

router.get('/',(req,res) =>{
    res.statusCode = 200;
    const result = [];
    res.send(result) 
});
router.post('/user',validateUserData);
router.get('/user/:userId',validateUserId);
router.delete('/user/:userId',validateUserId);

module.exports = router