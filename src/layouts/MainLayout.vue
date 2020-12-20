<template>
	<q-layout view="lHh Lpr lFf">
		<q-header elevated>
			<q-toolbar>
				<q-btn 
					v-if="title == 'Chat'"
					class="absolute-left"
					round
					flat 
					icon="arrow_back"
					to="/" 
				/>
			
				<q-toolbar-title class='absolute-center'>
						{{ title == 'Chat' ? otherUserDetails.name : title }}
				</q-toolbar-title>
				
				<!-- <q-btn 
					v-if="!userDetails.userId"
					class="absolute-right"
					icon="account_circle"
					no-caps
					flat
					label="Login" 
					to="/auth"
				/> -->

				<q-btn 
					v-if="userDetails.userId"
					@click="logoutUser"
					class="logout absolute-right width-38"
					no-caps
					flat
					title="Logout"
					:label="userDetails.name"
				/>

				<q-dialog v-model="seamless" persistent>
					<q-card class="bg-negative">
						<q-card-section class="row items-center no-wrap">
							<div>
								<div class="text-h6 text-white text-weight-bold">Invalid email or password</div>
							</div>
							<q-space />
							<q-btn class="text-h6 text-white" flat round icon="close" @click="seamless = false" />
						</q-card-section>
					</q-card>
				</q-dialog>

			</q-toolbar>
		</q-header>
		
		<q-page-container>
			<router-view />
		</q-page-container>
	</q-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'MainLayout',
  data() {
	  return {
		  loginError: '',
		  seamless: false,
		  cls: '',
		//   otherUserDetail: this.$store.state.store.users[this.$route.params.otherUserId]
	  }
  },
  computed: {
	...mapState('store', ['userDetails']),
	...mapState('store', ['error']),
    title() {
      let currentPath = this.$route.fullPath;
      if(currentPath == '/') return 'LetsChat';
      else if(currentPath.includes('/chat')) return 'Chat';
      else if(currentPath == '/auth') return 'LetsChat';
	},
	otherUserDetails() {
		if(this.$store.state.store.users[this.$route.params.otherUserId]) {
			  return this.$store.state.store.users[this.$route.params.otherUserId];
		} 
		return {};
	}
  },
  watch: {
	  error: function(val) {
		  this.seamless = true;
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
	.width-38 {
		width: 10%;
	}
	.logout .block {
		font-size: 1.1em;
		display: block;
	}

	@media (max-width: 850px) {
		.width-38 {
			width: 15%;
		}
	}
	@media (max-width: 550px) {
		.width-38 {
			width: 20%;
		}
	}
	@media (max-width: 350px) {
		.width-38 {
			width: 30%;
		}
	}
</style>