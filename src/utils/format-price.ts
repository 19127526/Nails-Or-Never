export const formatPrice = (price: number, currencyId: string): string => {
    switch (currencyId) {
        case 'BRL':
            return price.toFixed(2).replace('.', ',');
        default:
            return price.toFixed(2);
    }
};


export function isEmpty(obj : any) {
    for (const prop in obj) {
        if (Object.hasOwn(obj, prop)) {
            return false;
        }
    }

    return true;
}
