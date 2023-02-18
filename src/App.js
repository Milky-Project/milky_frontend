import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./routes/Home";
function App() {
  const fragment = new URLSearchParams(window.location.hash.slice(1));
  const [accessToken, tokenType] = [
    fragment.get("access_token"),
    fragment.get("token_type"),
  ];

  // if (!accessToken) {
  //   window.location.href = "/";
  // }

  fetch("https://discord.com/api/users/@me", {
    headers: {
      authorization: `${tokenType} ${accessToken}`,
    },
  })
    .then((result) => result.json())
    .then((response) => {
      console.log(response);
      const { username, discriminator, avatar, id } = response;
      //set the welcome username string
      // document.getElementById(
      //   "name"
      // ).innerText = ` ${username}#${discriminator}`;

      // //set the avatar image by constructing a url to access discord's cdn
      // document.getElementById(
      //   "avatar"
      // ).src = `https://cdn.discordapp.com/avatars/${id}/${avatar}.jpg`;
    })
    .catch(console.error);

  return (
    <div>
      <Router>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
