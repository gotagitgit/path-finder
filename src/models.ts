
export interface IRootState
{
    nodes: INode[][],
    grid: IGrid
}

export interface INode
{
    value: string | null,
    visited: boolean,
    isBlocked: boolean
}

export interface IGrid
{
    rows: number,
    cols: number,
    squareSize: number,
    startCoordinate: ICoordinate,
    finishCoordinate: ICoordinate
}

export interface ICoordinate
{
    row: number,
    col: number
}