"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tvm_financejs_1 = __importDefault(require("tvm-financejs"));
var HelperMethods_1 = require("./HelperMethods");
var NumberValidator_1 = require("./NumberValidator");
var Table_1 = __importDefault(require("./Table"));
var finance = new tvm_financejs_1.default();
var defaultValues = {
    pv: 260000,
    rate: 0.0425,
    time: 30,
    pmt: HelperMethods_1.currencyRound(finance.PMT(0.0425 / 12, 30 * 12, -260000, 0))
};
var sampleTableData = [
    {
        Balance: "1000",
        Interest: "800",
        Principal: "200"
    },
    {
        Balance: "1000",
        Interest: "800",
        Principal: "200"
    },
    {
        Balance: "1000",
        Interest: "800",
        Principal: "200"
    },
    {
        Balance: "1000",
        Interest: "800",
        Principal: "200"
    },
    {
        Balance: "1000",
        Interest: "800",
        Principal: "200"
    },
    {
        Balance: "1000",
        Interest: "800",
        Principal: "200"
    },
];
var Application = /** @class */ (function () {
    function Application() {
        this.numberValidationService = new NumberValidator_1.NumberValidator();
        this.DOMElements = {
            submitButton: HelperMethods_1.getElement('submit')
        };
        this.FinanceElements = {
            pv: HelperMethods_1.getInputElement('pv'),
            rate: HelperMethods_1.getInputElement('rate'),
            time: HelperMethods_1.getInputElement('time'),
            pmt: HelperMethods_1.getInputElement('pmt')
        };
        this.FinanceValues = __assign({}, defaultValues);
        this._addEventListeners();
        this._bindHTML();
    }
    Application.prototype._addEventListeners = function () {
        var _this = this;
        this.DOMElements.submitButton.addEventListener('click', function () {
            Table_1.default.showTable();
            // Should also build the table from list of values or something....
            Table_1.default.render(sampleTableData);
        });
        this._onChangeEvent(this.FinanceElements.pmt, function (n) { return _this.FinanceValues.pmt = n; }, function () { return _this.FinanceValues.pmt; }, function (stringValue) { return _this.numberValidationService.isNumber(stringValue, NumberValidator_1.NumberType.Currency); });
        this._onChangeEvent(this.FinanceElements.pv, function (n) { return _this.FinanceValues.pv = n; }, function () { return _this.FinanceValues.pv; }, function (stringValue) { return _this.numberValidationService.isNumber(stringValue, NumberValidator_1.NumberType.Currency); });
        this._onChangeEvent(this.FinanceElements.rate, function (n) { return _this.FinanceValues.rate = n; }, function () { return _this.FinanceValues.rate; }, function (stringValue) { return _this.numberValidationService.isNumber(stringValue, NumberValidator_1.NumberType.Decimal); });
        this._onChangeEvent(this.FinanceElements.time, function (n) { return _this.FinanceValues.time = n; }, function () { return _this.FinanceValues.time; }, function (stringValue) { return _this.numberValidationService.isNumber(stringValue, NumberValidator_1.NumberType.Decimal); });
    };
    Application.prototype._onChangeEvent = function (Element, changeFinanceValueCallBack, getLastValue, isValidNumber) {
        Element.addEventListener("input", function (event) {
            var HTMLElement = event.target;
            if (typeof HTMLElement === 'object' && HTMLElement !== null) {
                var _inputElement = HTMLElement;
                var value = _inputElement.value;
                if (value === '') {
                    Element.value = value;
                    changeFinanceValueCallBack(0);
                    return;
                }
                if (isValidNumber(value)) {
                    Element.value = value;
                    changeFinanceValueCallBack(parseFloat(value));
                }
                else {
                    Element.value = getLastValue().toString();
                }
            }
        });
    };
    Application.prototype._bindHTML = function () {
        this.FinanceElements.pv.setAttribute('value', (Math.abs(this.FinanceValues.pv)).toString());
        this.FinanceElements.rate.setAttribute('value', (this.FinanceValues.rate * 100).toString());
        this.FinanceElements.time.setAttribute('value', this.FinanceValues.time.toString());
        this.FinanceElements.pmt.setAttribute('value', this.FinanceValues.pmt.toString());
    };
    return Application;
}());
new Application();
//# sourceMappingURL=index.js.map