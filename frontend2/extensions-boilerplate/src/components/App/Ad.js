import * as React from "react";
import styled from "react-emotion";

const Ad = ({ adImg, className, goToPoll, onAdClick }) => (
  <div className={className}>
    <Imbadatcss onClick={goToPoll} />
    <Space>
      <img src={adImg} onClick={onAdClick} />
    </Space>
  </div>
);

const Space = styled.div`
  margin-top: 150px;
  margin-bottom: 100px;
`;

const Imbadatcss = styled.div`
  height: 300px;
  width: 40px;
  cursor: pointer;
`;

export default styled(Ad)`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  img {
    width: 200px;
    height: 50px;
  }
`;
