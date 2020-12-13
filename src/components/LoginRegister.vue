<template>
    <div>
        <q-form>
            <q-input 
                v-if="tab == 'register'"
                dense
                type="text"
                v-model="name"
                outlined
                class="q-mb-sm"
                label="Name"
            />
            <q-input 
                dense
                type="email"
                v-model="email"
                outlined
                class="q-mb-sm"
                label="Email"
            />
            <q-input 
                type="password"
                dense
                label="Password"
                v-model="password"
                outlined
                class="q-mb-sm"
            />
            <q-btn
                v-if="tab == 'register'"
                color="green"
                class="full-width primary text-white"
                outlined
            >
                Register
            </q-btn>
            <q-btn
                v-else
                color="green"
                class="full-width primary text-white"
                outlined
            >
                Login
            </q-btn>
        </q-form>
    </div>
</template>

<script>
export default {
    name: "LoginRegister",
    props: ['tab'],
    data() {
        return {
            name: '',
            email: '',
            password: ''
        }
    }
}
</script>

<style>

</style>