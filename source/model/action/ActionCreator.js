import {LibraryListLoadAction, LibraryListFailLoadAction, LibraryListLoadedAction} from './actions/Actions.js'
import Library from '../entity/Library.js'
import superagent from 'superagent'
import superagentJsonp from 'superagent-jsonp'
import config from '../../config.js'

class ActionCreators{

  static loadLibraries(prefName="秋田県") {

    var params = { appkey: config.API_KEY, pref: prefName, format: "json", callback: "f" };

    return new Promise((resolve, reject) => {
      superagent.get(config.API_LIBRARY).query(params).use(superagentJsonp({timeout: 1000}))
      .end(function(err, res){

        // error
        if(err != null){
          let errorAction = Object.assign(LibraryListFailLoadAction)
          resolve(errorAction)
          return;
        }

        var list = res.body
        // wrong dictionary
        if (list == null){
          let errorAction = Object.assign(LibraryListFailLoadAction)
          resolve(errorAction)
          return;
        }

        // success
        var libraryList = Library.createList(list)
        var loadedAction = Object.assign(LibraryListLoadedAction)
        loadedAction.libraryList = libraryList

        // 時間かかっているてい
        setTimeout(function(){
          resolve(loadedAction)
        }, 1000)

      })
    })

  }

  static loadLibrariesAction(){
      return Object.assign(LibraryListLoadAction)
  }

}

export default ActionCreators
