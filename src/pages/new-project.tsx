import NewProject from "@Front/components/Layouts/NewProject";
import { GetServerSideProps } from "next";

export default function Route() {
  return <NewProject />;
}
export const getServerSideProps: GetServerSideProps<{}> = async () => {
  return {
    props: {},
  };
};
