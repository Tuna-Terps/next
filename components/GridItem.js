import Link from 'next/link'
import gridStyles from '../styles/Grid.module.css'

const GridItem = ({article}) => {
    return (
        <Link href="/article/[id]" as={`/article/${article.id}`}> 
            <a className={gridStyles.card}>
                <h3>{article.title} &rarr;</h3>
                <p>{article.body}</p>
            </a>
        </Link>
    )
}

export default GridItem
