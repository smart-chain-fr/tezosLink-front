
export class FrontendVariables {
	private static instance: FrontendVariables;

	public NEXT_PUBLIC_API_URL!: string;

	private constructor() {
		
	}

	public static getInstance(): FrontendVariables {
		if (!this.instance) {
			this.instance = new this();
		}
		return this.instance;
	}
}
