import {Author} from "../author/Author";
import {Moment} from "moment";

export interface Article {
    id: number,
    subject: string,
    content: string,
    date: Moment,
    author: Author,
    followUps: Article[]
}
