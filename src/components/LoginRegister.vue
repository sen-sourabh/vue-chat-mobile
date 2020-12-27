<template>
    <div>
        <q-form @reset="onReset" @submit="submitForm">
            <q-input 
                v-if="tab == 'register'"
                dense
                v-model="formData.name"
                outlined
                class="q-mb-sm"
                label="Name"
                :rules="[ val => val && val.length > 0 || '* Name is required.' ]"
            />
            <q-input 
                dense
                type="email"
                v-model="formData.email"
                outlined
                class="q-mb-sm"
                label="Email"
                :rules="[ val => !!val || '* Email is required.', isValidEmail ]"
            />
            <q-input 
                type="password"
                dense
                label="Password"
                v-model="formData.password"
                outlined
                class="q-mb-sm"
                :rules="[ val => val && val.length > 0 || '* Password is required.' ]"
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
        },
        isValidEmail (val) {
            const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
            return emailPattern.test(val) || 'Invalid email';
        },
        onReset() {
            this.formData= {
                name: '',
                email: '',
                password: ''
            }
        }
    }
}
</script>

<style>

</style>