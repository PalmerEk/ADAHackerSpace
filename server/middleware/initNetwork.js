import { networkSvc } from "~/server/svc/networkSvc.js";

const RE_NETWORK = /\/api\/(?<network>mainnet|preview|preprod)\/.*/;

// API routes for specific networks are prefixed with /api/[network]/ are for a specific network (mainnet, preview, preprod), init the networkSvc appropriately
export default defineEventHandler((event) => {
	const network = event.node.req.url.match(RE_NETWORK)?.groups?.network;

	if (network) event.context.networkSvc = networkSvc(network);
});
