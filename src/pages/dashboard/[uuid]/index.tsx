import Dashboard from "@/components/Layouts/Dashboard";

import Project from "@/api/Project";
import { IProject } from "@/interfaces/interfaces";
import { isUUID } from "class-validator";
import { GetServerSideProps } from "next";

type IProps = {
  network: string;
  title: string;
  uuid: string;
  firstTime: boolean;
};

type IRouteProps = {
  project: IProject;
};

export default function Route(props: IRouteProps) {
  const dashboardProps: IProps = {
    network: props.project.network,
    title: props.project.title,
    uuid: props.project.uuid,
    firstTime: false,
  };
  return <Dashboard {...dashboardProps} />;
}

export const getServerSideProps: GetServerSideProps<IRouteProps> = async (
  context
) => {
  const uuid = context.params?.["uuid"]!.toString()!;
  try {
    if (!isUUID(uuid, "4")) {
      return {
        redirect: {
          permanent: false,
          destination: "/project-not-found",
        },
      };
    }
    const project = await Project.getInstance().getOneProject(uuid);
    if (!project) {
      return { notFound: true };
    }
    return {
      props: {
        project,
      },
    };
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/project-not-found",
      },
    };
  }
};
