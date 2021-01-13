import { getElement } from './HelperMethods'

export interface IRowData {
    Principal: string
    Interest: string
    Balance: string//Ending
}

class FinancialTable {
    private tableBody: HTMLElement
    private table: HTMLElement

    constructor(){
        this.tableBody = getElement('tbl-body')
        this.table = getElement('table')
    }

    public showTable() {
        this.table.classList.remove('no-display')
    }

    private _clearTable(){
        Array.from(this.tableBody.children).forEach(row => row.remove())
    }

    private _createTableData(value: string)
    {
        const td = document.createElement("td")
        td.innerText = value
        return td
    }

    private _createTableRow(rowData: IRowData, index: number) {

        const {
            Balance, 
            Interest,
            Principal
        } = rowData

        const tr = document.createElement('tr')
        tr.append(this._createTableData((index+1).toString()))
        tr.append(this._createTableData(Principal))
        tr.append(this._createTableData(Interest))
        tr.append(this._createTableData(Balance))
        this.tableBody.append(tr)

    }

    public renderNewTable(data: Array<IRowData>)
    {
        this._clearTable()
        data.map((r, i) => this._createTableRow(r, i))
    }

}


export default new FinancialTable()