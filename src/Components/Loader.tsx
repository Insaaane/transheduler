import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

function Loader() {
  return (
    <div className="loader-container">
      <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
    </div>
  );
}

export default React.memo(Loader);
