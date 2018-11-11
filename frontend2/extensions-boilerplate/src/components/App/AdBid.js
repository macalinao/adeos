import * as React from "react";
import styled from "react-emotion";
import { css } from "emotion";
import { isBoolean } from "util";
import { MdDone, MdClose } from "react-icons/md";

class AdBid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sel: null,
      imageUrl: null
    };
  }

  render() {
    const { className, onSubmit } = this.props;

    return (
      <div className={className}>
        <h2>Bid for this ad space</h2>
        <Form>
          <Group>
            <label>Bid amount (per hr)</label>
            <input type="text" />
          </Group>
          <Group>
            <label>Image URL</label>
            <input
              type="text"
              value={this.state.imageUrl}
              onChange={e => {
                this.setState({
                  url: e.target.value
                });
              }}
            />
          </Group>
          <Group>
            <label>Large image URL</label>
            <input type="text" />
          </Group>
          <button onClick={() => onSubmit(this.state.imageUrl)}>Submit</button>
        </Form>
      </div>
    );
  }
}

const Form = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px auto;
  width: 400px;
`;

const Group = styled.div`
  display: flex;
  label {
    text-align: left;
    flex: 1;
  }
  input {
    flex: 1;
  }
`;

export default styled(AdBid)`
  margin-top: 100px;
  text-align: center;
  display: flex;
  flex-direction: column;
`;
