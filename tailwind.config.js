module.exports = {
	content: [
		"./components/**/*.{js,vue,ts}",
		"./layouts/**/*.vue",
		"./pages/**/*.vue",
		"./plugins/**/*.{js,ts}",
		"./nuxt.config.{js,ts}",
		"./node_modules/flowbite.{js,ts}",
	],
	plugins: [require("@tailwindcss/typography"), require("tw-elements/dist/plugin"), require("flowbite")],
	darkMode: "media",
	safelist: [
		"bg-danger-100",
		"bg-primary-100",
		"bg-secondary-100",
		"bg-success-100",
		"bg-danger-100",
		"bg-warning-100",
		"bg-info-100",
		"bg-neutral-100",

		"text-danger-600",
		"text-primary-600",
		"text-secondary-600",
		"text-success-600",
		"text-danger-600",
		"text-warning-600",
		"text-info-600",
		"text-neutral-600",

		"text-danger-700",
		"text-primary-700",
		"text-secondary-700",
		"text-success-700",
		"text-danger-700",
		"text-warning-700",
		"text-info-700",
		"text-neutral-700",

		"bg-danger",
		"bg-primary",
		"bg-secondary",
		"bg-success",
		"bg-danger",
		"bg-warning",
		"bg-info",
		"bg-neutral",
	],
};
