import { useState } from 'react';

function useInput(validateFn: (value: string) => boolean) {
    const [ inputData, setInputData ] = useState<InputData>({value: '', isValid: false, isTouched: false, errorMessages: []});

    function handleValueChange(e: any) {
        setInputData({...inputData, value: e.target.value, isTouched: false});
    }

    function handleValueBlur(e: any) {
        console.log('blur')
        setInputData({...inputData, isTouched: true, isValid: validateFn(e.target.value)});
    }

    return {
        inputData,
        setInputData,
        shouldShowError: inputData.isTouched && !inputData.isValid,
        handleValueChange,
        handleValueBlur
    }
}
export default useInput;

export interface InputData {
    value: string,
    isValid: boolean,
    isTouched: boolean,
    errorMessages: string[],
}
