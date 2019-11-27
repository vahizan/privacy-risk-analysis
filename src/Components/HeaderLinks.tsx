import * as React from "react";
import './header/HeaderLinks.css';

type Props = {
    children?: any,
};
export const HeaderLinks = (props : Props) => {
    return (
        <nav className="header-links">
            {props.children}
        </nav>
    );
};
