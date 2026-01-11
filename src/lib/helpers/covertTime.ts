export const toDateInputValue = (value?: string) => {
    if (!value) return '';
    return value.split('T')[0].split(' ')[0];
};