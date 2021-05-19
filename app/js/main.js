const URL = "https://newsapi.org/v2/",
  API_KEY = "3fd068685b074ef9830c688c1e926fdc",
  newsContainer = document.querySelector(".news-container"),
  form = document.forms["form"],
  endpoint = form.elements["endpoint"],
  q = form.elements["q"],
  language = form.elements["language"],
  sortBy = form.elements["sortBy"],
  country = form.elements["country"],
  catagory = form.elements["catagory"],
  btn = document.querySelector("button"),
  elEndPoinEvery = document.querySelectorAll("[data-endpoint='everything']"),
  elEndPoinTop = document.querySelectorAll("[data-endpoint='top-headlines']");

let endpoint; // = "everything";

async function getRequest(url, endpoint, params, apiKey) {
  try {
    let response = await fetch(`${url}${endpoint}?${params}&apiKey=${apiKey}`);
    response = await response.json();

    return await response;
  } catch (e) {
    return Promise.reject(e);
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  renderNewsByCheckpoint();
  form.reset();
});

function renderNewsByCheckpoint() {
  const params = serializeParams(getFormData());

  getRequest(URL, endpoint, params, API_KEY).then(renderArticles);
}

function serializeParams(params) {
  return Object.entries(params)
    .filter(([_, value]) => value.trim())
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
}

function getFormData() {
  return {
    q: q.value,
    sortBy: sortBy.value,
    language: language.value,
    country: country.value,
    catagory: catagory.value,
  };
}

function renderArticles({ articles }) {
  if (!Array.isArray(articles)) {
    return;
  }
  newsContainer.innerHTML = createArticlesFragment(articles);
}

function createArticlesFragment(array) {
  return array.reduce(
    (fragment, article) => fragment + createArticle(article),
    ""
  );
}

function createArticle({
  author,
  description,
  publishedAt,
  title,
  url,
  urlToImage,
}) {
  return `
    <li>
    <img src=${urlToImage} alt="IMG">
    <h3>${title}</h3>
    <p>${description}</p>
    <div><a href=${url}>Link to news</a></div>
    <span>${author}</span>
    <span>${publishedAt}</span>
</li>
  `;
}

endpoint.addEventListener("input", function () {
  endpointVal = this.value;

  if (endpointVal === "everything") {
    endPointEverything();
  } else {
    endPointTopLines();
  }
});

function endPointEverything() {
  elEndPoinEveryOn();
  elEndPoinTopOff();
  searchShow();
  buttonShow();
}

function endPointTopLines() {
  elEndPoinTopOn();
  elEndPoinEveryOff();
  searchHide();
  buttonShow();
}

btn.addEventListener("click", () => {
  searchHide();
  elEndPoinEveryOff();
  elEndPoinTopOff();
});

function elEndPoinEveryOn() {
  elEndPoinEvery.forEach((elem) => {
    elem.classList.remove("hidden");
  });
}

function elEndPoinEveryOff() {
  elEndPoinEvery.forEach((elem) => {
    elem.classList.add("hidden");
  });
}

function elEndPoinTopOn() {
  elEndPoinTop.forEach((elem) => {
    elem.classList.remove("hidden");
  });
}

function elEndPoinTopOff() {
  elEndPoinTop.forEach((elem) => {
    elem.classList.add("hidden");
  });
}

function buttonShow() {
  btn.classList.remove("hidden");
}

function searchShow() {
  q.classList.remove("hidden");
}

function searchHide() {
  q.classList.add("hidden");
}
