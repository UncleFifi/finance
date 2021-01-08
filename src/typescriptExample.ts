interface IPerson {
    first: string
    last: string
    age: {
        unit: "months" | "years"
        value: number
    }
}


const FerreiraFamily: Array<IPerson> = [
    {
        first: "Felipe",
        last: 'Ferreira',
        age: {
            unit: 'years',
            value: 31
        }
    },
    {
        first: "Rebecca",
        last: 'Amos',
        age: {
            unit: 'years',
            value: 31
        }
    },
    {
        first: "Arya",
        last: 'Ferreira',
        age: {
            unit: 'months',
            value: 6
        }
    }
]


export const logLastPerson = () => console.log(FerreiraFamily[2].first)