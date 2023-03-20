<script setup>
	import { token } from "@formkit/utils";

	const BLANK_SECTION = {
		title: "Section Title",
		steps: [],
	};

	const BLANK_LESSON = {
		title: "",
		description: "",
		image: "",
		level: 0,
		categories: [],
		tracks: [],
		duration: 0,
		sections: [BLANK_SECTION],
	};

	const castRangeToNumber = (node) => {
		// We add a check to add the cast only to range inputs
		if (node.props.type !== "range") return;

		node.hook.input((value, next) => next(Number(value)));
	};

	const submitLesson = async (fields) => {
		await new Promise((r) => setTimeout(r, 1000));
		alert(JSON.stringify(fields));
	};

	const CATEGORIES = ["NFTs", "Solana"];
	const TRACKS = ["dApp Developer", "Frontend Developer", "Backend Developer", "Designer", "Product Manager", "Blockchain Developer"];
	const LEVELS = ["Not Specified", "Beginner", "Intermediate", "Advanced", "Expert", "Master"];

	const levelDescription = computed(() => LEVELS[lesson.value.level]);

	// note: english only for now
	const lesson = ref(BLANK_LESSON);
	const sections = ref([BLANK_SECTION]);

	const addSection = () => {
		sections.value.push({ title: "", steps: [] });
	};

	const removeSection = (e) => {
		e.preventDefault();
		const key = e.target.getAttribute("data-key");
		console.log([...sections.value]);
		sections.value = sections.value.filter((item) => item !== key);
		console.log([...sections.value]);
	};
</script>

<template>
	<!-- Submits to gun.js? -->
	<!-- TODO: Side preview? -->

	<div class="container mx-auto">
		<FormKit type="form" @submit="submitLesson" :plugins="[castRangeToNumber]" v-model="lesson">
			<h1>Form to submit lesson</h1>

			<FormKit type="text" name="title" validation="required" label="Title" help="Up to 65 characters" />

			<FormKit type="textarea" rows="10" name="description" validation="required" label="Description" help="Short description of the lesson" />

			<FormKit type="file" name="image" label="Image" accept=".jpg,.gif,.webp,.png" help="Upload an image for the lesson" />

			<p>The following fields are suggestions and will be determened by the reviewer</p>
			<FormKit name="level" type="range" label="Suggested Level" min="0" max="5" :help="levelDescription" />

			<!-- <FormKit type="taglist" name="categories" label="Select or add categories" :options="CATEGORIES" :value="[]" :allow-new-values="true" /> -->
			<!-- <FormKit type="taglist" name="tracks" label="Select or add tracks" :options="TRACKS" :value="[]" :allow-new-values="true" /> -->

			<FormKit type="number" help="How many minutes should this lesson take?" label="Duration" name="duration" value="25" step="5" />

			<p>"docket builder" (add section, give title, add urls for markdown)</p>
			<FormKit type="list" name="sections">
				<FormKit
					name="title"
					type="text"
					label="Section Title"
					help="Add a title for this section"
					:sections-schema="{
						suffix: {
							$el: 'a',
							attrs: {
								class: '$classes.remove',
								'data-key': '$id',
								href: '#',
								onClick: removeSection,
							},
							children: 'Remove',
						},
					}"
				/>
				<FormKit type="list" name="steps">
					<FormKit
						:id="step"
						type="text"
						label="Step URL"
						help="URL of the markdown for this step"
						:sections-schema="{
							suffix: {
								$el: 'a',
								attrs: {
									class: '$classes.remove',
									'data-key': '$id',
									href: '#',
									onClick: removeStep,
								},
								children: 'Remove Step',
							},
						}"
					>
					</FormKit>
					<button type="button" @click.prevent="addStep(item)">+ New Step</button>
				</FormKit>

				<button type="button" @click.prevent="addSection">+ New Section</button>

				<!-- <FormKit type="list" v-model="docket.steps">
				<FormKit type="text" label="step" value="" help="URL of the markdown for this step" />
			</FormKit> -->
			</FormKit>
		</FormKit>
	</div>
	<pre wrap>{{ lesson }}</pre>
</template>
