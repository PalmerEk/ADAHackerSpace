import { validateOverview } from "~/server/svc/lessonSvc.js";

export default defineEventHandler(async (event) => {
	const { url } = getQuery(event);

	return await validateOverview(url);
});
