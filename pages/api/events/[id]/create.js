// when user validates, create form to submit a new event

const { withApiAuthRequired, getSession } = require("@auth0/nextjs-auth0");
import { MongoClient } from "mongodb";

// protect api call with requirement for session cookie
export default withApiAuthRequired(async function createEvent(req, res){
    console.log('user session active: [Function] createEvent');
    res.json({byId: req.query.id, method: req.method, message: 'getEventById'})
    
})