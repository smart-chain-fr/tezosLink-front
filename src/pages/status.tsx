
import Status from "@/front/api/Status";
import StatusLayout, { IProps } from "@Front/components/Layouts/Status";
import { FrontendVariables } from "@Front/config/VariablesFront";
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

async function getInstanceStatus(instance: Status, url: string) {
  const health = await instance.getHealthByUrl(url).catch((error) => {
    return { status: error.status };
  });
  const status = await instance.getStatusByUrl(url).catch((error) => {
    return {
      archive_node: { status: error.status },
      rolling_node: { status: error.status },
    };
  });

  return {
    ProxyStatus: health.status !== 200 ? false : true,
    ArchiveStatus:
      status.archive_node.status !== 200 ? false : true,
    RollingStatus:
      status.rolling_node.status !== 200 ? false : true,
  };
}

async function getStatus(): Promise<IProps["status"]> {
  const variables = FrontendVariables.getInstance();


  const instance = Status.getInstance();

  const mainnetStatus = await getInstanceStatus(
    instance,
    variables.NEXT_PUBLIC_RPC_GATEWAY_MAINNET_URL
  );
  const testnetStatus = await getInstanceStatus(
    instance,
    variables.NEXT_PUBLIC_RPC_GATEWAY_TESTNET_URL
  );

  return {
    mainnetProxyStatus: mainnetStatus.ProxyStatus,
    mainnetArchiveStatus: mainnetStatus.ArchiveStatus,
    mainnetRollingStatus: mainnetStatus.RollingStatus,
    /** @TODO */
    testnetName: "LIMANET",
    testnetProxyStatus: testnetStatus.ProxyStatus,
    testnetArchiveStatus: testnetStatus.ArchiveStatus,
    testnetRollingStatus: testnetStatus.RollingStatus,
    date: new Date(Date.now()).toISOString().slice(0, 10),
  };
}
