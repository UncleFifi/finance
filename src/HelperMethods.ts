export function currencyRound(unroundedValue: number) {
    return parseFloat(unroundedValue.toFixed(2))
}

export function getElement(id: string) {
    return document.getElementById(id) as HTMLElement
}

export function getInputElement(id: string) {
    return getElement(id) as HTMLInputElement
}