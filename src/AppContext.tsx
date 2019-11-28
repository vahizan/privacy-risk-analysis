import * as React from "react";
import {PersonAccordionData} from "./Constants";

export default React.createContext({
    data: [
        {
            id: 23,
            first_name: "Pearl",
            last_name: "Mendoza",
            age: 65,
            nationality: "Bahrain",
            risk_percentage: 39
        },
    ],
    updateData: (newData: Array<PersonAccordionData>): void => {},
    isSubmitButtonClicked: false,
    setSubmitClickValue: (isClicked: boolean) => {}
});
