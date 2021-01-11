export interface NumberValidatorActions {
    isNumber(stringNumber: string, numberType: NumberType): boolean
}

export enum NumberType {
    Currency = 1,
    Decimal = 2
}

export class NumberValidator implements NumberValidatorActions {
    private _isCurrency: RegExp
    private _isDecimal: RegExp

    constructor() {
        
        this._isCurrency = /^\d+(\.)?\d{0,2}$/
        this._isDecimal = /^\d*(\.)?(\d+)?$/
        
    }

    public isNumber(stringNumber: string, numberType: NumberType): boolean {
        if(typeof stringNumber === 'string' && stringNumber.length > 0) {
            if(numberType === NumberType.Decimal) {
                return this._isDecimal.test(stringNumber)
            } else if(numberType === NumberType.Currency) {
                return this._isCurrency.test(stringNumber)
            }
        }
        return false
    }
}