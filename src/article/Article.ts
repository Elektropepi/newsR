import {Author} from "../author/Author";

export interface Article {
    id: number,
    subject: string,
    content: string,
    date: Date,
    author: Author,
    followUps: Article[]
}
