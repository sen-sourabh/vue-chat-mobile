<template>
  	<q-page class="flex">
		<q-list
			class="full-width" 
			bordered
		>
			<q-item 
				v-for="(user, index) in users" 
				:key="index" 
				class="q-my-sm" 
				clickable 
				v-ripple
				:to="'/chat/'+index"
			>
				<q-item-section avatar>
					<q-avatar color="primary" text-color="white">
						{{ getNamesFirstLetter(user.name) }}
					</q-avatar>
				</q-item-section>

				<q-item-section>
					<q-item-label>{{ getNameUpperCase(user.name) }}</q-item-label>
				</q-item-section>

				<q-item-section side>
					<q-badge color="green" v-if="user.online"> Online </q-badge>
					<q-badge color="red" v-else> Offline </q-badge>
				</q-item-section>
			</q-item>
		</q-list>
  	</q-page>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Users',
  computed: {
		...mapGetters('store', ['users']),
  },
  methods: {
	  getNamesFirstLetter(value) {
		  if(!value) { return '' }
		  else {
			  return value[0].toUpperCase();
		  }
	  },
	  getNameUpperCase(value) {
		  if(!value) { return '' }
		  else {
			  return value[0].toUpperCase() + value.substr(1);
		  }
	  }
  }
}
</script>


<style>

</style>