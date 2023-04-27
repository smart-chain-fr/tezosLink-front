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
  const gatewayTestnetData = Deployment.getInstance().getDeployments(
    IPodType.TESTNET_GATEWAY
  );
  const gatewayMainnetData = Deployment.getInstance().getDeployments(
    IPodType.MAINNET_GATEWAY
  );

  const mainnetRollingNodeData = Deployment.getInstance().getDeployments(
    IPodType.MAINNET_ROLLING_NODE
  );
  const mainnetArchiveNodeData = Deployment.getInstance().getDeployments(
    IPodType.MAINNET_ARCHIVE_NODE
  );

  const testnetRollingNodeData = Deployment.getInstance().getDeployments(
    IPodType.TESTNET_ROLLING_NODE
  );
  const testnetArchiveNodeData = Deployment.getInstance().getDeployments(
    IPodType.TESTNET_ARCHIVE_NODE
  );
  
  let status = {
    mainnetProxyStatus: false,
    mainnetArchiveStatus: false,
    mainnetRollingStatus: false,
    testnetName: "LIMANET",
    testnetProxyStatus: false,
    testnetArchiveStatus: false,
    testnetRollingStatus: false,
    date: format(new Date(), "yyyy-MM-dd - p"),
  };

  await Promise.all([
    gatewayMainnetData,
    gatewayTestnetData,
    mainnetArchiveNodeData,
    mainnetRollingNodeData,
    testnetArchiveNodeData,
    testnetRollingNodeData,
  ]).then((values) => {
    status.mainnetProxyStatus = values[0].running >= 1;
    status.mainnetArchiveStatus = values[2].running >= 1;
    status.mainnetRollingStatus = values[3].running >= 1;
    status.testnetProxyStatus = values[1].running >= 1;
    status.testnetArchiveStatus = values[4].running >= 1;
    status.testnetRollingStatus = values[5].running >= 1;
  });
  return status;
}
