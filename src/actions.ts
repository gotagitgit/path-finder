import { IGrid, INode } from "./models"

export enum ActionTypes
{
    UPDATE_NODES = "UPDATE_NODES",
    UPDATE_GRID = "UPDATE_GRID"
}

export type UpdateNodesAction =
{
    type: ActionTypes.UPDATE_NODES,
    payload: INode[][]
}

export type UpdateGridAction =
{
    type: ActionTypes.UPDATE_GRID,
    payload: IGrid
}


export type Actions = UpdateNodesAction | UpdateGridAction