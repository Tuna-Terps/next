
/*
//const { withApiAuthRequired, getSession } = require("@auth0/nextjs-auth0");
import { MongoClient } from "mongodb";

// protect api call with requirement for session cookie
//export default withApiAuthRequired(async function getAllEvents(req, res){
  export default getAllEvents = async(req, res) => {
  console.log('[api][function getEvent')
  //if (req.method !== 'GET'){
  //  res.status(500).json({message:'internal server error'})
  //}
  //**
  // routing to /events and past will use this function ...
  // **
  //${process.env.clientRO_user}
  //${dbname}
    // read-only databse connection - events
  const clientRO_events = await MongoClient.connect(
    `mongodb+srv://db-readyonly:test@highorlo.wk0z6.mongodb.net/events?retryWrites=true&w=majority`
  );
  // event database - read only // rewrite from killfeed DB function, this shit trash lol
  const db = clientRO_events.db();
  const yourCollection = db.collection("eventData");
  const yourData = await yourCollection.find({
    _refid: "675345673" 
  }
  )//.toArray();
  console.log(yourData)
    // finished, returning
  clientRO_events.close();
  //res.json();
  // TODO !
  // after request successful, redirect somewhere else
    return {
      props: yourData
  }
}
*/

import {connectToDatabase} from '../../../components/mongodb';
const { withApiAuthRequired, getSession } = require("@auth0/nextjs-auth0");

export default withApiAuthRequired(async function getAllEvents(req, res){
  let session = getSession();
  if (!session) throw new Error('You have to be logged in to use this . . .')
  //if (req.method != 'GET') throw new Error('Sorry, only GET requests . . .')
  console.log('\n[ api ] [function getAllEvents\n');
  const { db } = await connectToDatabase();
  db.collection("eventData")
  .find({})
  .toArray()
  return {
      props: {
        event: JSON.parse(JSON.stringify(event)),
      },
  };
})