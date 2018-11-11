import React from "react";
import Authentication from "../../util/Authentication/Authentication";
import Ad from "./Ad";
import Poll from "./Poll";

// eos
import { Api, JsonRpc, RpcError, JsSignatureProvider } from "eosjs";
const defaultPrivateKey = "5JzD85DfmXrNEztbM2f9x4gwJUGkX7CkvLysEsjQa3HGfpdFS8T"; // adeosamigos1
const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);
const rpc = new JsonRpc("http://127.0.0.1:7777");
const api = new Api({
  rpc,
  signatureProvider
});
import styled from "react-emotion";

const Wrap = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  height: calc(100% - 200px);
  padding: 20px;
`;

const pushThing = async () => {
  const result = await api.transact(
    {
      actions: [
        {
          account: "adeos",
          name: "setimage",
          authorization: [
            {
              actor: "sidne",
              permission: "active"
            }
          ],
          data: {
            space: "sidne",
            image_url:
              "https://images-na.ssl-images-amazon.com/images/I/81wOH2vGgiL._SY450_.jpg"
          }
        }
      ]
    },
    {
      blocksBehind: 3,
      expireSeconds: 30
    }
  );
  console.dir(result);
};

const fetchThing = async () => {
  return rpc.get_table_rows({
    json: true,
    code: "adeos", // contract who owns the table
    scope: "adeos", // scope of the table
    table: "space", // name of the table as specified by the contract abi
    limit: 100
  });
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
      isVisible: true,
      page: "main"
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

  async componentDidMount() {
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

    setInterval(async () => {
      const adInfo = await fetchThing();
      if (!adInfo) {
        return;
      }
      this.setState({
        adImg: adInfo.rows.find(x => x.key === "sidne").image_url
      });
    }, 1000);

    this.setState({
      page: "poll"
    });
  }

  componentWillUnmount() {
    if (this.twitch) {
      this.twitch.unlisten("broadcast", () =>
        console.log("successfully unlistened")
      );
    }
  }

  render() {
    const { page } = this.state;
    if (this.state.finishedLoading && this.state.isVisible) {
      return (
        <Wrap>
          {page === "main" && (
            <Ad adImg={this.state.adImg} onAdClick={() => {}} />
          )}
          {page === "poll" && <Poll />}
          <button
            onClick={async () => {
              console.log(await pushThing());
            }}
          >
            push
          </button>
        </Wrap>
      );
    } else {
      return <div className="App" />;
    }
  }
}
