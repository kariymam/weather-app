<template>
  <div class="dashboard">
			<section class="dashboard__1">
				<slot name="one"/>
			</section>
			<section class="dashboard__2">
				<slot name="two"/>
			</section>
			<section class="dashboard__3">
				<slot name="three"/>
			</section>
			<section class="dashboard__4">
				<slot name="four"/>
			</section>
	</div>
</template>
<style lang="css">

.dashboard {
	--dashboard-gap: 32px;

	display: grid;
	grid-template-columns: 1fr;
	column-gap: var(--dashboard-gap);
	row-gap: var(--dashboard-gap);
	justify-content: stretch;
	align-content: stretch;
	align-items: center;
	height: max-content;
	z-index: 1;
	position: relative;
}

.dashboard__1 h2 ~ .current {
	height: fit-content;
    margin: auto;
}

.dashboard__4 {
	padding: 1rem;
}

.v-col:has(.current) {
	display: flex;
    flex-flow: column;
	height: 100%;
}

@media screen and (width >= 900px) {

	.dashboard {
		grid-template-columns: repeat(12, 1fr);
		grid-template-rows: 1fr 1fr;
		padding: 16px var(--dashboard-gap) 16px var(--dashboard-gap);
		height: 100vh;
	}

	.dashboard__1 {
		grid-column: 1 / 7;
		grid-row: 1;
		flex-flow: column nowrap;
	}
	
	.dashboard__2 {
		grid-column: 7 / 13;
		grid-row: 1;
	}
	
	.dashboard__3 {
		grid-column: 1 / 4;
		grid-row: 2;
	}
	
	.dashboard__4 {

		--padding: 1rem 2rem;

		display: flex;
		flex-flow: column nowrap;
		grid-column: 4 / 13;
		grid-row: 2;

		padding: 0;

		h2 {
			padding: var(--padding);
		}
	}
	
}
</style>