import Home from "@/components/Layouts/Home";
import { GetServerSideProps } from "next";

export default function Route() {
  return <Home />;
}

export const getServerSideProps: GetServerSideProps<{}> = async () => {
  return {
    props: {},
  };
};

