import NodeCache from "node-cache";
import nodePath from "node:path";

import markdownParser from "@nuxt/content/transformers/markdown";

import git from "isomorphic-git";
import http from "isomorphic-git/http/node/index.cjs";
import Filer from "filer";

// In memory filesystem for loading lessons from github
const fs = new Filer.FileSystem({ provider: new Filer.FileSystem.providers.Memory() });
const pfs = fs.promises;

// TODO: Should only cache Published lesssons and should increase the TTL
// Cache lesson details for 15 minutes
const lessonCache = new NodeCache({ stdTTL: 60 * 1 });

const validateOverview = async (url) => {
	const status = {
		passed: false,
		error: null,
		steps: [
			{ name: "Pull content", passed: false },
			{ name: "Parse content", passed: false },
			{
				name: "Fields",
				passed: false,
				fields: [
					{ name: "Title", passed: false },
					{ name: "Image", passed: false },
					{ name: "Description", passed: false },
					{ name: "Categories", passed: false },
					{ name: "Difficulty", passed: false },
					{ name: "Duration", passed: false },
					{ name: "Tracks", passed: false },
					{ name: "Level", passed: false },
					{ name: "Excerpt", passed: false },
				],
			},
		],
	};

	try {
		const overviewMD = await fetch(url).then((res) => res.text());
		status.steps.find((s) => s.name === "Pull content").passed = true;

		const parsedOverview = await markdownParser.parse(url, overviewMD);
		status.steps.find((s) => s.name === "Parse content").passed = true;

		// TODO: joi?
		// verify fields
		const fields = status.steps.find((s) => s.name === "Fields").fields;
		fields.forEach((field) => {
			field.passed = parsedOverview[field.name.toLowerCase()] ? true : false;
		});

		const failedFields = fields.filter((field) => !field.passed).map((field) => field.name);
		if (failedFields.length > 0) throw new Error(`Missing fields: ${failedFields.join(", ")}`);

		status.passed = true;
	} catch (err) {
		status.passed = false;
		status.error = err.message;
	}

	return status;
};

/*
// Given a project, return the parsed the overview.md file
const fetchLessonOverview = async (repo) => {
	const dir = await gitLesson(repo);
	const overviewMDPath = `${dir}/overview.md`;

	const overview = await new Promise((resolve, reject) => {
		fs.exists(overviewMDPath, async (exists) => {
			if (exists) {
				const overviewMD = await pfs.readFile(overviewMDPath, "utf8");
				return resolve(await markdownParser.parse(overviewMDPath, overviewMD));
			} else {
				return reject("overview.md does not exist");
			}
		});
	});

	return { overview, meta: { dir, repo, overview: overviewMDPath } };
};
*/

const getLessons = async () => {
	// MOCK: Testing
	const lessonAssets = ["PalmerEk/expert-sniffle"];

	lessonAssets.forEach((asset) => {
		if (!lessonCache.has(asset)) lessonCache.set(asset, null); // Stuff in a placeholder
	});

	return lessonCache.keys();
};

const fsRecursive = async (dir) => {
	const files = await pfs.readdir(dir, { withFileTypes: true });

	const result = await Promise.all(
		files.map(async (file) => {
			if (file.name.startsWith(".")) return; // ignore hidden files
			const res = nodePath.resolve(dir, file.name);
			return file.isDirectory() ? fsRecursive(res) : res;
		})
	);
	return Array.prototype.concat(...result);
};

// grab a full lesson with parsed content and all files
const fetchLesson = async (repo) => {
	const cachedLesson = lessonCache.get(repo);
	if (cachedLesson) return cachedLesson;

	const dir = await gitLesson(repo);

	const files = await fsRecursive(dir);

	const lessonTree = {};

	// Loop through files and parse markdown
	await Promise.all(
		files
			.filter((file) => file && file.endsWith(".md"))
			.sort((a, b) => a.localeCompare(b, { numeric: true, sensitivity: "base" }))
			.map(async (path) => {
				const md = await pfs.readFile(path, "utf8");
				path = path.replace(dir, "");
				const content = await markdownParser.parse(path, md);

				const parts = path.split("/").filter((part) => part !== "");
				let currentNode = lessonTree;

				parts.forEach((part) => {
					if (part.endsWith(".md")) {
						part = part.slice(0, -3);
						currentNode[part] = content;
					} else {
						currentNode[part] = currentNode[part] || {};
					}
					currentNode = currentNode[part];
				});
				return currentNode;
			})
	);

	lessonCache.set(repo, lessonTree);
	return lessonTree;
};

// filer doesn't support mkdir -p so we have to do it manually
const mkdirp = async (dir) => {
	const dirParts = dir.split("/");
	let currentDir = "/";
	for (let i = 1; i < dirParts.length; i++) {
		currentDir = nodePath.join(currentDir, dirParts[i]);
		try {
			await pfs.mkdir(currentDir);
		} catch (e) {
			console.log("mkdirp error", e);
			// ignore
		}
	}
};

const gitLesson = async (repo) => {
	const dir = `/lesson-cache/${repo}`;

	// clone or pull
	return await new Promise(async (resolve, reject) => {
		fs.exists(dir, async (exists) => {
			if (exists) {
				// Pull latest changes
				console.log(`Pulling Updates for ${repo} into ${dir}`);

				await git.pull({
					fs,
					http,
					dir,
					author: {
						name: "Git",
					},
				});
			} else {
				// Clone repo
				console.log(`Cloning ${repo} into ${dir}`);

				// create folders
				await mkdirp(dir);

				await git.clone({
					fs,
					http,
					dir,
					url: `https://github.com/${repo}`,
					singleBranch: true,
				});
			}

			return resolve(dir);
		});
	});
};

export { getLessons, validateOverview, fetchLesson };
