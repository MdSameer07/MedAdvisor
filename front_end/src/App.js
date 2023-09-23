import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";

const clientId = "728138647338-na81khtsusgdmko5scop2if483sd7qjb.apps.googleusercontent.com";

function App() {

  const [user, setUser] = useState({});

  function handleCallbackResponse(response) {
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }

  function handleSignOut(event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }

  useEffect(() => {
    // This will cause an error if the script setup is not done correctly in index.html file.
    google.accounts.id.initialize({
      client_id: clientId,
      callback: handleCallbackResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large" }
    );
    google.accounts.id.prompt();
  }, [])

  return (
    <div className="App">
      <div id="signInDiv"></div>
      {Object.keys(user).length != 0 &&
        <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
      }
      {user &&
        <div>
          <img src={user.picture}></img>
          <h3>{user.name}</h3>
        </div>
      }
    </div>
  );
}

export default App;
