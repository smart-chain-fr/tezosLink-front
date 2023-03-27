
import Project from "@/api/Project";
import { IProps } from "@/components/TotalRequests";
import { IProject } from "@/interfaces/interfaces";
import { isUUID } from "class-validator";
import { GetServerSideProps } from "next";


import dynamic from 'next/dynamic'

const DynamicTotalRequest = dynamic(() => import('@/components/TotalRequests'), {
  ssr: false,
})

export default function Route(currentProject: IProject) {
  const props: IProps = {
    uuid: currentProject.uuid,
    data: [],
    metadata: { count: 0, limit: 0, offset: 0, total: 0 },
  };
  return <DynamicTotalRequest {...props} />;
}

export const getServerSideProps: GetServerSideProps<IProject> = async (
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
      props: project,
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
