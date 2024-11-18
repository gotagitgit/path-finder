import { INode } from "./models";

export interface IBoxes {
    nodes: INode[][]
}

export function Boxes(props: IBoxes) {
    const boxes = props.nodes.map((row, rowindex) =>
    {
        return row.map((node, colIndex) =>
        {
            return (
                <button className={node.isBlocked ? 'grid-item-blocked' : 'grid-item'} key={`${rowindex}-${colIndex}`}>
                    {node.value}
                </button>
            )
        })
    })

    return (<>{boxes}</>);
}