import React from "react";
import Authentication from "../../util/Authentication/Authentication";

// eos
import { Api, JsonRpc, RpcError, JsSignatureProvider } from "eosjs";
const defaultPrivateKey = "5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3"; // adeosamigos1
const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);
const rpc = new JsonRpc("http://127.0.0.1:8000");
const api = new Api({
  rpc,
  signatureProvider
});

const fetchThing = async () => {
  rpc
    .get_table_rows({
      json: true,
      code: "notechainacc", // contract who owns the table
      scope: "notechainacc", // scope of the table
      table: "notestruct", // name of the table as specified by the contract abi
      limit: 100
    })
    .then(result => this.setState({ noteTable: result.rows }));
};

import "./App.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.Authentication = new Authentication();

    //if the extension is running on twitch or dev rig, set the shorthand here. otherwise, set to null.
    this.twitch = window.Twitch ? window.Twitch.ext : null;
    this.state = {
      finishedLoading: false,
      theme: "light",
      isVisible: true
    };
  }

  contextUpdate(context, delta) {
    if (delta.includes("theme")) {
      this.setState(() => {
        return { theme: context.theme };
      });
    }
  }

  visibilityChanged(isVisible) {
    this.setState(() => {
      return {
        isVisible
      };
    });
  }

  componentDidMount() {
    if (this.twitch) {
      this.twitch.onAuthorized(auth => {
        this.Authentication.setToken(auth.token, auth.userId);
        if (!this.state.finishedLoading) {
          // if the component hasn't finished loading (as in we've not set up after getting a token), let's set it up now.

          // now we've done the setup for the component, let's set the state to true to force a rerender with the correct data.
          this.setState(() => {
            return { finishedLoading: true };
          });
        }
      });

      this.twitch.listen("broadcast", (target, contentType, body) => {
        this.twitch.rig.log(
          `New PubSub message!\n${target}\n${contentType}\n${body}`
        );
        // now that you've got a listener, do something with the result...

        // do something...
      });

      this.twitch.onVisibilityChanged((isVisible, _c) => {
        this.visibilityChanged(isVisible);
      });

      this.twitch.onContext((context, delta) => {
        this.contextUpdate(context, delta);
      });
    }
  }

  componentWillUnmount() {
    if (this.twitch) {
      this.twitch.unlisten("broadcast", () =>
        console.log("successfully unlistened")
      );
    }
  }

  render() {
    if (this.state.finishedLoading && this.state.isVisible) {
      return (
        <div className="App">
          <div
            className={this.state.theme === "light" ? "App-light" : "App-dark"}
          >
            <p>Hello world!</p>
            <p>My token is: {this.Authentication.state.token}</p>
            <p>My opaque ID is {this.Authentication.getOpaqueId()}.</p>
            <div>
              {this.Authentication.isModerator() ? (
                <p>
                  I am currently a mod, and here's a special mod button{" "}
                  <input value="mod button" type="button" />
                </p>
              ) : (
                "I am currently not a mod."
              )}
            </div>
            <p>
              I have{" "}
              {this.Authentication.hasSharedId()
                ? `shared my ID, and my user_id is ${this.Authentication.getUserId()}`
                : "not shared my ID"}
              .
            </p>
          </div>
        </div>
      );
    } else {
      return <div className="App" />;
    }
  }
}
