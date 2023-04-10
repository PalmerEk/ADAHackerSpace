<script setup></script>

<template>
	<div class="custom-grid">
		<div class="col-1"></div>
		<div class="col-2">
			<div class="d-flex header-div">
				<CardanoConnectWallet />
				<SiteHeaderThemeChooser />
			</div>
			
			<div class="text-center custom-div">
				<h1>ADA Hacker Space</h1>
				<h3 class="mt-1 mb-14 text-medium-emphasis">Cardano Training Ground</h3>
				<v-btn 
					to="/builds" 
					ripple
					size="large"
					block
				>
					Start Hacking
				</v-btn>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
	.custom-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: auto;
		height: 100vh;

		@media screen and (max-width: 900px) {
			grid-template-columns: auto;
			grid-template-rows: repeat(2, 50vh);
		}

		.col-1 {
			background-image: url('/splash-img.png');
			background-size: cover;
			background-position: top;
			order: 1;
		}

		.col-2 {
			display: grid;
			place-items: center;
			position: relative;
			order: 2;
			padding-bottom: 0;

			@media screen and (max-width: 900px) {
				order: 0;
				place-items: end center;
				padding-bottom: 2rem;
			}

			.header-div {
				position: absolute;
				top: 0;
				right: 0;
				padding: 0.5rem 1rem;
				gap: 1rem;
			}

			.custom-div {
				animation: fade-in 1.15s linear;
			}
		}
	}

	@keyframes fade-in {
		from { filter: blur(14px); opacity: 0; }
		to { filter: blur(0px); opacity: 1; }
	}
</style>