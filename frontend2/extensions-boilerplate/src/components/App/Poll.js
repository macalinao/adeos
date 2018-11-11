import * as React from "react";
import styled from "react-emotion";
import { css } from "emotion";
import { isBoolean } from "util";

const question = {
  title: "What champion did Scarra play in the last game?",
  selections: [
    {
      name: "Ahri",
      correct: true
    },
    {
      name: "Blitzcrank"
    },
    {
      name: "Thresh"
    },
    {
      name: "Ziggs"
    }
  ]
};

const iSel = i => {
  return String.fromCharCode("A".charCodeAt(0) + i);
};

class Poll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sel: null
    };
  }

  render() {
    const { className } = this.props;

    return (
      <div className={className}>
        <h2>What champion did Scarra play in the last game?</h2>
        <PollItems>
          {question.selections.map((sel, i) => (
            <PollItem
              selection={iSel(i)}
              answer={
                this.state.sel
                  ? this.state.sel === sel.name
                    ? sel.correct
                      ? "correct"
                      : "incorrect"
                    : "faded"
                  : null
              }
              onClick={() => {
                this.setState({ sel: sel.name });
              }}
            >
              {sel.name}
            </PollItem>
          ))}
        </PollItems>
      </div>
    );
  }
}

const PollItems = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px auto;
  width: 200px;
`;

const PollInner = ({ selection, className, children, answer }) => (
  <div className={className}>
    <div>
      <Sel>{selection})</Sel> {children}
    </div>
  </div>
);

const PollItem = styled(PollInner)`
  padding: 10px;
  display: flex;
  margin-bottom: 5px;
  border-radius: 3px;
  ${props =>
    !props.answer &&
    css`
      &:hover {
        cursor: pointer;
        background-color: #b19dd8;
      }
    `}
  border: 1px solid #ccc;
`;

const Sel = styled.div`
  font-weight: bold;
  margin-right: 5px;
`;

export default styled(Poll)`
  margin-top: 100px;
  text-align: center;
`;
