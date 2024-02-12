import Filter from 'bad-words';

const filter = new Filter();

export function allowedWord(str) {
  const profane = filter.isProfane(str);
  return !profane;
}