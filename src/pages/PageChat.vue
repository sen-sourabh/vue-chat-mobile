<template>
	<q-page ref="pageChat" class="page-chat flex column">
		<q-banner v-if="!otherUserDetails.online" class="text-white text-center bg-red">
			{{ otherUserDetails.name }} is offline.
		</q-banner>
		<div
			:class="{ 'invisible': !showMessages }" 
			class="q-pa-md column col justify-end">
			<q-chat-message
				:class="{'gap-chat' : !otherUserDetails.online}"
				v-for="(message, index) in messages"
				:key="index"
				:name="message.from == 'me' ? 'You' : otherUserDetails.name "
				:text="[message.text]"
				:sent="message.from == 'me' ? true : false"
			/>
		</div> 
		<q-footer elevated>
			<q-toolbar >
				<q-form 
					class="full-width"
				>
					<q-input 
						class="q-mt-md"
						@blur="scrollToBottom"
						bg-color="white"
						:rounded="true"
						:outlined="true"
						v-model="newMessage" 
						ref="newMsg"
						label="Message" 
						:dense="true"
						lazy-rules
        				:rules="[ val => val && val.length > 0]"
						:autocorrect="true"
						:autocapitalize="true"
						:autocomplete="true"
						:spellcheck="true"
					>
						
						<template v-slot:after>
						<q-btn 	
							round 
							dense 
							flat 
							type="submit"
							@click="sendMessage"
							icon="send"
							color="white"
						/>
						</template>
					</q-input>
				</q-form>
			</q-toolbar>
		</q-footer>
	</q-page>
</template>

<script>
/* disable eslint */
import { mapState, mapActions } from 'vuex';

export default {
  name: 'PageChat',
  data() {
	  return {
		  newMessage: '',
		  showMessages: false
	  }
  },
  computed: {
		...mapState('store', ['messages', 'userDetails']),
		otherUserDetails() {
			if(this.$store.state.store.users[this.$route.params.otherUserId]) {
				return this.$store.state.store.users[this.$route.params.otherUserId];
			} 
			return {};
		}
  },
  watch: {
	  messages: function(value) {
		  if(Object.keys(value).length) {
			  this.scrollToBottom();
			  setTimeout(() => {
				  this.showMessages = true;
			  }, 200);
		  }
	  }
  },
  methods: {
	  	...mapActions('store', ['firebaseGetMessages', 'firebaseStopGettingMessages', 'firebaseSendMessage']),
	  	sendMessage() {
		  	this.firebaseSendMessage({
			  	message: {
					from: 'me',
			  		text: this.newMessage
			  	},
			  	otherUserId: this.$route.params.otherUserId
			});
			this.clearMessage();
		},
		clearMessage() {
			this.newMessage = '';
			this.$refs.newMsg.focus();
			this.$refs.newMsg.resetValidation();
		},
		scrollToBottom() {
			// console.log(this.$refs.pageChat);
			let pageChat = this.$refs.pageChat.$el;
			setTimeout(() => {
				window.scrollTo(0, pageChat.scrollHeight)
			}, 20);
		}
  },
  mounted() {
	  this.firebaseGetMessages(this.$route.params.otherUserId);
  },
  destroyed() {
	  this.firebaseStopGettingMessages();
  }
}
</script>


<style>
.page-chat {
	background-color: #e0e0e0;
}
.q-message-text--sent {
    color: #ffffff !important;
}
.q-message-text-content--sent {
    color: #000 !important;
}
.q-message-text--received {
    color: #1976d2 !important;
}
.q-message-text-content--received {
    color: #fff !important;
}
.q-banner {
	width: 100%;
	top: 50px;
	z-index: 1;
	position: fixed;
	opacity: 0.8;
}
.gap-chat {
	padding-top: 55px;
}
</style>