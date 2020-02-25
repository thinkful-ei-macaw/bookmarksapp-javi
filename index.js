const store = {
  bookmarks: [
    {
      id: 'x56w',
      title: 'Title 1',
      rating: 3,
      url: 'http://www.title1.com',
      description: 'lorem ipsum dolor sit',
      expanded: false
    },
    {
      id: '6ffw',
      title: 'Title 2',
      rating: 5,
      url: 'http://www.title2.com',
      description: 'dolorum tempore deserunt',
      expanded: false
    }

  ],
  adding: false,
  error: null,
  filter: 0
};

// this function will create the template for the bookmark
function generateBookmarkElement(bookmark) {

  return `
          <li id="${bookmark.id}">
            <span class="bookmark-title">${bookmark.title}</span>
            <span class="bookmark-rating>${bookmark.rating}</span>
          </li>`;
}

function generateBookmarksString(bookmarkList){

  const items = bookmarkList.map((bookmark) => generateBookmarkElement(bookmark));
  

  return items.join("");

}


//this  function will render the bookmarks list to the DOM
function renderBookmarkList() {
  console.log('`renderBookmarkList` ran');

  const bookmarkItemsString = generateBookmarksString(store.bookmarks);

  // insert that HTML into the DOM
  $('.js-bookmark-list').html(bookmarkItemsString);
}


// responsible for call back to rendering and activating individual functions that handle user interaction
function handleBookmarkApp() {
renderBookmarkList();
}
  


//when the page loads call handleBookmarksapp

$(handleBookmarkApp);