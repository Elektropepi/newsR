export class Content {
  public readonly citationLevel: number;
  public readonly text: string;
  private static readonly citationRegex: RegExp[] = [
    new RegExp(/am(.*?)schrieb.*/, "i"),
    new RegExp(/on(.*?)wrote.*/, "i")
  ];
  constructor(text: string, citationLevel: number) {
    this.citationLevel = citationLevel;
    this.text = text;
  }

  public isCitationStart(): boolean {
    return this.citationLevel === 0 && Content.isCitationStart(this.text);
  }

  private static isCitationStart(text: string): boolean {
    return this.citationRegex.find((regexp: RegExp) => regexp.test(text)) !== undefined;
  }
}
