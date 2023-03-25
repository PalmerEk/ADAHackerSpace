import { BlockFrostAPI } from "@blockfrost/blockfrost-js"; // using import syntax

const config = useRuntimeConfig();

const networkSvc = (network = "mainnet") => {
	const projectId = config[`BLOCKFROST_${network.toUpperCase()}_PROJECT_ID`];
	const blockfrostAPI = new BlockFrostAPI({ projectId });

	const networkInfo = async () => {
		return await blockfrostAPI.network();
	};

	const matadataToString = (value) => {
		if (typeof value === "string") return value;
		if (Array.isArray(value)) return value.join("");
		return value.toString();
	};

	const txs = async (hash) => {
		if (!hash) return null;
		return await blockfrostAPI.txs(hash);
	};

	return { networkInfo, txs };
};

const networkSniff = async (txHash) => {
	const blockfrostAPI_mainnet = new BlockFrostAPI({ projectId: config.BLOCKFROST_MAINNET_PROJECT_ID });
	const blockfrostAPI_preprod = new BlockFrostAPI({ projectId: config.BLOCKFROST_PREPROD_PROJECT_ID });
	const blockfrostAPI_preview = new BlockFrostAPI({ projectId: config.BLOCKFROST_PREVIEW_PROJECT_ID });

	// basically try each to see if the transaction is there.  using try/catch as an if chain... I know, I know...
	// TODO: refactor as an async call to each and deal with the results
	try {
		await blockfrostAPI_preview.txsUtxos(txHash);
		return "preview";
	} catch (e) {
		try {
			await blockfrostAPI_preprod.txsUtxos(txHash);
			return "preprod";
		} catch (e) {
			try {
				await blockfrostAPI_mainnet.txsUtxos(txHash);
				return "mainnet";
			} catch (e) {
				return null;
			}
		}
	}
};

export { networkSvc, networkSniff };
