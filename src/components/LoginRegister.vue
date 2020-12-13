<template>
    <div>
        <q-form @submit="submitForm">
            <q-input 
                v-if="tab == 'register'"
                dense
                v-model="formData.name"
                outlined
                class="q-mb-sm"
                label="Name"
            />
            <q-input 
                dense
                type="email"
                v-model="formData.email"
                outlined
                class="q-mb-sm"
                label="Email"
            />
            <q-input 
                type="password"
                dense
                label="Password"
                v-model="formData.password"
                outlined
                class="q-mb-sm"
            />
            <div class="row">
                <q-space />
                <q-btn
                    type="submit"
                    class="bg-primary text-white"
                    :label="tab"
                />
            </div>
        </q-form>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: "LoginRegister",
    props: ['tab'],
    data() {
        return {
            formData: {
                name: '',
                email: '',
                password: ''
            }
        }
    },
    methods: {
        ...mapActions('store', ['registerUser', 'loginUser']),
        submitForm() {
            if(this.tab == 'login') {
                this.loginUser(this.formData);
            } else { 
                this.registerUser(this.formData);
            }
        }
    }
}
</script>

<style>

</style>