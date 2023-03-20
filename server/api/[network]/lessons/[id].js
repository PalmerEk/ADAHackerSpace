export default defineEventHandler(async (event) => {
	const { id } = event.context.params;

	// TODO: 404?
	return await event.context.networkSvc.getLesson(id);
});
