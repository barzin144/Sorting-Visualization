import { Item } from "../item";

export interface State {
    array: Item[];
    iteration: number;
    sorted: number;
    started: boolean;
    speed: number;
    arrayCount: number;
}
