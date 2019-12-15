export interface AuthorInterface {
  name: string,
  email: string
}

export class Author implements AuthorInterface {
  public readonly name: string;
  public readonly email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }

  public static authorFromString(nameEmail: string) {
    const nameEmailRegexp = new RegExp('(.*?) <(.*?)>');
    const nameEmailResult = nameEmailRegexp.exec(nameEmail);
    let name: string;
    let email: string;
    if (nameEmailResult === null) {
      name = nameEmail;
      email = "placeholder.mail@srvr.at";
    } else {
      name = nameEmailResult[1];
      email = nameEmailResult[2];
    }
    return new Author(name, email);
  }
}
