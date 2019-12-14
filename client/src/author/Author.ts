export interface AuthorInterface {
    name: string,
    email: string
}

export class Author implements AuthorInterface {
    public readonly name: string;
    public readonly email: string;

    public static authorFromString(nameEmail: string) {
        const parts = nameEmail.split(' <');
        const email = parts[1].replace('>', '');
        return new Author(parts[0], email);
    }

    constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
    }
}
