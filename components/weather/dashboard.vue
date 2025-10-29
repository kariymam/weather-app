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