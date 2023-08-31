import React from "react";
import { Tabs } from "antd";
import { items } from "../constants";
import { layout } from "../styles";

const Contents: React.FC = () => (
  <Tabs
    defaultActiveKey="1"
    items={items}
    type="card"
    style={layout as React.CSSProperties}
  />
);

export default Contents;
