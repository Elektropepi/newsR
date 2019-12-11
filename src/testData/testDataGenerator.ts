import {Server, ServerInterface} from "../server/Server";
import {Author} from "../author/Author";
import {Article} from "../article/Article";
import moment from "moment";
import {GroupInterface} from "../group/Group";

export function mockServer(): ServerInterface {
    return {host: 'news.tugraz.at', port: 119, groups: generateGroups(randomInt(5, 20))};
}

function generateGroups(count: number): () => Promise<GroupInterface[]> {
    let groups: GroupInterface[] = [];
    for (let i = 0; i < count; i++) {
        groups.push({
           name: randomString(),
           description: randomString(randomInt(3, 10)),
           threads: generateArticles(randomInt(5, 20), false)
        });
    }
    return async() => groups;
}

function generateArticles(count: number, hasFollowUps: boolean): () => Promise<Article[]> {
    const author1: Author = {email: "bla.bla@asf.at", name: "Elektro Pepi"};
    const author2: Author = {email: "test.test@test.xx", name: "Fuada Maschin"};
    let articles: Article[] = [];
    for (let i = 0; i < count; i++) {
        let followUps: () => Promise<Article[]> = async() => [];
        if (hasFollowUps) {
            followUps = generateArticles(randomInt(1, 10), Math.random() < 0.5);
        }
        articles.push({
            id: randomInt(0, Number.MAX_SAFE_INTEGER),
            subject: randomString(randomInt(1, 3)),
            content: randomString(randomInt(30, 60)),
            date: moment(),
            author: Math.random() < 0.5 ? author1 : author2,
            followUps: followUps
        });
    }
    return async() => articles;
}

function randomInt(minInclusive: number = 0, maxExclusive: number = 1000): number {
    return Math.round(Math.random() * (maxExclusive - minInclusive- 1)) + minInclusive;
}
let strings: string[] = [
    "Spicy", "jalapeno", "bacon", "ipsum", "dolor", "amet", "cow", "chicken",
    "burgdoggen", "fatback", "capicola",  "Corned", "beef", "pastrami", "ribeye",
    "prosciutto", "leberkas",  "Leberkas", "corned", "beef", "cow", "ball", "tip",
    "pork", "beef", "ribs", "pastrami", "shankle", "short", "loin", "boudin",
    "salami", "buffalo", "biltong",  "Pork", "fatback", "jerky", "rump",
    "Flank", "spare", "ribs", "pork", "belly",  "frankfurter", "ham", "hock",
    "pork", "chop", "hamburger", "ribeye", "beef", "ribs", "chuck",  "Fatback",
    "buffalo", "doner",  "hamburger", "strip", "steak", "swine", "pig", "pork",
    "belly", "kielbasa", "sirloin", "corned", "beef",
];
function randomString(wordCount: number = 1): string {
    let string = "";
    for(let i = 0; i < wordCount; i++) {
        const index = randomInt(0, strings.length);
        string += strings[index] + " ";
    }
    return string.slice(0, -1);
}
