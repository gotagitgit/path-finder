import { Actions, ActionTypes } from "./actions";
import { IRootState } from "./models";

export function reducer(state: IRootState, action: Actions)
{
    switch (action.type) {
        case ActionTypes.UPDATE_NODES:
            return {
                ...state,
                nodes: action.payload
            }
        case ActionTypes.UPDATE_GRID:
            return {
                ...state,
                grid: action.payload
            }
        default:
            return state;
    }
}