export interface NumberValidatorActions {
    isNumber(stringNumber: string, numberType: NumberType): boolean
}

export enum NumberType {
    Currency = 1,
    Decimal = 2,
    Int = 3,
    APR = 4
}

export class NumberValidator implements NumberValidatorActions {
    private _isCurrency: RegExp
    private _isDecimal: RegExp
    private _isInt: RegExp

    constructor() {
        
        this._isCurrency = /^\d+(\.)?\d{0,2}$/
        this._isDecimal = /^\d*(\.)?(\d+)?$/
        this._isInt = /^[0-9]+$/
        
    }

    public isNumber(stringNumber: string, numberType: NumberType): boolean {
        if(typeof stringNumber === 'string' && stringNumber.length > 0) {
            if(numberType === NumberType.Decimal) {
                return this._isDecimal.test(stringNumber)
            } else if(numberType === NumberType.Currency) {
                return this._isCurrency.test(stringNumber)
            }else if(numberType === NumberType.Int) {
                return this._isInt.test(stringNumber)
            } else if(numberType === NumberType.APR) {
                const inDecimalForm = this.isNumber(stringNumber, NumberType.Decimal)
                if(inDecimalForm === false) {
                    return false
                }
                const asNumber = parseFloat(stringNumber)
                return inDecimalForm && asNumber >= 0 && asNumber <= 1
            }
        }
        return false
    }
}