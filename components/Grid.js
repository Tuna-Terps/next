import GridItem from './GridItem'
import gridStyles from '../styles/Grid.module.css'

console.log('grid')

const Grid = ({items}) => {
    return (
        <div className={gridStyles.grid}>
            {items.map((item) => (
                < GridItem item={item} />
            ))}
        </div>
    )
}

export default Grid
