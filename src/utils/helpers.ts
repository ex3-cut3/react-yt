export const fixSpecialCharsInText = (str: string) => {
    return str
        .replace('&#39;', '\'')
        .replace('&amp;', '&')
        .replace('&quot;', '"');
}

export function formatSubsCount(count: string) {
    if(!count) return;
    const formatter = Intl.NumberFormat('en-US', {
        notation: 'compact'
    });

    return `${formatter.format(+count)}+`;
}

export function validateLength(length: number, str: string){
    return str.length >= length;
}

export function validateIfWordAndLength(length: number){
    return (str: string) => validateLength(length, str) && /^[a-zA-Z]+$/.test(str);
}
