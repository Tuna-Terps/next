import {MongoClient} from 'mongodb';

// judges, comp owners
// this will be used for a read connection to db; here we will return comp owner/entry data

export const connectToDatabaser = async() => {
    // query the user database
    let { db_User } = await MongoClient.connect(process.env.MONGODB_URI_R_Users)


    // query the event database
    let { db } = await MongoClient.connect(process.env.MONGODB_URI_W_Events)

    let collection = db.collection({
        
    })
    // query, projections (aka restrictions)
    .findOne({

    },{

    })
    .toArray()

    return {

    }
}