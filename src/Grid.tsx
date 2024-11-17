import { useEffect, useReducer, useState } from "react";
import { reducer } from "./reducer";
import { initialState } from "./RootContext";
import { ICoordinate, IGrid, INode } from "./models";
import { ActionTypes } from "./actions";

export function Grid()
{
    const [state, dispatch] = useReducer(reducer, initialState)

    const [squareSize, setSquareSize] = useState(0);

    const [boxes, setBoxes] = useState<JSX.Element[][]>([[]])

    const updateSquareSize = () => setSquareSize(getSquareSize);

    useEffect(() => {
        console.log("useEffect triggered");

        updateSquareSize(); // Set initial size

        window.addEventListener("resize", updateSquareSize); // Update size on window resize

        dispatch({
            type: ActionTypes.UPDATE_GRID,
            payload: {
                ...state.grid,
                rows: 6,
                cols: 6,
            }
        })
    }, []);

    useEffect(() => {
        const nodes = initializeGridWithNodes(state.grid);
        console.log("Initialized nodes:", nodes);

        const coordinates = [
            { row: 0, col: 2 },
            { row: 1, col: 2 }
        ];

        const updatedNodes = setMap(nodes, coordinates);
        console.log("Updated nodes:", updatedNodes);

        dispatch({
            type: ActionTypes.UPDATE_NODES,
            payload: updatedNodes
        })

        return () => {
            console.log("Cleaning up event listener");
            window.removeEventListener("resize", updateSquareSize);
        }
    }, [state.grid])

    useEffect(() => {
        const updatedBoxes = generateSquaresFromNodes(state.nodes);

        setBoxes(updatedBoxes);
    }, [state.nodes])

    const { rows: row, cols: col } = state.grid;

    return (
        <div className="grid-container"
            style={
            {
                gridTemplateRows: `repeat(${row}, ${squareSize}px)`,
                gridTemplateColumns: `repeat(${col}, ${squareSize}px)`,
            }}>
                {boxes}
        </div>
    );
};

function generateSquaresFromNodes(nodes: INode[][])
{
    return nodes.map((row, rowindex) =>
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
}

function initializeGridWithNodes(grid: IGrid): INode[][]
{
    const createNode = (row: number, col: number) : INode => (
    {
        value: `${row}, ${col}`,
        visited: false,
        isBlocked: false
    });

    const nodes = Array.from({ length: grid.rows }, (row, rowIndex) =>
        Array.from({ length: grid.cols }, (_, index) => createNode(rowIndex, index)));

    return nodes;
}

function setMap(nodes: INode[][], coordinates: ICoordinate[]) {
    if (nodes.length === 0)
        return nodes;

    const updatedNodes = [...nodes];

    coordinates.forEach(({ row, col }) =>
    {
        updatedNodes[row][col] =
        {
            ...updatedNodes[row][col],
            isBlocked: true
        };
    });

    return updatedNodes;
}

function getSquareSize()
{
    const vw = window.innerWidth;
    const vh = window.innerHeight - 10; // Subtract space for button height (50px approx)

    // Calculate the available width and height for 10 squares in both directions
    const sizeByWidth = Math.floor(vw / 10);  // Size of square based on screen width
    const sizeByHeight = Math.floor(vh / 10); // Size of square based on screen height

    // The final square size will be the smaller of the two
    const finalSquareSize = Math.min(sizeByWidth, sizeByHeight);

    return finalSquareSize;
};
