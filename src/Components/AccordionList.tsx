import * as React from "react";
import './footer/FooterContainer.css';
import {AccordionType, PersonAccordionInterface} from "./accordion/Constants";
import {PersonAccordion} from "./PersonAccordion";
import {useState} from "react";
import {AccordionContext} from "./accordion/Context";

type Props = {
    accordionType: AccordionType,
    data: Array<PersonAccordionInterface>,
};
export const AccordionList = (props : Props) => {
    const data1 = {
        id: 23,
        first_name: 'Pearl',
        last_name: 'Mendoza',
        age: 65,
        nationality: 'Bahrain',
        risk_percentage: 39
    };
    const data2 = {
        id: 24,
        first_name: 'Wing',
        last_name: 'Glass',
        age: 54,
        nationality: 'Iran',
        risk_percentage: 68
    };
    const data3 = {
        id: 25,
        first_name: 'Rudyard',
        last_name: 'Hubbard',
        age: 2,
        nationality: 'Rwanda',
        risk_percentage: 75
    };
    const [selectedId, setSelectedId] = useState();
    const store = {
        id: selectedId,
        setId: setSelectedId,
    };
    return (
        <div className="accordion-list">
            <AccordionContext.Provider value={store}>
                <PersonAccordion data={data1}/>
                <PersonAccordion data={data2}/>
                <PersonAccordion data={data3}/>
            </AccordionContext.Provider>
        </div>
    );
};
