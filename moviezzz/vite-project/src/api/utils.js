export function filterItems(items, query) {
  if (items.length === 0) {
    return [];
  }
  query = query.toLowerCase();
  return items.filter(item =>
    item.title.split(' ').some(word =>
      word.toLowerCase().startsWith(query)
    )
  );
}
