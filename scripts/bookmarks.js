import store from "./store.js"
import api from './api.js'


//html functions 

//this function will display the default page
const generateDefaultPage = function() {
  return ` <div class="container">
  <h1>My Bookmarks</h1>
   <div class="buttons">
      <button class ="add-bookmark">Add a Bookmark</button>
      <div class="dropdown">
          <button class="dropbtn">Filter by...</button>
          <div class="dropdown-content">
            <a href="#" class ="5">5 stars</a>
            <a href="#"class ="4">4 stars</a>
            <a href="#"class ="3">3 stars</a>
            <a href="#"class ="2">2 stars</a>
            <a href="#"class ="1">1 stars</a>
          </div>
        </div>
   </div>


<ul class="bookmark-list js-bookmark-list">
    
</ul>`
}

//this function will display the adding page
const generateAddingPage = function() {
  return `<form id="adding-bookmark">
  <fieldset>
  <label for="bookmarkAdd">Add a new Bookmark:</label><br>
  <input type="url" id="bookmarklink" name="bookmarklink">
  <div class="dropdown">
  <div class="star-rating>
  </div>
    <button class="dropbtn">How many stars?</button>
    <div class="dropdown-content">
      <a href="#" class ="5">5 stars</a>
      <a href="#"class ="4">4 stars</a>
      <a href="#"class ="3">3 stars</a>
      <a href="#"class ="2">2 stars</a>
      <a href="#"class ="1">1 stars</a>
    </div>
  </div>
</div>
<br>
<label for="descriptiontext">Add a description...</label>
<textarea id="bookmarkdescription" rows="4" cols="50">
</textarea>

<input type="submit" id="submitBookmark" value="Add new bookmark">
<input type="submit" id="cancelBookmark" value="Cancel">
</fieldset>
</form>
`
}

//event listeners
function addingBookmarkButton() {
$("main").on("click", ".add-bookmark", event => {
  event.preventDefault();
  store.adding = true;
  renderAddBookmarkPage();
});
}

function createNewBookmarkButton() {
  $("main").on("click", '#submitBookmark', event => {
    event.preventDefault();
    let formElement = $("#adding-bookmark")[0];
    let formInfo =  serializeJson(formElement);
    api
      .createNewBookmark(formInfo)
      .then(newBookmark => {
        store.createNewBookmark(newBookmark);
        render();
      })
    }
  )}

//render functions 
function renderDefaultPage() {
  $("main").html(generateDefaultPage());
}

function renderAddBookmarkPage() {  
$("main").html(generateAddingPage());
}


function generateBookmarkElement(bookmark) {

  return `
          <li id="${bookmark.id}">
            <span class="bookmark-title">${bookmark.title}</span><br>
            <span class="bookmark-rating">${bookmark.rating}</span><br>   
            <span class="bookmark-url">${bookmark.url}</span>
          </li>`;
}

function generateBookmarksString(bookmarkList){

  const items = bookmarkList.map((bookmark) => generateBookmarkElement(bookmark));
  

  return items.join("");

}
// convert form data into an array of objects 

function serializeJson(form) {
  const formData =  new FormData(form);
  const o = {};
  formData.forEach((val, name) => o[name] = val);
  return JSON.stringify(o);
}

//this  function will render the bookmarks list to the DOM
function renderBookmarkList() {

  const bookmarkItemsString = generateBookmarksString(store.bookmarks);
  

  // insert that HTML into the DOM
  $('.js-bookmark-list').html(bookmarkItemsString);
}



function render(){
  renderDefaultPage();
  renderBookmarkList(); 
  
} 

function eventListenerBinder() {
  addingBookmarkButton();
  createNewBookmarkButton();

}

export default {
  render, 
  eventListenerBinder,    
}