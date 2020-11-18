import * as serviceWorker from './serviceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SamuraiJSAp from './App';
//import App from './App';
//import store from './redux/redux-store';
//import { BrowserRouter } from 'react-router-dom';
//import {Provider} from './StoreContext'; instead of writing by ourself. we import from library that has same code:
//import { Provider } from "react-redux"; //more or less same code is in StoreContext.

//let rerenderEntireTree = () => {
ReactDOM.render(
    <SamuraiJSAp/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

//we don't need subscribe and rerender when something is changed in state thanks to react-redux container:
//with help of function connect
//
//}
//rerenderEntireTree();
//store.subscribe(() => {    
//rerenderEntireTree();
//let state = store.getState();//перезаписывает новые данные вместо старых данных  
//});
//


//store.subscribe(rerenderEntireTree); замечает что произведено изменение данных( пользователь ввел текс)
//но нету запроса на изменение данных. решается с помощью анонимной функции: