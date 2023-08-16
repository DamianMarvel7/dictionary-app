export const fetchData = async (word) => {
  const result = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );

  const json = await result.json();
  return json;
};
