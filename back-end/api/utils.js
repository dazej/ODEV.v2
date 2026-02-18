// acts as a sort of security, make sure the user is logined in to perform certain actions
function requireUser(req, res, next) {
    if (!req.user){
        res.status(401);
        next({
            name:"MissingUserError",
            message:"You must be logged in to perform this action"
        });
    }

    next();
}

function requireAdmin(req, res, next){
    if(!req.user.type === 'admin'){
console.log("not an admin")
        res.status(401);
        next({
            name:"MissingAdminError",
            message:"You must be an admin to perform this action"
        });
    }else{
      next()
    }
}

const requiredNotSent = ({ requiredParams, atLeastOne = false }) => {
    return (req, res, next) => {
      if(atLeastOne) {
        let numParamsFound = 0;
        for(let param of requiredParams) {
          if(req.body[param] !== undefined) {
            numParamsFound++;
          }
        }
        if(!numParamsFound) {
          next({
            name: 'MissingParams',
            message: `Must provide at least one of these in body: ${requiredParams.join(', ')}`
          })
        } else {
          next();
        }
      } else {
        // figure out which ones are not defined, and return them
        const notSent = [];
        for(let param of requiredParams) {
          if(req.body[param] === undefined) {
            notSent.push(param);
          }
        }
        if(notSent.length) next({
          name: 'MissingParams',
          message: `Required Parameters not sent in body: ${notSent.join(', ')}`
        })
        next();
      }
    }
  }
  
  module.exports = {
    requireUser,
    requiredNotSent,
    requireAdmin,
  }