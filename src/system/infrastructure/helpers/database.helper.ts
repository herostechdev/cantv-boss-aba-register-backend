export class DatabaseHelper {
  public static getQueryAliases(input: string): string[] {
    const tableRegex =
      /\bFROM\s+([\w.]+)(?:\s+(?![INNER|LEFT|RIGHT]\b)(\w+))?/gim;
    const joinRegex = /\bJOIN\s+([\w.]+)(?:\s+(?!ON\b)(\w+))?/gim;
    const results: string[] = [];
    input = input.replaceAll('`', '');
    const tableInfo = tableRegex.exec(input);
    results.push(tableInfo[tableInfo.length - 1]);
    let match = joinRegex.exec(input);
    while (match !== null) {
      results.push(match[match.length - 1]);
      match = joinRegex.exec(input);
    }
    return results;
  }
}
