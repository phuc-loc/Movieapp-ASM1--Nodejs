const express= require('express');
const router = express.Router();
const UserModel = require('../model/user');

router.use('/api/movies', (req, res, next) => {
    const tokenId = req.query.token;
    if(tokenId != undefined){
        UserModel.fetchtAll((users) => {
            const user = users.find( (user) => user.token === tokenId );
            if(user){
                next();
            } else {
                res.statusMessage = "Unauthorized";
                res.status(401).end();
            }
        })
    }
})
 
module.exports = router