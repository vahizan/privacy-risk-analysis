# loan-calculator


## Choices Made
- Using react - seemed like the right framework for the task.
- Using Typescript - helped with type checking - less unit tests needed to be written.
- Calculator.ts API - one source of truth - this file contains the most important functions used by the loan calculator
- Three view components will do 
    - NumberInput(for user input), 
    - LoanRepaymentsTable (to show repayments data)
    - App.ts (the main file).
- Jest and Enzyme for unit testing - easy to set up with create-react-app project


## What could've been done/improved

- Integration tests with Cypress
- Number rounding needs to be fixed - you will notice the last row, 'total', the numbers do not add up all the time
- Thorough error checking and fallback should've been implemented in some areas
- Testing App.ts - the only file I didn't have time to test
- Could've set up a CI pipeline with Travis CI - where linting and tests are run prior to a build, which in turn will be deployed to a server e.g netlify, surge, heroku, etc.
- Polishing CSS
