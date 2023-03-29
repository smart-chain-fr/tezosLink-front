import InfrastructureService from "@/components/Layouts/InfrastructureService";
import { GetServerSideProps } from "next";

export default function Route() {
    return <InfrastructureService/>
}

export const getServerSideProps: GetServerSideProps<{}> = async () => {
    return {
      props: {},
    };
  };