// Fetching data
async function fetchNews() {
  const apiKey = "171443a1da2145fb9262ab18a9af71b5";
  const url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    displayNews(data.articles);
    console.log(data);
  } catch (error) {
    console.error("There was a problem with your fetch operation:", error);
  }
}
// Untuk menampilkan data dan melooping
function displayNews(articles) {
  const newsContainer = document.getElementById("news-container");
  newsContainer.innerHTML = "";

  articles.forEach((article) => {
    const formattedDate = formatPublishedAt(article.publishedAt);
    const newsCard = `
    <div class="card" style="width: 18rem">
    <img src="${article.urlToImage}" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">${article.title}</h5>
      <p class="card-text">${article.description}</p>
      <p class="card-text">${formattedDate}</p>
      <a href="${article.url}" class="btn btn-primary">
        Read More
      </a>
    </div>
  </div>
        `;
    newsContainer.innerHTML += newsCard;
  });
}
// Function untuk format tanggal yang baik
function formatPublishedAt(publishedAt) {
  const date = new Date(publishedAt);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  };
  return date.toLocaleDateString("en-US", options);
}

async function searchNews(keyword) {
  const apiKey = "171443a1da2145fb9262ab18a9af71b5";
  const url = `https://newsapi.org/v2/everything?q=${keyword}&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    displayNews(data.articles);
  } catch (error) {
    console.error("There was a problem with your search operation:", error);
  }
}

function handleSearch() {
  const searchInput = document.getElementById("searchInput");
  const keyword = searchInput.value.trim();
  if (keyword !== "") {
    searchNews(keyword);
  }
}
// Panggil fungsi fetchNews() untuk memulai pengambilan data
fetchNews();
