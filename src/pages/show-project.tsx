import ShowProject from "@/components/Layouts/ShowProject"
import { GetServerSideProps } from "next";

export default function Route() {
    return <ShowProject/>
}

export const getServerSideProps: GetServerSideProps<{}> = async () => {
    return {
      props: {},
    };
  };