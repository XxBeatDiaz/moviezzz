import { YEAR_OPTIONS } from "../globals.js";

export const getYearsList = () => {
    const years = Array.from(
        { length: YEAR_OPTIONS.CURRENT_YEAR - YEAR_OPTIONS.START_YEAR + 1 },
        (_, year) => YEAR_OPTIONS.START_YEAR + year
    ).reverse();
    return years;
}

export const filterItems = (items, query) => {
    query = query.toLowerCase();

    return items.filter(item =>
        item.title.split(' ').some(word =>
            word.toLowerCase().startsWith(query)
        )
    );
}