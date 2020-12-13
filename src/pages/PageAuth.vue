<template>
	<q-page class="flex">
		<q-card  class="full-width">
			<q-tabs
				v-model="defaultTab"
				dense
				class="text-grey"
				active-color="primary"
				indicator-color="primary"
				align="justify"
				narrow-indicator
			>
				<q-tab name="login" label="Login" />
				<q-tab name="register" label="Register" />
			</q-tabs>

			<q-separator />

			<q-tab-panels v-model="defaultTab" animated>
				<q-tab-panel name="login">
					<LoginRegister :tab="defaultTab" />				
				</q-tab-panel>

				<q-tab-panel name="register">
					<LoginRegister :tab="defaultTab" />
				</q-tab-panel>
			</q-tab-panels>
		</q-card>
	</q-page>
</template>

<script>
import LoginRegister from 'src/components/LoginRegister.vue';

export default {
  name: 'PageAuth',
  components: {
    LoginRegister
  },
  data() {
	  return {
		  defaultTab: 'login',
		  
	  }
  }
}
</script>


<style>

</style>