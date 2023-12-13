import { FC } from "react";
import { Header, QueueTabs } from "../components";
const Home: FC = () => {
  return (
    <section className="container">
      <Header />
      <QueueTabs />
    </section>
  );
};

export { Home };
