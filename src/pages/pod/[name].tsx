import Pod from "@/api/Pod";
import PodMetrics from "@/components/Layouts/PodMetrics";
import { GetServerSideProps } from "next";

type IProps = {
  podName: string;
  podType: string
};

export default function Route(props: IProps) {
  return <PodMetrics {...props} />;
}

export const getServerSideProps: GetServerSideProps<IProps> = async (
  context
) => {
  const name = context.params?.["name"]!.toString()!;
  try {
    const pod = await Pod.getInstance().getPod(name);
    if (!pod) {
      return { notFound: true };
    }
    return {
      props: {
        podName: pod.name,
        podType: pod.type
      },
    };
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/pod-not-found",
      },
    };
  }  
};
