import { networkSniff } from "~/server/svc/networkSvc.js";

export default defineEventHandler(async (event) => {
	const { txHash } = event.context.params;

	return { network: await networkSniff(txHash) };
});
