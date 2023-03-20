export default defineEventHandler(async (event) => {
	return await event.context.networkSvc.networkInfo();
});
