import fs from "fs/promises";

export async function readJSON(filePath) {
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading JSON file:", err);
    throw err;
  }
}

export async function writeJSON(filePath, data) {
  try {
    const json = JSON.stringify(data, null, 2);
    await fs.writeFile(filePath, json, "utf-8");
  } catch (err) {
    console.error("Error writing JSON file:", err);
  }
}

export function filterItemsByStartsWith(items, query) {
  query = query.toLowerCase();
  return items.filter(item =>
    item.name.split(' ').some(word =>
      word.toLowerCase().startsWith(query)
    )
  );
}

export function filterItemsByChars(items, chars) {
  return items.filter(item => item.title.toLowerCase().includes(chars.toLowerCase()));
}

