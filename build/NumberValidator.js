"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NumberType;
(function (NumberType) {
    NumberType[NumberType["Currency"] = 1] = "Currency";
    NumberType[NumberType["Decimal"] = 2] = "Decimal";
})(NumberType = exports.NumberType || (exports.NumberType = {}));
var NumberValidator = /** @class */ (function () {
    function NumberValidator() {
        this._isCurrency = /^\d+(\.)?\d{0,2}$/;
        this._isDecimal = /^\d*(\.)?(\d+)?$/;
    }
    NumberValidator.prototype.isNumber = function (stringNumber, numberType) {
        if (typeof stringNumber === 'string' && stringNumber.length > 0) {
            if (numberType === NumberType.Decimal) {
                return this._isDecimal.test(stringNumber);
            }
            else if (numberType === NumberType.Currency) {
                return this._isCurrency.test(stringNumber);
            }
        }
        return false;
    };
    return NumberValidator;
}());
exports.NumberValidator = NumberValidator;
//# sourceMappingURL=NumberValidator.js.map