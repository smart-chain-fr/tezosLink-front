import Deployment from "@/api/Deployment";
import StatusLayout, { IProps } from "@/components/Layouts/Status";
import { format } from "date-fns";
import { GetServerSideProps } from "next";

export default function Route(props: IProps) {
  return <StatusLayout {...props} />;
}

export const getServerSideProps: GetServerSideProps<IProps> = async () => {
  const status = await getStatus();
  return {
    props: { status },
  };
};

async function getStatus(): Promise<IProps["status"]> {
  const gatewayTestnetData = await Deployment.getInstance().getDeployments(
    "testnet-tzlink-rpcgateway"
  );
  const gatewayMainnetData = await Deployment.getInstance().getDeployments(
    "mainnet-tzlink-rpcgateway"
  );

  const mainnetRollingNodeData = await Deployment.getInstance().getDeployments(
    "mainnet-rolling-node"
  );
  const mainnetArchiveNodeData = await Deployment.getInstance().getDeployments(
    "mainnet-archive-node"
  );

  const testnetRollingNodeData = await Deployment.getInstance().getDeployments(
    "testnet-rolling-node"
  );
  const testnetArchiveNodeData = await Deployment.getInstance().getDeployments(
    "testnet-archive-node"
  );

  return {
    mainnetProxyStatus: gatewayMainnetData.running > 1,
    mainnetArchiveStatus: mainnetArchiveNodeData.running > 1,
    mainnetRollingStatus: mainnetRollingNodeData.running > 1,
    testnetName: "LIMANET",
    testnetProxyStatus: gatewayTestnetData.running > 1,
    testnetArchiveStatus: testnetArchiveNodeData.running > 1,
    testnetRollingStatus: testnetRollingNodeData.running > 1,
    date: format(new Date(), "yyyy-MM-dd - p"),
  };
}
