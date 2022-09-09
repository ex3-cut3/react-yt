import { useCallback } from 'react';

export function useDebounce(cb: Function, time: number) {
    let timer: NodeJS.Timeout | null;
    return useCallback(function (e: any) {
        if(timer) clearTimeout(timer);
        timer = setTimeout(() => {
            timer = null;
            cb(e);
        }, time)
    }, [])
}
