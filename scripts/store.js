let bookmarks = [];
let adding = false;
let error = null;
let filter = 0;

function createNewBookmark(newBookmark) {
  this.bookmarks.push(newBookmark);
};


function findbyID(id) {
  return this.bookmarks.find(currentID => currentID === id);
}




export default {
  bookmarks,
  adding, 
  error,
  filter,
  createNewBookmark,
  findbyID,
 
};  