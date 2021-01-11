"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function currencyRound(unroundedValue) {
    return parseFloat(unroundedValue.toFixed(2));
}
exports.currencyRound = currencyRound;
function getElement(id) {
    return document.getElementById(id);
}
exports.getElement = getElement;
function getInputElement(id) {
    return getElement(id);
}
exports.getInputElement = getInputElement;
//# sourceMappingURL=HelperMethods.js.map