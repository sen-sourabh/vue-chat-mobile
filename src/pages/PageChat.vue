<template>
	<q-page class="flex column">
		<q-banner class="text-white text-center bg-red">
			User is offline.
		</q-banner>
		<div class="q-pa-md column col justify-end">
			<q-chat-message
				v-for="(message, index) in messages"
				:key="index"
				:name="message.from"
				:text="[message.text]"
				:sent="message.from == 'me' ? true : false"
			/>
		</div> 
		<q-footer elevated>
			<q-toolbar>
				<q-form 
					class="full-width"
				>
					<q-input 
						bg-color="white"
						:rounded="true"
						:outlined="true"
						v-model="newMessage" 
						label="Message" 
						:dense="true"
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
export default {
  name: 'PageChat',
  data() {
	  return {
		  newMessage: '',
		  messages: [ 
			  	{
					from: 'me',
					text: 'Hey, How are you?'

				},
				{
					from: 'them',
					text: 'Good thanks, What about you?'

				},
				{
					from: 'me',
					text: 'Pretty good!'

				},
		  	]
	  }
  },
  methods: {
	  sendMessage() {
		  this.messages.push({
			  from: 'me',
			  text: this.newMessage
		  });
		  this.newMessage = "";
	  }
  }
}
</script>


<style>

</style>