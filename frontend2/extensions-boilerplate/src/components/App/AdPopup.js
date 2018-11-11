import * as React from "react";
import styled from "react-emotion";

const AdPopup = ({ adImg, className }) => (
  <div className={className}>
    <img src={adImg} />
    <p>
      <a>Advertise with us</a>
    </p>
  </div>
);

export default styled(AdPopup)`
  height: 100%;
  width: 100%;
`;
