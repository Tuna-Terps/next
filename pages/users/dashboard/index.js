// pages/profile.js
import { withPageAuthRequired, useUser } from '@auth0/nextjs-auth0';
import Head from 'next/head';
import gridStyles from '../../../styles/Grid.module.css';
import Link from 'next/Link'
import clientPromise from '../../../utils/mongo.js'

//

export default withPageAuthRequired(function DashBoard({data}) {
  const { error, isLoading, user } = useUser();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (user.nickname !== data._refId){
      return(
    <div className={gridStyles.head}>
    <Link href={{
        pathname: `/users/dashboard/`,
        query:{name:`${user.nickname}`}
    }}>
        | ERROR | RETURN TO DASHBOARD
    </Link>
    </div>)
  }

  return (
    <>
    <Head>
        <title>highorlo | Event Dashboard</title>
        <meta name='keywords' content='judging, competitions, ratings, events' />
    </Head>
    <div>Hello {user.nickname} welcome to the competition dashboard !</div>
    <p>
        {user.nickname === data._refId && (
            <div>
                <div className={gridStyles.head}>EVENTS YOU OWN</div>
                {data._ownedComps.map((item)=>(
                    <li className={gridStyles.card}>
                        <h2>{item.compName}</h2>
                        <h2>ID: {item.compId}</h2>
                        <Link href={{
                            pathname: `/users/dashboard/event/${item.compId}`,
                            query:{name:`${user.nickname}`, id: `${item.compId}`}
                        }}>
                            Navigate to event
                        </Link>    
                    </li>
                ))}
                {data._tokens >= 1 && (
                <>
                <li className={gridStyles.btn}>
                    <Link href={{
                        pathname: `/users/dashboard/create`,
                        query:{name:`${user.nickname}`}
                    }}>
                        CREATE A NEW EVENT
                    </Link>
                </li>
                </>
                )}
            <div className={gridStyles.head}>CURRENTLY JUDGING</div>
                {data._judgingAt.map((item)=>(
                    <>
                    <li className={gridStyles.card}>
                    <Link href={{
                        pathname: `/users/dashboard/judging`,
                        query:{
                            name:`${user.nickname}`,
                            id:`${item.eventId}`
                        }
                    }}>
                        <h2>ID: {item.eventId} Judge Panel</h2>
                    </Link>
                    </li>
                    </>
                ))}
            </div>
        )} 
    </p>

    </>
  )
});

export async function getServerSideProps(context) {
    console.log(`dashboard:28 ${context.query.name}`);
    console.log(JSON.parse(JSON.stringify(context.query.name)));
    const id = context.query.name;
    //console.log(context)
    const  client = await clientPromise;
    const userDb = client.db("users");
    const userData = await userDb
    .collection("userData")
    .findOne(
        { _refId:`${id}` },
        { projection: { _id: 0, _uid: 0,} }
    )
    console.log(JSON.parse(JSON.stringify(userData)));
    return{
        props:{
            data: JSON.parse(JSON.stringify(userData)),
        }
    }
}