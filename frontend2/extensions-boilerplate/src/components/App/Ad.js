import * as React from "react";
import styled from "react-emotion";

const Ad = ({ adImg, className, onAdClick }) => (
  <div className={className}>
    <Imbadatcss />
    <Space>
      <img src={adImg} onClick={onAdClick} />
    </Space>
  </div>
);

const Space = styled.div`
  margin-top: 200px;
`;

const Imbadatcss = styled.div``;

export default styled(Ad)`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  img {
    width: 200px;
    height: 100px;
  }
`;
