<script setup></script>

<template>
	<NuxtLayout>
		<div class="custom-grid">
			<div class="col-1"></div>
			<div class="col-2">
				<div class="card">
					<img src="/Workshop_cog.png" class="mb-7" />

					<h2>ADA Hacker Space</h2>
					<h4 class="mt-1 mb-14 text-medium-emphasis">Cardano Training Ground</h4>
					<v-btn 
						to="/builds" 
						ripple
						size="large"
						block
						rounded="10"
					>
						Get Started 
					</v-btn>
				</div>
			</div>
		</div>
	</NuxtLayout>
</template>

<style scoped lang="scss">
	.custom-grid {
		display: grid;
		grid-template-columns: 75% 25%;
		height: calc(100vh - 112px);

		.col-1 {
			background-image: url('/splash-img.png');
			background-size: cover;
			background-position: top;
		}

		.col-2 {
			display: grid;
			place-items: center;
			position: relative;

			.card {
				padding: 2rem;
				border-radius: 10px;
				background-color: rgba(0, 0, 0, 0.85);
				min-width: 350px;
				text-align: center;
				animation: slide-left 1s ease-in-out;
				border: 2px solid #bb86fc;
				position: absolute;
				left: -175px;

				img {
					max-width: 275px;
					margin: auto;
					animation: spin 1.25s ease-in-out;
				}
			}
		}
	}

	@keyframes spin {
		from { transform: rotate(0deg) }
		to { transform: rotate(360deg) }
	}

	@keyframes slide-left {
		from { transform: translateX(600px) }
		to { transform: translateX(0px) }
	}
</style>