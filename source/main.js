import { applyMiddleware, createStore } from 'redux';
import reducer from './model/reducer/CalilReducer.js'
import LibraryListViewController from './vc/list/LibraryListViewController.js'

// setup redux. put global
const store = createStore(reducer);
window.store = store;

// createView
var appDom = document.getElementById("app");
var libraryListViewController = new LibraryListViewController();
appDom.appendChild(libraryListViewController.view());
