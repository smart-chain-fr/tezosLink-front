import ProjectNotFound from "@/components/Layouts/ProjectNotFound"
import { GetServerSideProps } from "next";

export default function Route() {
    return <ProjectNotFound/>
}

export const getServerSideProps: GetServerSideProps<{}> = async () => {
    return {
      props: {},
    };
  };
  

  