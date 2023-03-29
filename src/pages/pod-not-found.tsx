import PodNotFound from "@/components/Layouts/PodNotFound"
import { GetServerSideProps } from "next";

export default function Route() {
    return <PodNotFound/>
}

export const getServerSideProps: GetServerSideProps<{}> = async () => {
    return {
      props: {},
    };
  };
  
  