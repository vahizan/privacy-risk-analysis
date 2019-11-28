import * as React from "react";
import './HeaderStatistic.css';
type Props = {
    title: string,
    statValue: number,
};
export const HeaderStatistic = (props : Props) => {
    return (
        <div className="header-statistic">
            <div className="header-statistic__value"> {props.statValue} </div>
            <h1>{props.title}</h1>
        </div>
    );
};
