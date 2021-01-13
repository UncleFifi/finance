export interface IDOMElements {
    submitButton: HTMLElement
    pmtButton: HTMLElement
}

export interface IFinanceValues {
    pv:     number
    rate:   number
    time:   number
    // pmt:    number
}

export interface ITVMElements {
    pv:     HTMLInputElement
    rate:   HTMLInputElement
    time:   HTMLInputElement
    pmt:    HTMLInputElement
}