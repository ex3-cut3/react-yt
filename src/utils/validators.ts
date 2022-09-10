export function checkLength(str: string, minLength: number, maxLength: number=200){
    return str.length>=minLength&&str.length<=maxLength;
}

export function checkRequiredSymbols(str:string, regex: string){
    return str.match(regex)?.length;
}
