export default defineEventHandler(async (event) => {
	const { project } = event.context.params;

	return await event.context.networkSvc.test(project);
});
