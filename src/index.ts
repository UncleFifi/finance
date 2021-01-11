import Finance from 'tvm-financejs'
import { 
    IDOMElements, 
    IFinanceValues, 
    ITVMElements, 
} from './contracts'
import {
    currencyRound, 
    getElement, 
    getInputElement
} from './HelperMethods'
import { 
    NumberValidator, 
    NumberValidatorActions,
    NumberType
} from './NumberValidator'
import TableActions, {
    IRowData
} from './Table'


const finance = new Finance()
const defaultValues: IFinanceValues = {
    pv: 260000,
    rate: 0.0425,
    time: 30,
    pmt: currencyRound(finance.PMT(0.0425/12, 30*12, -260000, 0))
}

const sampleTableData: Array<IRowData> = [
    {
        Balance: "1000",
        Interest: "800",
        Principal: "200"
    },
    {
        Balance: "1000",
        Interest: "800",
        Principal: "200"
    }
]


class Application {

    private numberValidationService: NumberValidatorActions
    private DOMElements: IDOMElements
    private FinanceElements: ITVMElements
    private FinanceValues: IFinanceValues

    constructor()
    {
        this.numberValidationService = new NumberValidator()

        this.DOMElements = {
            submitButton:   getElement('submit')
        }

        this.FinanceElements = {
            pv:             getInputElement('pv'),
            rate:           getInputElement('rate'),
            time:           getInputElement('time'),
            pmt:            getInputElement('pmt')
        }

        this.FinanceValues = {...defaultValues}

        this._addEventListeners()
        this._bindHTML()

    }

    private _addEventListeners() {
        
        this.DOMElements.submitButton.addEventListener('click', () => {

            TableActions.showTable()
            // Should also build the table from list of values or something....
            TableActions.renderNewTable(sampleTableData)

        })


        this._onChangeEvent(
            this.FinanceElements.pmt, 
            (n: number) => this.FinanceValues.pmt = n, 
            () => this.FinanceValues.pmt,
            (stringValue: string) => this.numberValidationService.isNumber(stringValue, NumberType.Currency)
        )

        this._onChangeEvent(
            this.FinanceElements.pv, 
            (n: number) => this.FinanceValues.pv = n, 
            () => this.FinanceValues.pv,
            (stringValue: string) => this.numberValidationService.isNumber(stringValue, NumberType.Currency)
        )

        this._onChangeEvent(
            this.FinanceElements.rate, 
            (n: number) => this.FinanceValues.rate = n, 
            () => this.FinanceValues.rate,
            (stringValue: string) => this.numberValidationService.isNumber(stringValue, NumberType.Decimal)
        )

        this._onChangeEvent(
            this.FinanceElements.time, 
            (n: number) => this.FinanceValues.time = n, 
            () => this.FinanceValues.time,
            (stringValue: string) => this.numberValidationService.isNumber(stringValue, NumberType.Decimal)
        )

    }



    private _onChangeEvent(
        Element: HTMLInputElement, 
        changeFinanceValueCallBack: (n: number) => void,
        getLastValue: () => number,
        isValidNumber: (stringNumber: string) => boolean
    ) {

        Element.addEventListener("input", (event) => {
            const HTMLElement = event.target
            if(typeof HTMLElement === 'object' && HTMLElement !== null) {

                const _inputElement = <HTMLInputElement>HTMLElement
                const value = _inputElement.value

                if(value === '') {
                    Element.value = value
                    changeFinanceValueCallBack(0)
                    return
                }

                if(isValidNumber(value)) {
                    Element.value = value
                    changeFinanceValueCallBack(parseFloat(value))
                } else {
                    Element.value = getLastValue().toString()
                }

            }
        })
    }


    private _bindHTML(){
        this.FinanceElements.pv.setAttribute('value', (Math.abs(this.FinanceValues.pv)).toString())
        this.FinanceElements.rate.setAttribute('value', (this.FinanceValues.rate*100).toString())
        this.FinanceElements.time.setAttribute('value', this.FinanceValues.time.toString())
        this.FinanceElements.pmt.setAttribute('value', this.FinanceValues.pmt.toString())
    }



}


new Application()