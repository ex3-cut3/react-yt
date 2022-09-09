export const useLocalStorage = (itemName: string) => {
    const item = localStorage.getItem(itemName);
    return item;
}
