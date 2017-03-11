import LibraryCell from './LibraryCell.js'
import ActionCreator from '../../model/action/ActionCreator.js'

class LibraryListViewController {

  constructor() {
    var view = document.createElement("div")
    var listView = document.createElement("ul")
    var headerView = document.createElement("div")
    var statusLabel = document.createElement("p")
    var button = document.createElement("button")
    button.appendChild(document.createTextNode("読み込む"))
    button.addEventListener("click", (event)=>{
      this._tapReload(event)
    }, false);

    listView.style.height = window.parent.screen.height + "px"
    listView.style.overflow = "auto"

    headerView.appendChild(statusLabel)
    headerView.appendChild(button)

    view.appendChild(headerView)
    view.appendChild(listView)

    // save property
    this._libraryList = []
    this._libraryCellList = []
    this._view = view
    this._listView = listView
    this._button = button
    this._statusLabel = statusLabel

    store.subscribe(() => {
      this._newState(store.getState())
    })

    this._dispatchLoadData();
  }

  _tapReload(event){
    console.log(event)
    console.log(this)
    this._dispatchLoadData()
  }

  _dispatchLoadData(){
    let action = ActionCreator.loadLibraries();
    store.dispatch(action);
  }

  _newState(state){
    console.log("onChangeStore")
    this._button.removeAttribute("disabled")

    // error
    if (state.errorMessage != null){
      console.log("error");
      this._statusLabel.innerHTML = '<span style="color:red">読み込み失敗</span>'
      return
    }

    // loading
    if(state.isLoading){
      console.log("loading")
      this._button.setAttribute("disabled", "disabled")
      this._statusLabel.innerHTML = '<span style="color:bray">読み込み中</span>'
      return
    }

    // loaded
    console.log("loaded")

    this._statusLabel.innerHTML = '<span style="color:blue">読み込み完了</span>'
    this._reloadListView(state.libraryList)
  }

  _reloadListView(libraryList){
    this._libraryList = libraryList

    // reloadListView
    let listView = this._listView
    let libraryCellList = this._libraryCellList
    for(var i=0,max=libraryCellList.length;i<max;i++){
      let cell = libraryCellList[i]
      listView.removeChild(cell.view())
    }
    this._libraryCellList = []

    for(var i=0,max=libraryList.length;i<max;i++){
      var library = libraryList[i]
      var cell = new LibraryCell()
      cell.reload(library)
      listView.appendChild(cell.view())
      this._libraryCellList.push(cell)
    }
  }

  // public

  view(){
    return this._view;
  }

}

export default LibraryListViewController;
