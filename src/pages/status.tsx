import Deployment from "@/api/Deployment";
import { IPodType } from "@/api/Pod";
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
    IPodType.TESTNET_GATEWAY
  );
  const gatewayMainnetData = await Deployment.getInstance().getDeployments(
    IPodType.MAINNET_GATEWAY
    
  );

  const mainnetRollingNodeData = await Deployment.getInstance().getDeployments(
    IPodType.MAINNET_ROLLING_NODE
    
  );
  const mainnetArchiveNodeData = await Deployment.getInstance().getDeployments(
    IPodType.MAINNET_ARCHIVE_NODE
    
  );

  const testnetRollingNodeData = await Deployment.getInstance().getDeployments(
    IPodType.TESTNET_ROLLING_NODE
    
  );
  const testnetArchiveNodeData = await Deployment.getInstance().getDeployments(
    IPodType.TESTNET_ARCHIVE_NODE
  );

  return {
    mainnetProxyStatus: gatewayMainnetData.running >= 1,
    mainnetArchiveStatus: mainnetArchiveNodeData.running >= 1,
    mainnetRollingStatus: mainnetRollingNodeData.running >= 1,
    testnetName: "LIMANET",
    testnetProxyStatus: gatewayTestnetData.running >= 1,
    testnetArchiveStatus: testnetArchiveNodeData.running >= 1,
    testnetRollingStatus: testnetRollingNodeData.running >= 1,
    date: format(new Date(), "yyyy-MM-dd - p"),
  };
}
