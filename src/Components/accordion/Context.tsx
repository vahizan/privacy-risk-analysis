import * as React from "react";

export const AccordionContext = React.createContext({
    id: undefined,
    setId: (id: number): void => {},
});
