import {Group} from "../group/Group";

export interface Server {
    url: string,
    groups: Group[]
}
