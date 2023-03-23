import { fetchLesson } from "~/server/svc/lessonSvc.js";

export default defineEventHandler(async (event) => {
	const { url } = event.context.params;

	return await fetchLesson(url);
});
