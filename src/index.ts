import Finance from 'tvm-financejs'
const finance = new Finance()

interface IDOMElements {
    pv: HTMLElement
    rate: HTMLElement
    time: HTMLElement
    pmt: HTMLElement
}

interface IFinanceValues {
    pv: number
    rate: number
    time: number
    pmt: number
}


function currencyRound(unroundedValue: number) {
    return parseFloat(unroundedValue.toFixed(2))
}



class Application {
    private DOMElements: IDOMElements
    private FinanceValues: IFinanceValues
    constructor()
    {
        this.DOMElements = {
            pv: document.getElementById('pv') as HTMLElement,
            rate: document.getElementById('rate') as HTMLElement,
            time: document.getElementById('time') as HTMLElement,
            pmt: document.getElementById('pmt') as HTMLElement
        }

        const APR = 0.0425
        const Years = 30
        const Mortgage = -260000
        const PMT = currencyRound(finance.PMT(APR/12, Years*12, Mortgage, 0))

        this.FinanceValues = {
            pv: Mortgage,
            rate: APR,
            time: Years,
            pmt: PMT
        }

        this._bindHTML()

    }


    private _bindHTML(){
        this.DOMElements.pv?.setAttribute('value', (Math.abs(this.FinanceValues.pv)).toString())
        this.DOMElements.rate?.setAttribute('value', (this.FinanceValues.rate*100).toString())
        this.DOMElements.time?.setAttribute('value', this.FinanceValues.time.toString())
        this.DOMElements.pmt?.setAttribute('value', this.FinanceValues.pmt.toString())
    }

}


new Application()