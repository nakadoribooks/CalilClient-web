class Library{

  // static

  static createList(dicList){

    var result = [];

    for(var i=0,max=dicList.length;i<max;i++){
      var dic = dicList[i];
      var library = new Library(dic);
      result.push(library);
    }

    return result;
  }

  // instance

  constructor(dic){
    this._dic = dic;
  }

  address(){
    return this._dic["address"] || ""
  }

  name(){
    return this._dic["formal"] || ""
  }

  libId(){
    return this._dic["libid"] || ""
  }

}

export default Library
