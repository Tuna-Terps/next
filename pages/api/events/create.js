// when user validates, create form to submit a new event

const { withApiAuthRequired, getSession} = require("@auth0/nextjs-auth0");
import clientPromise from "../../../utils/mongo.js"
import { v4} from 'uuid';

export default withApiAuthRequired(function createEvent(req, res){
    const session = getSession(req, res)
    if (!session.user || session.user === undefined) return res.status(400).end();
    console.log(session.user.nickname)
    console.log('[ API ] user session active: [Function] createEvent');
    console.log(req.body)
    if (req.body === undefined || req.body?.desc === undefined || req?.body?.date === undefined){
        res.status(500)
        console.log(500)
        return {
            error: res.status(500)
        }
    }
    const rName = req.body.name;
    const rDesc = req.body.desc;
    const rDate = req.body.date;
    const rJudges = req.body?.judgeArray;
    const rId = req.body?.oId
    rJudges ?? [{_name: 'string', _id: 'testid', _categories: [{catName:'cattest', catId:'catId'}]}];
    rId ?? {id: 'placeholder'};

    // query to insert
    (async() => {

        const uId = v4()

        const client = await clientPromise;
        const eventDb = client.db('events');
        await eventDb.collection("eventData")
        .insertOne({
            _name: {
                nameVal: `${rName}`,
                ownerId: `${rId}`,
                desc: `${rDesc}`,
                date: `${rDate}`
            },
            _refid: `${uId}`,
            _judgeArray: rJudges,
            _catArray: [

            ]
        })
        .catch(e => console.log(e))
        .then(async () => {
            console.log('[ DB ] Insert success ! [ function createEvent ]');
            // here we query and remove tokens from the user db, and add the refid to the owned comp value
            const userDb = client.db("users");
            await userDb
            .collection("userData")
            .findOneAndUpdate(
                { _refId:`${session.user.nickname}` },
                {   
                    $set:{   
                        _tokens: 0, 
                    },
                    $push:{
                        _ownedComps: {compId: uId, compName: rName}
                    }
                }
            ).catch(e => console.log(e))
            console.log('[ DB ] Update success ! [ function editUser ]');
            return res.status(200).end()
        })
    })();
    res.status(201).end()
})