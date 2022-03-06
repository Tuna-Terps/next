// ideally, this data will come from a db for SSR, static apis should use getStaticProps
import {articles} from '../../../data'

export default function handler({query: {id}}) {

    const filtered = articles.filter(article =>{
        article.id === id;
        if (filtered.length > 0){
            res.status(200).json(filtered[0])
        }
        else{
            res.status(404).json({message: `article with ${id} not found`})
        }
    })    
}