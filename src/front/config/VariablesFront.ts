import { Service } from "typedi";

@Service()
export class FrontendVariables {
	private static instance: FrontendVariables;

	public readonly WEB_LABEL: string;

	public readonly WEB_PORT!: string;

	public readonly WEB_ROOT_URL!: string;

	public readonly NEXT_PUBLIC_API_URL!: string;

	public readonly NEXT_PUBLIC_RPC_GATEWAY_MAINNET_URL!: string;

	public readonly NEXT_PUBLIC_RPC_GATEWAY_TESTNET_URL!: string;

	constructor() {
		this.WEB_LABEL = process.env["WEB_LABEL"]!;
		this.WEB_PORT = process.env["WEB_PORT"]!;
		this.WEB_ROOT_URL = process.env["WEB_ROOT_URL"]!;
		this.NEXT_PUBLIC_API_URL = process.env["NEXT_PUBLIC_API_URL"]!;
		this.NEXT_PUBLIC_RPC_GATEWAY_MAINNET_URL = process.env["NEXT_PUBLIC_RPC_GATEWAY_MAINNET_URL"]!;
		this.NEXT_PUBLIC_RPC_GATEWAY_TESTNET_URL = process.env["NEXT_PUBLIC_RPC_GATEWAY_TESTNET_URL"]!;
	}

	public static getInstance(): FrontendVariables {
		if (!this.instance) {
			this.instance = new this();
		}
		return this.instance;
	}
}
