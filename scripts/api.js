const BASE_URL = 'https://thinkful-list-api.herokuapp.com/javi';

function getData() {
  return fetch(`${BASE_URL}/bookmarks`);
}

function createBookmark(item) {
  return fetch(`${BASE_URL}/bookmarks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: item,
  });
}

export default {
  getData,
  createBookmark,
}
