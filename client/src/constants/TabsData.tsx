import type { TabsProps } from "antd";
import CallsTable from "../components/CallsTable";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: `Callback`,
    children: <CallsTable />,
  },
  {
    key: "2",
    label: `CC`,
    children: <CallsTable />,
  },
];

export { items };
