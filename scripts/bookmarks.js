import store from "./store.js"
import api from './api.js'


//html functions 

//this function will display the default page
const generateDefaultPage = function() {
  return ` <div class="container">
  <h1>My Bookmarks</h1>
   <div class="buttons">
      <button class ="add-bookmark">Add a Bookmark</button>
      <section class="rating-box">
      <label for ="rating-box">Filter by rating</label>
      <select id="rating-select" name="rating-select" class="dropdown">
        <option value="showAll">Show All</option>
        <option value=5>5</option>
        <option value=4>4</option>
        <option value=3>3</option>
        <option value=2>2</option>
        <option value=1>1</option>
     </select>
    </section>
   </div>


<ul class="bookmark-list js-bookmark-list itemcontainer">
    
</ul>`
}

//this function will display the adding page
const generateAddingPage = function() {
  return `<form id="adding-bookmark">
  <fieldset>
  <label for="bookmarktitle">Add a title for your new bookmark:</label>
  <input type="text" id="title" name="title"></input><br>
  <label for="bookmarkadd">Add a new bookmark:</label>
  <input type="url" id="bookmarklink" name="bookmarklink"></input><br>
  <section class="rating-box">
  <label for="ratingselector">Select your rating</label>
    <select id="rating-select-add" name="rating-select-add" class="dropdown">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
   </select>
  </section>
</div>
<br>
<label for="descriptiontext">Add a description...</label>
<textarea id="bookmarkdescription" rows="4" cols="50">
</textarea>

<input type="submit" id="submitBookmark" value="Add new bookmark">
<button type="cancel" id="cancelBookmark" >Cancel</button>
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
  $(document).on("submit", "#adding-bookmark", event => {
    event.preventDefault();
    
    let title = $('#title').val();
    let url = $('#bookmarklink').val();
    let desc = $('#bookmarkdescription').val();
    let rating = $('#rating-select-add').val();
    
    
    
    let formInfo =  {title, url, desc, rating}
    api.createNewBookmark(formInfo)
    .then(bm => {
        // if(newBookmark.ok) {
          // newBookmark.json().then((bm) => {
            store.createNewBookmark(bm);
            // console.log(rating);
            render();
          // })
        // }
        
      })
    }
  )}

  function expandButton() {
    $("ul").on("click", ".expand", event => {
      $(event.target).siblings('.accordion').toggle();
    })
  }

function deleteButton() {
  $("main").on("click", ".delete", event => {
    event.preventDefault();
    let id = getID(event.currentTarget);
    console.log(id);
    api.deleteBookmarks(id)
    .then(function() {
      store.deleteBookmark(id);
     
      render();
    
    })
})
}

function cancelButton () {
  $("main").on("click", "#cancelBookmark", event => {
    event.preventDefault();
    render(); }
  )
}

function filterButton(){
$('main').on('change', '#rating-select', (e) => {
  e.preventDefault();
  renderBookmarkList();

})
}
  

function getID(item){
  return $(item)
  .closest('li')
  .attr('id');

}


//render functions 
function renderDefaultPage() {
  $("main").html(generateDefaultPage());
}

function renderAddBookmarkPage() {  
$("main").html(generateAddingPage());
}


function generateBookmarkElement(bookmark) {

  return `
          <div class="bookmark">
          <li id="${bookmark.id}">
            <span class="bookmark-title">${bookmark.title}</span><br>
            <span class="bookmark-rating">Rating:${bookmark.rating}/5</span><br> 
          
          <div class='accordion'> 
            <span class="bookmark-url"><a href="${bookmark.url}">${bookmark.url}</a></span><br>
            <span class="bookmark-desc">${bookmark.desc}</span>
          </div>
          
          
          
       
          <button class="delete">Delete</button>
          <button class="expand">Expand</button>
          </li>
          </div>
        `

        
          
         
}

function generateBookmarksString(bookmarkList){
  
console.log($( "#rating-select option:selected" ).val())

if ($('#rating-select').val() === 'showAll') {
  const items = bookmarkList.map((bookmarks) => generateBookmarkElement(bookmarks));
        return items.join("");
        }

else if ($('#rating-select').val() !== typeof 'number') {
    const newBookmarkList = store.bookmarks.filter(item => item.rating >= $('#rating-select').val())
    const items = newBookmarkList.map((bookmarks) => generateBookmarkElement(bookmarks));
    return items.join("");
  }


  

  


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
  expandButton();
  deleteButton();
  getID();
  filterButton();
  cancelButton();

}


export default {
  render, 
  eventListenerBinder,    
}