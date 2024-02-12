import Filter from "bad-words";

const filter = new Filter();
filter.addWords("rule 34");
filter.addWords("Rule 34");
filter.addWords("rule34");
filter.addWords("Rule34");
export function allowedWord(str) {
  const profane = filter.isProfane(str);
  return !profane;
}
