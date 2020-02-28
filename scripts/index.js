import bookmark from './bookmarks.js';
import api from './api.js'
import store from './store.js'
// responsible for call back to rendering and activating individual functions that handle user interaction
const main = function() {
  
  api.getData()
  .then(res => res.json())
  .then((items) => {
    items.forEach((item) => store.createBookmark(item));
    bookmark.render();    
  bookmark.eventListenerBinder();
  })
}


$(main);