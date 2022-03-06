// when user validates, allow to submit POST requests to the db

// when user validates, create form to submit a new event

const { withApiAuthRequired, getSession } = require("@auth0/nextjs-auth0");
import { MongoClient } from "mongodb";

// protect api call with requirement for session cookie
export default withApiAuthRequired(async function manageEvent(req, res){
    console.log('user session active: [Function] manageEvent');
    res.json({byId: req.query.id, method: req.method, message: 'getEventById'})

})