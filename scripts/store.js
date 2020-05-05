let bookmarks = [];
let adding = false;
let error = null;
let filter = 0;

function createNewBookmark(newBookmark) {
  this.bookmarks.unshift(newBookmark);
};


function findByID(id) {
  return this.bookmarks.find(currentID => currentID === id);
}

const deleteBookmark = function (id) {
  this.bookmarks = this.bookmarks.filter(currentItem => currentItem.id !== id);
};



export default {
  bookmarks,
  adding, 
  error,
  filter,
  createNewBookmark,
  findByID,
  deleteBookmark,
 
 
};  