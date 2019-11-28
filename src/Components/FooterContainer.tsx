import * as React from "react";
import './footer/FooterContainer.css';

type Props = {
    title: string,
    copyright_info?: string,
    children?: any,
};
const copyrightSymbol = '©';
const currentYear = new Date(Date.now()).getFullYear();
export const FooterContainer = (props : Props) => {
    return (
        <footer className="footer-container">
            <div className="footer-container__title-wrapper">
                <div className="footer-container__title-wrapper__copyright-info">{copyrightSymbol}</div>
                <h1 className="footer-container__title-wrapper__title">{props.title}</h1>
                <div className="footer-container__title-wrapper__date">{currentYear}</div>
            </div>
            <div className="footer-container__links">
                {props.children}
            </div>
        </footer>
    );
};
