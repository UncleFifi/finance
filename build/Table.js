"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HelperMethods_1 = require("./HelperMethods");
var FinancialTable = /** @class */ (function () {
    function FinancialTable() {
        this.tableBody = HelperMethods_1.getElement('tbl-body');
        this.table = HelperMethods_1.getElement('table');
    }
    FinancialTable.prototype.showTable = function () {
        this.table.classList.remove('no-display');
    };
    FinancialTable.prototype._clearTable = function () {
        Array.from(this.tableBody.children).forEach(function (row) { return row.remove(); });
    };
    FinancialTable.prototype._createTableData = function (value) {
        var td = document.createElement("td");
        td.innerText = value;
        return td;
    };
    FinancialTable.prototype._createTableRow = function (rowData, index) {
        var Balance = rowData.Balance, Interest = rowData.Interest, Principal = rowData.Principal;
        var tr = document.createElement('tr');
        tr.append(this._createTableData((index + 1).toString()));
        tr.append(this._createTableData(Balance));
        tr.append(this._createTableData(Interest));
        tr.append(this._createTableData(Principal));
        this.table.append(tr);
    };
    FinancialTable.prototype.render = function (data) {
        var _this = this;
        this._clearTable();
        data.map(function (r, i) { return _this._createTableRow(r, i); });
    };
    return FinancialTable;
}());
exports.default = new FinancialTable();
//# sourceMappingURL=Table.js.map