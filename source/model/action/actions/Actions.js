let LibraryListLoadAction = {
  type: "LibraryListLoadAction"
}

let LibraryListFailLoadAction = {
  type: "LibraryListFailLoadAction"
}

let LibraryListLoadedAction = {
  type : "LibraryListLoadedAction"
  , libraryList: []
}

export {LibraryListLoadAction, LibraryListFailLoadAction, LibraryListLoadedAction};
