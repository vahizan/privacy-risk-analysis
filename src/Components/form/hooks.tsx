import {useEffect} from "react";

export const  useEventListener = (eventName: string, handler: any, element = window) =>{
    useEffect(
        () => {
            if (!(element && element.addEventListener)) return;
            const eventListener = (event : Event) => handler(event);
            element.addEventListener(eventName, eventListener);
            return () => {
                element.removeEventListener(eventName, eventListener);
            };
        },
        [eventName,handler,element]
    );
};
