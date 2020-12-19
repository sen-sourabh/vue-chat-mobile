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
			
				<q-toolbar-title 
					v-bind:class="title == 'Chat' ? 'q-ml-lg' : 'q-pt-sm q-ml-sm absolute-left'"	
				>
						{{title}}
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
					class="absolute-right width-38"
					icon="account_circle"
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
		  cls: ''
	  }
  },
  computed: {
	...mapState('store', ['userDetails']),
	...mapState('store', ['error']),
    title() {
      let currentPath = this.$route.fullPath;
      if(currentPath == '/') return 'SmackChat';
      else if(currentPath == '/chat/:otherUserId') return 'Chat';
      else if(currentPath == '/auth') return 'Login';
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
		width: 12%;
	}
	.width-38 .q-icon,.q-btn .q-spinner {
    	font-size: 2.2em;
		margin-right: 4px;
	}
	.width-38 .block {
		font-size: 1.1em;
	}

	@media (max-width: 1100px) {
		.width-38 {
			width: 50%;
		}
	}
	@media (min-width: 700px) {
		.width-38 {
			width: 15%;
		}
	}
	@media (max-width: 400px) {
		.width-38 {
			width: 50%;
		}
	}
</style>