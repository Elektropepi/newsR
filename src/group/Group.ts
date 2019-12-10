import {Article} from "../article/Article";

export interface Group {
    name: string,
    description: string,
    threads: Article[]
}
