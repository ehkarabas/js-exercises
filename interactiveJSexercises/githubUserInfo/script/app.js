// https://api.github.com//search/users/
// https://api.github.com/users/ehkarabas
// https://api.github.com/search/users?q=1

/*
https://api.github.com/users/ehkarabas
{
"login": "ehkarabas",
"id": 62310975,
"node_id": "MDQ6VXNlcjYyMzEwOTc1",
"avatar_url": "https://avatars.githubusercontent.com/u/62310975?v=4",
"gravatar_id": "",
"url": "https://api.github.com/users/ehkarabas",
"html_url": "https://github.com/ehkarabas",
"followers_url": "https://api.github.com/users/ehkarabas/followers",
"following_url": "https://api.github.com/users/ehkarabas/following{/other_user}",
"gists_url": "https://api.github.com/users/ehkarabas/gists{/gist_id}",
"starred_url": "https://api.github.com/users/ehkarabas/starred{/owner}{/repo}",
"subscriptions_url": "https://api.github.com/users/ehkarabas/subscriptions",
"organizations_url": "https://api.github.com/users/ehkarabas/orgs",
"repos_url": "https://api.github.com/users/ehkarabas/repos",
"events_url": "https://api.github.com/users/ehkarabas/events{/privacy}",
"received_events_url": "https://api.github.com/users/ehkarabas/received_events",
"type": "User",
"site_admin": false,
"name": "Huseyin Karabas",
"company": "@clarusway",
"blog": "https://www.linkedin.com/in/huseyinkarabas/",
"location": "Sakarya",
"email": null,
"hireable": null,
"bio": "IT enthusiast",
"twitter_username": null,
"public_repos": 10,
"public_gists": 0,
"followers": 40,
"following": 39,
"created_at": "2020-03-17T21:31:58Z",
"updated_at": "2022-12-19T12:41:05Z"
}
*/

const input = document.querySelector(".search");
// console.log(input);
const btn = document.querySelector(".button");
// console.log(btn);
const userContainer = document.querySelector(".user-container");
const followersContainer = document.querySelector(".followers-container");
const userProfileH1 = document.querySelector(".user-profile");
const followersH1 = document.querySelector(".followers");

function hideElements() {
  userContainer.innerHTML = ``;
  followersContainer.innerHTML = ``;
  followersH1.classList.add("hidden");
  userProfileH1.classList.add("hidden");
  followersContainer.classList.add("hidden");
  userContainer.classList.add("hidden");
}

async function getUserInfo(user) {
  const baseUrl = "https://api.github.com/users/";
  const userName = user;
  const url = baseUrl + user;
  console.log(url);
  // * fetch.then syntax
  // try {
  //   fetch(url)
  //     .then((response) => {
  //       console.log(response); // Response {type: 'cors', url: 'https://api.github.com/users/ehkarabas', redirected: false, status: 200, ok: true, …}
  //       if (!response.ok) {
  //         throw new Error("An Error Occured.");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => console.log(data)); // {login: 'ehkarabas', id: 62310975, node_id: 'MDQ6VXNlcjYyMzEwOTc1', avatar_url: 'https://avatars.githubusercontent.com/u/62310975?v=4', gravatar_id: '', …}
  // } catch (error) {
  //   console.log(error);
  // }
  // * async await syntax
  try {
    const res = await fetch(url);
    // console.log(res); // Response {type: 'cors', url: 'https://api.github.com/users/ehkarabas', redirected: false, status: 200, ok: true, …}
    if (!res.ok) {
      userContainer.classList.remove("hidden");
      followersContainer.classList.add("hidden");
      userContainer.innerHTML = `
      <p class="text-warning">Error ${res.status} ${res.statusText}</p>
      `;
      setTimeout(hideElements, 2000);
      throw new Error(`Error ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    // console.log(data); // {login: 'ehkarabas', id: 62310975, node_id: 'MDQ6VXNlcjYyMzEwOTc1', avatar_url: 'https://avatars.githubusercontent.com/u/62310975?v=4', gravatar_id: '', …}
    const {
      avatar_url,
      followers,
      followers_url,
      following,
      following_url,
      html_url,
      public_repos,
      id,
      login,
      user,
    } = data;
    userContainer.classList.remove("hidden");
    userProfileH1.classList.remove("hidden");
    userContainer.innerHTML = `
    <div class="card text-dark" style="width: 24rem;">
      <img
        src=${avatar_url}
        class="card-img-top"
        alt="user's profile picture"
      />
      <div class="card-body">
          <h3 class="card-title text-center">${login}</h3>
          <div class="row my-4">
            <div class="col-4">
              <h5 class=" text-bg-danger rounded-3 py-2 text-center">repos</h5>
              <p class="text-center fw-bolder fs-4">${public_repos}</p>
            </div>
            <div class="col-4">
              <h5 class=" text-bg-danger rounded-3 py-2 text-center">followers</h5>
              <p class="text-center fw-bolder fs-4">${followers}</p>
            </div>
            <div class="col-4">
              <h5 class=" text-bg-danger rounded-3 py-2 text-center">following</h5>
              <p class="text-center fw-bolder fs-4">${following}</p>
            </div>
          </div>
  
          <div class="text-center">
            <a href=${html_url} target="_blank" class="btn btn-primary">Github Profile</a>
          </div>
        </div>
    </div>
    `;
    getFollowers(followers_url);
    return [data, followers_url];
  } catch (error) {
    console.log(error.message);
  }
}

async function getFollowers(followers_url) {
  followers_url += "?per_page=100&page=1";
  try {
    const res = await fetch(followers_url);
    if (!res.ok) {
      followersContainer.classList.remove("hidden");
      followersContainer.innerHTML = `
      <p class="text-warning">Error ${res.status} ${res.statusText}</p>
      `;
      setTimeout(hideElements, 2000);
      throw new Error(`Error ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    // console.log(data);

    if (data.length != 0) {
      followersContainer.classList.remove("hidden");
      followersH1.classList.remove("hidden");
      followersContainer.innerHTML = ``;
      console.log(data);
      data.forEach((user) => {
        const { avatar_url, login, html_url } = user;
        followersContainer.innerHTML += `
    <div class="card text-dark col-sm-6 col-md-4">
      <img
        src=${avatar_url}
        class="card-img-top"
        alt="user's profile picture"
      />
      <div class="card-body">
        <h3 class="card-title text-center">${login}</h3>
        <div class="text-center">
          <a href=${html_url} target="_blank" class="btn btn-primary">Github Profile</a>
        </div>
      </div>
    </div>
    `;
      });
    }
  } catch (error) {
    console.log(error.message);
  }
}

btn.addEventListener("click", (e) => {
  e.preventDefault();
  // console.log(input.value);
  if (input.value) {
    getUserInfo(input.value);
    btn.closest("form").reset();
  }
});

// ? Default Render
getUserInfo("ehkarabas"); // {login: 'ehkarabas', id: 62310975, node_id: 'MDQ6VXNlcjYyMzEwOTc1', avatar_url: 'https://avatars.githubusercontent.com/u/62310975?v=4', gravatar_id: '', …}
