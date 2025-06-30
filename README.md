## Task Management Full-Stack application

### Notes on the Implementation

#### I have built the app from scratch using React + Vite for the Front-End, Node + Express for the Back-End and Firebase Firestore for storing the tasks information

#### The app features the possibility to:

##### 1. authenticate (mocked process)

##### 2. add tasks

##### 3. edit tasks

##### 4. assign tasks to users

##### 5. mark tasks as complete/incomplete

##### 6. visually showcase the state of the tasks

#### Architecture

##### 1. For the Front-End I have done the following:

##### - I have used state management for the tasks and the authentication system, by leveraging the React Context functionality

##### - I have also used useState to set the state locally inside components

##### - I have used the useNavigate hook to redirect the user to a different page

##### - There is also the useEffect hook, which I have used for retrieving the data from the backend by calling the api route needed

##### 2. For the Back-End I have done the following:

##### - created api routes for the tasks

##### - validated the input that comes in from the front-end using middlewares

##### - integrated the firebase firestore database so that I can store and retrieve the data after I have manipulated it
