import { GetServerSideProps } from "next";
import {
  getLastRequest,
  getRequestByDays,
  getRpcUsage,
} from "@/components/Layouts/Dashboard/extractData";
import { isUUID } from "class-validator";
import Project from "@/api/Project";
import { IProject } from "@/interfaces/interfaces";
import PodMetrics from "@/components/Layouts/PodMetrics";

type IProps = {
  podType: string;
  name: string;
};

export default function Route(props: IProps) {
  return (
    <PodMetrics {...props} />
  )
}

export const getServerSideProps: GetServerSideProps<IProps> = async (
  context
) => {
  return {
    props: {
      podType: "API",
      name: context.params?.["name"]!.toString() ?? "none",
    },
  };
  //   const uuid = context.params?.["uuid"]!.toString()!;
  //   try {
  //     if (!isUUID(uuid, "4")) {
  //       return {
  //         redirect: {
  //           permanent: false,
  //           destination: "/project-not-found",
  //         },
  //       };
  //     }
  //     const project = await Project.getInstance().getOneProject(uuid);
  //     if (!project) {
  //       return { notFound: true };
  //     }
  //     return {
  //       props: project,
  //     };
  //   } catch (error) {
  //     return {
  //       redirect: {
  //         permanent: false,
  //         destination: "/project-not-found",
  //       },
  //     };
  //   }
};
