import { gitLesson, fetchLessonOverview, fetchLesson } from "~/server/svc/lessonSvc.js";

export default defineEventHandler(async (event) => {
	const { url } = event.context.params;

	//return await fetchLessonOverview(url);
	//return await gitLesson(url);
	return await fetchLesson(url);
});
