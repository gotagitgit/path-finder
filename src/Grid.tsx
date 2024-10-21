import { useEffect, useReducer, useState } from "react";
import { reducer } from "./reducer";
import { initialState } from "./RootContext";
import { IGrid, INode } from "./models";
import { ActionTypes } from "./actions";

export function Grid()
{
    const [state, dispatch] = useReducer(reducer, initialState)

    const [squareSize, setSquareSize] = useState(0);

    const updateSquareSize = () => setSquareSize(getSquareSize);

    useEffect(() => {
        updateSquareSize(); // Set initial size

        window.addEventListener("resize", updateSquareSize); // Update size on window resize

        dispatch({
            type: ActionTypes.UPDATE_GRID,
            payload: {
                row: 6,
                col: 6,
            }
        })

        const nodes = initializeGridWithNodes(state.grid);

        dispatch({
            type: ActionTypes.UPDATE_NODES,
            payload: nodes
        })

        return () => window.removeEventListener("resize", updateSquareSize);
    });

    const { row, col } = state.grid;

    const gridLength = row * col;

    const gridItems = Array.from({ length: gridLength }, (_, index) => index + 1);

    const boxes = generateSquaresFromNodes(state.nodes);

    return (
        <div className="grid-container"
            style={
            {
                gridTemplateRows: `repeat(${row}, ${squareSize}px)`,
                gridTemplateColumns: `repeat(${col}, ${squareSize}px)`,
            }}>
            {
                boxes
            }
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
                <button className="grid-item" key={`${rowindex}-${colIndex}`}>
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
        visited: false
    });

    const nodes = Array.from({ length: grid.row }, (row, rowIndex) =>
        Array.from({ length: grid.col }, (_, index) => createNode(rowIndex, index)));

    return nodes;
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
