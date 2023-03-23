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

	/*	
	const getLessons = async () => {
		if (!lessonsLoaded()) {
			// Cache is empty
			// Fetch list of assets for the lessons policy
			const lessonAssets = await blockfrostAPI.assetsPolicyByIdAll(policyId);

			lessonAssets.forEach((asset) => {
				if (parseInt(asset.quantity) === 1) lessonCache.set(asset.asset, null); // Stuff in a placeholder
			});
		}

		return lessonCache.keys();
	};

	const getLesson = async (id) => {
		// If the cache is empty, load it
		if (!lessonsLoaded()) await getLessons();

		// if the lesson is not in the cache, return null
		if (!lessonCache.has(id)) return null;

		// fetch the lesson from the cache.  If it's null, fetch it from the network and add the details to the cache
		const lesson = lessonCache.get(id);
		if (lesson !== null) return lesson;

		// Fetch the lesson from the network
		const asset = await blockfrostAPI.assetsById(id);
		let shappedAsset = {
			id: asset.asset,
			title: matadataToString(asset.onchain_metadata.name),
			description: matadataToString(asset.onchain_metadata.description),
			image: matadataToString(asset.onchain_metadata.image), // TODO: Store on IPFS?
			level: asset.onchain_metadata.level,
			categories: matadataToString(asset.onchain_metadata.categories).split(","),
			tracks: matadataToString(asset.onchain_metadata.tracks).split(","),
			duration: asset.onchain_metadata.duration,
			docket: "https://raw.githubusercontent.com/PalmerEk/jubilant-sniffle/main/docket.json", //ToDO: Store on IPFS?
		};

		// TODO: Rewards should be stored on the blockchain
		// TODO: Docket should be a link to a JSON file preferablly on IPFS
		// TODO: This (server) should fetch the docket as well as the lesson and merge them together

		// fetch the docket (store the path)
		const docketURL = new URL(shappedAsset.docket);
		const docketBaseURL = new URL(nodePath.dirname(docketURL.pathname) + "/", docketURL.origin);

		const docket = await fetch(docketURL).then((res) => res.json());

		const language = "en"; // TODO: Deal with languages

		docket.sections = await Promise.all(
			docket.sections.map(async (section) => {
				return await Promise.all(
					section[language].steps.map(async (step) => {
						//console.log(docketBaseURL.href, nodePath.join(language, step));
						const content = await fetch(new URL(nodePath.join(language, step), docketBaseURL)).then((res) => res.text());
						return { title: section[language].title, content };
					})
				);
			})
		);

		shappedAsset = { ...shappedAsset, docket };

		lessonCache.set(id, shappedAsset);
		return lessonCache.get(id);
	};
*/

	return { networkInfo };
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
