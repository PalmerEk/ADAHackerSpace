export default defineEventHandler(async (event) => {
	const { hash } = event.context.params;

	return await event.context.networkSvc.txs(hash);
});
