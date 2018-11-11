import * as React from "react";
import styled from "react-emotion";
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

const Poll = ({ className }) => (
  <div className={className}>
    <h2>What champion did Scarra play in the last game?</h2>
    <PollItems>
      {question.selections.map((sel, i) => (
        <PollItem selection={iSel(i)}>{sel.name}</PollItem>
      ))}
    </PollItems>
  </div>
);

const PollItems = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px auto;
  width: 200px;
`;

const PollInner = ({ selection, className, children }) => (
  <div className={className}>
    <Sel>{selection})</Sel> {children}
  </div>
);

const PollItem = styled(PollInner)`
  padding: 10px;
  display: flex;
  margin-bottom: 5px;
  border-radius: 3px;
  &:hover {
    cursor: pointer;
    background-color: #b19dd8;
  }
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
