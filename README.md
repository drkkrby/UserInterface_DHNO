# Welcome to the **User Interface for District Heating Network Operators** project!

Our product, **User Interface for District Heating Network Operators**, was designed to allow the operators of the district heating networks to interact with the _optimization_ and _simulation_ algorithms that our client, Flex Technologies is working on. The two types of users, namely the _grid operators_ and the _electricity traders_, can select to view their own pages after running the application. <br><br> The grid operators can see the _real_ and _forecasted_ values for _heat demand_ and _outside temperature_ for a selected _date_, then run the _optimizer_ to come up with optimized plans for the _outlet temperature_, _mass flow rate_, _electricity production_ and _inlet temperature_ for a selected Combined Heat and Power (CHP) unit. They can then choose to _tweak_ the plan for the _outlet temperature_ and run the simulator to come up with simulated plans for the other three parameters. <br><br> The electricity traders can see that there are two different markets, namely the _day ahead_ and the _intraday_ markets. The former one shows the _forecasted_ values for _heat demand_, _outside temperature_ and _price estimate_ for a selected _date_. They can then run the _optimizer_ to come up with an optimized _electricity production_ plan. The latter market displays the _electricity production_ plan for the selected day, given in 15 minute intervals. The user can choose to _edit_ the plan and _check_ its _feasibility_.

## Description of project

**User Interface for District Heating Network Operators** is developed by students from **TU Delft** to make the interaction with the optimizer algorithms that our client is working on, as intuitive as possible. We have used **Vue 3 with Vuetify**, and **Typescript** for _scripting_ and _designing_. It was built **modular** such that it can be extended with extra functionalities and components later, and has a mocked API, thus the integration with the backend algorithms should be easier.

Our project has successfully reached a working version with all required features implemented, but there are of course a lot that can be added or improved upon. So take it out for a spin and let us know how we can make it a better, more intuitive application!

## How to run it

First, **clone** the repository or **download** the source code. Then open the repository in your preferred **IDE** and **build the project** by running 
``` 
npm install 
``` 
in your terminal. Once the project's build is done, you can then run 
```
npm run dev
``` 
to run the application. The terminal will show you the **port** that the application is running on, so you can just open your preferred **web browser** and go to _http://localhost:portNumberHere_. The application should be right before you, at the home page.

## How to contribute to it
The main purpose of this repository is to present our product and continue improving it. We want to make contributing to this project as easy and transparent as possible, and we are grateful to the community for contributing bug fixes and improvements. Read below to learn how you can take part in improving UI_DHNO.

### [Code of Conduct](CODE_OF_CONDUCT.md)
We have adopted a Code of Conduct that we expect project participants to adhere to. Please read the [full text](CODE_OF_CONDUCT.md) so that you can understand what actions will and will not be tolerated.

There are many ways in which you can participate in the project, for example:
- Submit bugs and issues, and help us verify as they are checked in
- Review source code changes
- Review the documentation and make merge requests for anything from typos to new content

If you are interested in fixing issues and contributing directly to the code base, please read the **Contribution Guidelines** down below:

### Contribution Guidelines

Please ensure your merge request adheres to the following guidelines:

- Alphabetize your entry.
- Search previous merge requests before adding a new one, as yours may be a duplicate.
- Suggested READMEs should be beautiful or stand out in some way.
- Make an individual merge request for each suggestion.
- New categories, or improvements to the existing categorization are welcome.
- Keep descriptions short and simple, but descriptive.
- Start the description with a capital and end with a full stop/period.
- Check your spelling and grammar.
- Make sure your text editor is set to remove trailing whitespace.
- Test your code! Tests help us prevent regressions from being introduced to the codebase.

Thank you for your suggestions!
