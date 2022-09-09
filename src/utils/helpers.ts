export const fixSpecialCharsInText = (str: string) => {
    return str
        .replace('&#39;', '\'')
        .replace('&amp;', '&')
        .replace('&quot;', '"');
}

export function formatSubsCount(count: string) {
    if(!count) return;
    const len = count.length;
    let countTrimmed = Number(count);
    let postfixOfAmount = 'm';
    if (len <= 3) {
        postfixOfAmount='';
    } else if (len <= 5) {
        countTrimmed /= 1000;
        postfixOfAmount = 'k';
    } else if (len === 6) {
        countTrimmed /= 100000;
    } else {
        countTrimmed /= 1000000;
    }

    return `${postfixOfAmount==='m' ? countTrimmed.toFixed(1) : countTrimmed}${postfixOfAmount}+`;
}
