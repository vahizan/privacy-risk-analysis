import * as React from "react";
import {PersonAccordionInterface} from "./Components/accordion/Constants";

export default React.createContext({
    data: [
        {
            "id": 23,
            "first_name": "Pearl",
            "last_name": "Mendoza",
            "age": 65,
            "nationality": "Bahrain",
            "risk_percentage": 39
        },
    ],
    updateData: (newData: Array<PersonAccordionInterface>): void => {},
    isSubmitButtonClicked: false,
    setSubmitClickValue: (isClicked: boolean) => {}
});
