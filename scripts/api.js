const BASE_URL = 'https://thinkful-list-api.herokuapp.com/javi';

function getData() {
  return fetch(`${BASE_URL}/bookmarks`);
}

function createNewBookmark(item) {
  return fetch(`${BASE_URL}/bookmarks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
}


function deleteBookmarks(id) {
  return fetch(`${BASE_URL}/bookmarks/${id}`, {
    method: 'DELETE'
  });
};


export default {
  getData,
  createNewBookmark,
  deleteBookmarks,
}
