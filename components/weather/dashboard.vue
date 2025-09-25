<template>
  <div class="dashboard">
			<div class="dashboard__1">
				<slot name="one"/>
			</div>
			<div class="dashboard__2">
				<slot name="two"/>
			</div>
			<div class="dashboard__3">
				<slot name="three"/>
			</div>
			<div class="dashboard__4">
				<slot name="four"/>
			</div>
	</div>
</template>
<style lang="css">

.dashboard {
	display: grid;
	grid-template-columns: 1fr;
	column-gap: 32px;
	row-gap: 48px;
	justify-content: stretch;
	align-content: stretch;
	align-items: center;
	height: max-content;
	z-index: 1;
	position: relative;
}

.dashboard > div {
	/* background-color:#eee; */
	border-style: solid;
    border-width: thin 0 0 0;
	border-color: inherit;
	/* display: flex; */
	height: 100%;
    width: 100%;
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
		padding: 16px 0 48px 0;
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