<template>
	<q-layout view="lHh Lpr lFf">
		<q-header elevated>
			<q-toolbar>
				<!-- <q-btn 
					v-if="title == 'Chat'"
					round
					flat 
					icon="arrow_back"
					to="/" 
				/> -->

				<q-toolbar-title class="absolute-center">
					{{title}} 
					<!-- {{ userDetails.userId }} -->
				</q-toolbar-title>

				<q-btn 
					v-if="!userDetails.userId"
					class="absolute-right"
					icon="account_circle"
					no-caps
					flat
					label="Login" 
					to="/auth"
				/>
				<q-btn 
					v-else
					@click="logoutUser"
					class="absolute-right"
					icon="account_circle"
					no-caps
					flat
					dense
					label="Logout"
				/>
			</q-toolbar>
		</q-header>
		
		<q-page-container>
			<router-view />
		</q-page-container>
	</q-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex';

this.$forceUpdate();

export default {
  name: 'MainLayout',
  computed: {
    ...mapState('store', ['userDetails']),
    title() {
      let currentPath = this.$route.fullPath;
      if(currentPath == '/') return 'SmackChat';
      else if(currentPath == '/chat') return 'Chat';
      else if(currentPath == '/auth') return 'Login';
    }
  },
  methods: {
	  ...mapActions('store', ['logoutUser'])
  }
}
</script>

<style>
	.q-toolbar .q-btn {
		line-height: 1.2;
	}
</style>