import {useRouter} from 'next/router';

export function GetRoute(){
    let router = useRouter();
    console.log(`\n\n ROUTER:`)
    console.log(router?.query.id)
    return router.query.id
}

export default GetRoute