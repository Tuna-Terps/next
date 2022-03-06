// when **validated**, allows user to be entered into judgeArray

// when user validates, create form to submit a new event

const { withApiAuthRequired } = require("@auth0/nextjs-auth0");
import { MongoClient } from "mongodb";

// protect api call with requirement for session cookie
export default withApiAuthRequired(async function authJudge(req, res){
    let body = req.body;
    console.log(body)
    let resData = res;
    console.log(resData?.json())
    // auth role ? or should i use mongodb data hmm
    if (res.status >= 200 && res.status < 400){
        console.log('STATUS 200: user session active: [Function] authJudge');
        
    }
    else {
        console.log('else: user session active: [Function] authJudge');
        
    }
    res.json({byId: req.query.id, method: req.method, message: 'getEventById'})

})