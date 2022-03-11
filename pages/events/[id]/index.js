import Link from 'next/Link'
import { connectToDatabase } from "../../../components/mongodb";
import Head from 'next/head'

export default function eventSingle({event}) {
    return (
        <div>
            <Head>
            <title>highorlo | {event._name?.nameVal}</title>
            <meta name='keywords' content='judging, competitions, ratings, events' />
            </Head>
            <h1> More info for the event . . . {} </h1>
            <h3> [NAME] - {event._name?.nameVal} </h3>
            <h3> [ID] - {event._refid} </h3>
            <small>IMG:{event._imgurl}</small>
            <ul>
            <Link href={'/events'}>Navigate back to events </Link>
            </ul>
        </div>
    )
}

// ssr for seo
export async function getServerSideProps(context) {
    const { id } = context.query;
    const { db } = await connectToDatabase();
    //console.log(`\n GetRoute? ${GetRoute.pathname}`)
    const event = await db
        .collection("eventData")
        // query, options
        .findOne(
            // search param
            {_refid: `${id}`},
            // what we want to omit from the return
            {projection: {
                _id: false,
                _judgeArray: false,
                _scores: false
            }
        })
    console.log(event)
    //db.close()
    console.log(`--\n\n EVENT : ${event} \n\n--`)
    console.log(event)
    return {
      props: {
        event: JSON.parse(JSON.stringify(event)),
      },
    };
  }