import {LibraryListLoadAction, LibraryListFailLoadAction, LibraryListLoadedAction} from './actions/Actions.js'
import Library from '../entity/Library.js'
import superagent from 'superagent'
import superagentJsonp from 'superagent-jsonp'
import config from '../../config.js'

class ActionCreator{

  static loadLibraries(prefName="秋田県"){
    return function (dispatch) {
      return ActionCreator._loadLibraries(prefName).then(
        libraryList => {
          var loadedAction = Object.assign(LibraryListLoadedAction)
          loadedAction.libraryList = libraryList
          dispatch(loadedAction)
        },
        error => {
          let errorAction = Object.assign(LibraryListFailLoadAction)
          dispatch(errorAction)
        }
      );
    };
  }

  static _loadLibraries(prefName) {

    var params = { appkey: config.API_KEY, pref: prefName, format: "json", callback: "f" };

    return new Promise((resolve, reject) => {
      superagent.get(config.API_LIBRARY).query(params).use(superagentJsonp({timeout: 1000}))
      .end(function(err, res){

        // error
        if(err != null){
          reject()
          return;
        }

        var list = res.body
        // wrong dictionary
        if (list == null){
          reject()
          return;
        }

        // success
        var libraryList = Library.createList(list)

        // 時間かかっているてい
        setTimeout(function(){
          resolve(libraryList)
        }, 1000)

      })
    })

  }

  static loadLibrariesAction(){
      return Object.assign(LibraryListLoadAction)
  }

}

export default ActionCreator
