const express = require('express');
const apiRouter = express.Router();
const {createMailingAddress, getMailingAddressById, getAllMailingAddress, getMailingAddressByUser, getUserByUsername} = require('../db');
const {requireUser, requireAdmin, requiredNotSent} = require('./utils')


apiRouter.get('/', async (req, res, next)=>{
    try{
        const address = await getAllMailingAddress();
        res.send(address);
    }catch (error){
        next(error)
    }
})

apiRouter.get('/:id', async (req, res, next)=>{
    try{
        const address = await getMailingAddressById(req.params.id);
        res.send(address);
    }catch (error){
        next(error)
    }
})

apiRouter.post('/', requireUser, requiredNotSent({requiredParams:['street', 'city', 'state']}), async (req, res, next)=>{
    try{;
        const{street, city, state} = req.body;
        const createdAddy = await createMailingAddress({street, city, state});
        if(createdAddy){
            res.send(createdAddy);
        }else{
            next({
                name:'FailedToCreate',
                message: 'There was an error creating your Address'
            })
        }
    }catch (error){
        next(error);
    }
});



apiRouter.get('/:username/mailing_address', requireUser, async (req, res, next)=>{
    try{
        const{username} = req.params;
        const user = await getUserByUsername(username);
        if(!user){
            next({
                name:'noUser',
                message: `Error finding User ${username}`
            });
        }else if(req.user && user.id === req.user.id){
            const address = await getMailingAddressByUser({username: username});
            res.send(address)
        }
    }catch (error){
        next(error)
    }
})
module.exports = apiRouter