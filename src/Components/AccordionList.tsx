import * as React from "react";
import './footer/FooterContainer.css';
import {AccordionType, PersonAccordionData} from "../Constants";
import {PersonAccordion} from "./PersonAccordion";
import {useContext, useState} from "react";
import {AccordionContext} from "./accordion/Context";

import AppContext from "../AppContext";

import './accordion/AccordionList.css';

type Props = {
    accordionType: AccordionType,
    data: Array<PersonAccordionData>,
};
export const AccordionList = (props : Props) => {
    const [selectedId, setSelectedId] = useState();
    const store = {
        id: selectedId,
        setId: setSelectedId,
    };
    const personDataContext = useContext(AppContext);
    return (
        <div className="accordion-list">
            <AccordionContext.Provider value={store}>
                {
                    personDataContext.data.map((data, i) => (<PersonAccordion key={i} data={data}/>))
                }
            </AccordionContext.Provider>
        </div>
    );
};
