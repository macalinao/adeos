import * as React from "react";
import styled from "react-emotion";

const AdPopup = ({ adImg, className, onLinkClick }) => (
  <div className={className}>
    <Content>
      <img src={adImg} />
      <p>
        <a onClick={onLinkClick}>Advertise with us</a>
      </p>
    </Content>
  </div>
);

const Content = styled.div`
  margin: 100px auto;
  text-align: center;
  img {
    height: 200px;
  }
`;

export default styled(AdPopup)`
  height: 100%;
  width: 100%;
  a {
    cursor: pointer;
  }
`;
