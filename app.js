// passwordfornewsapi1122.js
// passwordfornewsapi1122.js

// myApiKey = 08eadbd9efbe48f6a55976b742e76b74

// https://newsapi.org/v2/everything?q=tesla&from=2024-07-30&sortBy=publishedAt&apiKey=08eadbd9efbe48f6a55976b742e76b74

// fetch("https://newsapi.org/v2/everything?q=pakistan&from=2024-07-30&sortBy=publishedAt&apiKey=08eadbd9efbe48f6a55976b742e76b74")
//     .then(res => res.json())
//     .then(res => console.log(res))
//     .catch(err => console.log(err))

const content = document.getElementById("content");
const loader = document.getElementById("loader");

let getNews = (search, page) => {
  let url = `https://newsapi.org/v2/everything?q=${search ? search : "Pakistan"}&page_size=12&from=2024-07-30sortBy=publishedAt&apiKey=08eadbd9efbe48f6a55976b742e76b74&page=${page ? page : 1}&pageSize=12`;

  let req = new Request(url);

  fetch(req)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      loader.style.display = "none"
      content.style.display = "flex";
      let newsCard = document.getElementById("news");
      const articles = res.articles;
      for (let i = 0; i < articles.length; i++) {
        const { urlToImage, title, description, publishedAt} = articles[i];
        newsCard.innerHTML += `
        <div class="card mb-3" style="width: 18rem">
        <img src="${urlToImage}" class="news-img card-img-top" alt="..." />
        <div class="card-body">
        <h5 class="card-title">${title.slice(0, 20)}...</h5>
        <p class="card-text">
        ${description.slice(0, 70)}...
        </p>
        </div>
        <span class="badge text-bg-info">${moment(publishedAt).fromNow()}</span>
        </div>
        `;
      }
    })
    .catch((err) => console.log("err >>>", err));
};

getNews();

let page = 1;

const searchNews = () => {
  let search = document.getElementById("search");
  let newsCard = document.getElementById("news");
  newsCard.innerHTML = "";
  loader.style.display = "flex"
  content.style.display = "none";
  getNews(search.value);
  search.value = "";
};

const loadMore = () => {
  let search = document.getElementById("search");
  page++;
  getNews(search.value, page);
};

window.onscroll = function(ev){
  if((window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight){
    loadMore()
  }
}