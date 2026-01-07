import { YEAR_OPTIONS } from "../globals.js";

export const getYearsList = () => Array.from(
    { length: YEAR_OPTIONS.CURRENT_YEAR - YEAR_OPTIONS.START_YEAR + 1 },
    (_, year) => YEAR_OPTIONS.START_YEAR + year
).reverse();


export const filterItemsByStartsWith = (items, query) => {
    query = query.toLowerCase();

    return items.filter(item =>
        item.title.toLowerCase().split(' ').some(word =>
            word.startsWith(query)
        )
    );
}