export const getCurrencySymbol = countryCode => {
    const currencies = {
        gb: '£',
        us: '$',
        at: '€',        
        au: '$',
        be: '€',
        br: 'R$',
        ca: '$',
        ch: 'Fr',
        de: '€',
        es: '€',
        fr: '€',
        in: '₹',
        it: '€',
        mx: '$',
        nl: '€',
        nz: '$',
        pl: 'zł',
        ru: '₽',
        sg: '$',
        za: 'R',
    }
    return currencies[countryCode];
}

export const extractFormData = form => Array.from(form.elements).reduce((acc, {id, value}) => ({ ...acc, [id]: value}), {});