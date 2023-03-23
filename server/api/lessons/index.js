import { getLessons } from "~/server/svc/lessonSvc.js";

export default defineEventHandler(async (event) => {
	return await getLessons();
});
