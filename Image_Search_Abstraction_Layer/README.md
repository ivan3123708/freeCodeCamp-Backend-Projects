# Image Search Abstraction Layer

### User stories:

- I can get the image URLs, alt text and page urls for a set of images relating to a given search string.

- I can paginate through the responses by adding a ?offset=2 parameter to the URL.

- I can get a list of the most recently submitted search strings.

### Example usage:

`https://ij-img-search.glitch.me/api/search?q=magnolia`
`https://ij-img-search.glitch.me/api/recent`

### Example output:
```
[
  {
    description: "Southern Magnolia Tree Care: Growing Magnolias In Your Garden",
    url: "https://maxpull-tlu7l6lqiu.stackpathdns.com/wp-content/uploads/20...jpg",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdWmwTvb...",
    parentPage: "https://www.gardeningknowhow.com/ornamental/trees/magnolia...html"
  },
  ...
]
```
```
[
  {
    term: "magnolia",
    when: "Tue Apr 03 2018 05:28:04 GMT+0200 (CEST)"
  },
  ...
]
```