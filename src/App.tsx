import React, {useEffect, useState} from 'react';
import AppContext from "./AppContext";

import {HeaderStatistic} from "./Components/header/HeaderStatistic";
import {FooterContainer} from "./Components/FooterContainer";
import {AccordionList} from "./Components/AccordionList";
import {AccordionType} from "./Constants";
import {PersonField} from "./Components/PersonField";

import './App.css';

const TITLE = 'Privitar Privacy Protector';
const LOADING_TEXT = 'Loading...';

export const App = () => {
      const [isClicked, updateClicked] = useState(false);
      const [isLoading, setLoading] = useState(true);
      const [personData, updatePersonData] = useState([
          {
              id: 23,
              first_name: "Pearl",
              last_name: "Mendoza",
              age: 65,
              nationality: "Bahrain",
              risk_percentage: 39
          },
          {
              id: 24,
              first_name: "Wing",
              last_name: "Glass",
              age: 54,
              nationality: "Iran",
              risk_percentage: 68
          },
          {
              id: 25,
              first_name: "Rudyard",
              last_name: "Hubbard",
              age: 2,
              nationality: "Rwanda",
              risk_percentage: 75
          }]);

    useEffect( () => {
        fetch( process.env.REACT_APP_FETCH_URL || '', {
            method: 'GET',
            headers: {
                'x-api-key': process.env.REACT_APP_API_KEY || '',
            }
        })
            .then(response => response.json())
            .then(data => updatePersonData(data.body.people))
            .finally(() => setLoading(false))
            .catch(err =>  setLoading(false));

    }, []);
      const store = {
          data: personData,
          isSubmitButtonClicked: isClicked,
          updateData: updatePersonData,
          setSubmitClickValue: updateClicked,
      };

      const buttonClick = (event: any) => {
          event.preventDefault();
          if(event && event.target && event.type === 'click'){
              updateClicked(true);
          }
      };
    return (
          <div className="app">
              <header className="app__header">
                 <div className="app__header--left">
                   <h1 className="app__header__title">{TITLE}</h1>
                 </div>
                 <div className="app__header--right">
                     {!isLoading && <HeaderStatistic title="people protected" statValue={personData.length}/>}
                 </div>
              </header>
              <div className="app__content-wrapper">
              <div className="app__content">
                  {isLoading
                      ? <div className="app__loading"> {LOADING_TEXT} </div>
                      : (
                          <AppContext.Provider value={store}>
                              <AccordionList accordionType={AccordionType.Person} data={store.data}/>
                              <PersonField formId="new-person"/>
                              <button className="app__submit-button" data-cy="new-person-form-submit-button" onClick={buttonClick}>Add Person(s)</button>
                          </AppContext.Provider>
                      )
                  }
              </div>
              </div>
              <div className="app__footer">
                 <FooterContainer title="Privitar"/>
              </div>
          </div>
      );
};

export default App;
