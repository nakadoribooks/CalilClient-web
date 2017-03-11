class LibraryCell {

  constructor() {
    var view = document.createElement("li")
    this._view = view
  }

  view(){
    return this._view
  }

  reload(library){
    this._library = library
    this._view.innerHTML = library.name()
  }

}

export default LibraryCell
