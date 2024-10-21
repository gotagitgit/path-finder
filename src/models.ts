
export interface IRootState
{
    nodes: INode[][],
    grid: IGrid
}

export interface INode
{
    value: string | null,
    visited: boolean
}

export interface IGrid
{
    row: number,
    col: number,
}