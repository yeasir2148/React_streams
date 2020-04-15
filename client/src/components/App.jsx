import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import  StreamCreate  from './streams/StreamCreate';
import  StreamDelete  from './streams/StreamDelete';
import  StreamEdit  from './streams/StreamEdit';
import  StreamList  from './streams/StreamList';
import  StreamShow  from './streams/StreamShow';
import Header from './Header';

import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from '../reducers';

let store = createStore(reducers, composeWithDevTools(
        applyMiddleware(thunk)
    )
);

const App = () => {
    return (
        <Provider store={store}> 
            <div className="ui container">
                <BrowserRouter>
                    <Header store={store}/>
                    <div>
                        <Route path="/" exact component={StreamList}></Route>
                        <Route path="/streams/new" exact component={StreamCreate}></Route>
                        <Route path="/streams/edit/:id" exact component={StreamEdit}></Route>
                        <Route path="/streams/delete" exact component={StreamDelete}></Route>
                        <Route path="/streams/show/:id" exact component={StreamShow}></Route>
                    </div>
                </BrowserRouter>
            </div>
        </Provider>        
    )
}

export default App;