export enum AccordionType {
    Person= "Person",
}

export interface PersonAccordionData{
    id: number,
    first_name: string,
    last_name: string,
    age: number,
    nationality: string,
    risk_percentage: number,
}
