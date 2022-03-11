// read-only connection; return from event collection
import { connectToDatabase } from "../../components/mongodb.js";
import gridStyles from '../../styles/Grid.module.css';
import Link from 'next/Link';
import Head from 'next/head';

export default function Events({ events }) {
              /*<image src={event._imgurl}>{event._imgurl}</image>*/

  return (
    <div>
      <Head>
        <title>highorlo | All Events</title>
        <meta name='keywords' content='judging, competitions, ratings, events' />
      </Head>
      <div className={gridStyles.head}>Events powered by highorlo 
      </div>
      <p>
        {events.map((event) => (
          <Link href={`/events/${event._refid}`}>
          <li className={gridStyles.card}>
          <image src={event._imgurl}>{event._imgurl}</image>
            <h2>{event._name?.nameVal}</h2>
            <small>{event._name.desc}</small>
            <h3>Ref ID: {event._refid}</h3>
            <small>{event._name.date}</small>
          </li>
          </Link>
        ))}
      </p>
    </div>
  );
}

export async function getServerSideProps() {
  const { db } = await connectToDatabase();
  const events = await db
    .collection("eventData")
    .find({})
    //.limit(20)
    .toArray();
    console.log('/events/index:44 events:')
    console.log(events)
  return {
    props: {
      events: JSON.parse(JSON.stringify(events)),
    }
  };
}