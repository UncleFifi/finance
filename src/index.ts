import Finance from 'tvm-financejs'

import { 
    IDOMElements, 
    IFinanceValues, 
    ITVMElements, 
} from './contracts'

import {
    currencyRound, 
    getElement, 
    getInputElement,
    USDformatter
} from './HelperMethods'

import { 
    NumberValidator, 
    NumberValidatorActions,
    NumberType
} from './NumberValidator'

import TableActions, {
    IRowData
} from './Table'

// Should only have one
const finance = new Finance()

class Application {

    // ATTRIBUTES
    private numberValidationService: NumberValidatorActions
    private DOMElements: IDOMElements
    private FinanceElements: ITVMElements
    private FinanceValues: IFinanceValues

    constructor()
    {
        this.numberValidationService = new NumberValidator()

        this.DOMElements = {
            submitButton:   getElement('submit'),
            pmtButton:      getElement('calc-pmt')
        }

        this.FinanceElements = {
            pv:             getInputElement('pv'),
            rate:           getInputElement('rate'),
            time:           getInputElement('time'),
            pmt:            getInputElement('pmt')
        }

        this.FinanceValues = {
            // pmt:    0,
            pv:     0,
            rate:   0,
            time:   30
        }

        this._addEventListeners()

        // Binding the HTML
        // this.FinanceElements.pv.setAttribute('value', (Math.abs(this.FinanceValues.pv)).toString())
        // this.FinanceElements.rate.setAttribute('value', (this.FinanceValues.rate).toString())
        this.FinanceElements.time.setAttribute('value', this.FinanceValues.time.toString())
        // this.FinanceElements.pmt.setAttribute('value', this.FinanceValues.pmt.toString())

    }

    get pmt()
    {
        const { pv, rate, time } = this.FinanceValues
        const Terms = time * 12
        return finance.PMT(rate/12, Terms, -pv, 0)
    }

    private _getTableData() {

        const {
            pv,
            rate,
            time
        } = this.FinanceValues
        
        const Terms =       time * 12
        const PMT =         this.pmt

        
        const tableData: Array<IRowData> = []

        let i = 0
        let BBal = pv

        while(i < Terms) {
            i++
            let Interest =      BBal * (rate/12)
            let Principal =     PMT - Interest
            let Balance =       BBal - Principal
            BBal = Balance
            tableData.push({
                Balance: USDformatter.format(Balance),
                Interest: USDformatter.format(Interest),
                Principal: USDformatter.format(Principal)
            })

        }

        return tableData
    }



    private _addEventListeners() {
        
        this.DOMElements.submitButton.addEventListener('click', () => {
            TableActions.showTable()
            // Should also build the table from list of values or something...
            const tableDAT = this._getTableData()
            TableActions.renderNewTable(tableDAT)
        })

        this.DOMElements.pmtButton.addEventListener('click', () => {
            this.FinanceElements.pmt.setAttribute('value', USDformatter.format(this.pmt))
            // make Other button Appear...
            this.DOMElements.submitButton.classList.remove('no-display')
        })



        this._onChangeEvent(
            this.FinanceElements.pv, 
            (n: number) => this.FinanceValues.pv = n, 
            () => this.FinanceValues.pv,
            NumberType.Currency
        )

        this._onChangeEvent(
            this.FinanceElements.rate, 
            (n: number) => this.FinanceValues.rate = n, 
            () => this.FinanceValues.rate,
            NumberType.APR
        )

        this._onChangeEvent(
            this.FinanceElements.time, 
            (n: number) => this.FinanceValues.time = n, 
            () => this.FinanceValues.time,
            NumberType.Int
        )

    }

    private validateValuesForPMTButton()
    {
        const isValidPV = this.numberValidationService.isNumber(this.FinanceValues.pv.toString(), NumberType.Decimal) && this.FinanceValues.pv > 0
        if(isValidPV === false) {
            return
        }
        const isValidRate = this.numberValidationService.isNumber(this.FinanceValues.rate.toString(), NumberType.APR)  && this.FinanceValues.rate > 0
        if(isValidRate === false) {
            return
        }
        const isValidTime = this.numberValidationService.isNumber(this.FinanceValues.time.toString(), NumberType.Int) && this.FinanceValues.time > 0
        if(isValidTime === false) {
            return
        }
        return true
    }



    private _onChangeEvent(
        Element: HTMLInputElement, 
        changeFinanceValueCallBack: (n: number) => void,
        getLastValue: () => number,
        numberType: NumberType
    ) {

        Element.addEventListener("input", (event) => {
            const HTMLElement = event.target
            if(typeof HTMLElement === 'object' && HTMLElement !== null) {
                const value = (<HTMLInputElement>HTMLElement).value
                if(value === '') {
                    Element.value = value
                    changeFinanceValueCallBack(0)
                    return
                }

                
                if(this.numberValidationService.isNumber(value, numberType)) {
                    Element.value = value
                    changeFinanceValueCallBack(parseFloat(value))
                    
                    if(this.validateValuesForPMTButton()) {
                        this.DOMElements.pmtButton.classList.remove('disabled')
                    } else {
                        this.DOMElements.pmtButton.classList.add('disabled')
                    }

                } else {
                    Element.value = getLastValue().toString()
                }
            }
        })
    }
}


new Application()