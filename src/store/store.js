import Vue from 'vue';
import { firebaseAuth, firebaseDb } from 'boot/firebase'; 

let messagesRef;

const state = {
    userDetails: {},
    error: '',
    users: {},
    messages: {}
}

const mutations = {
    setUserDetails(state, payload) {
        state.userDetails = payload;
        console.log(state.userDetails);
    }, 
    setError(state, message) {
        state.error = message;
        console.log(state.error);
    },
    setErrDefault(state, msg){
        state.error = '';
        console.log(state.error);
    },
    addUser(state, payload) {
        Vue.set(state.users, payload.userId, payload.userDetails);
    },
    updateUser(state, payload) {
        Object.assign(state.users[payload.userId], payload.userDetails);
    },
    addMessage(state, payload) {
        Vue.set(state.messages, payload.messageId, payload.messageDetails);
    },
    clearMessages(state) {
        state.messages = {};
    }
}

const actions = {
    registerUser({}, payload) {
        firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
        .then(response => {
            console.log(response);
            let userId = firebaseAuth.currentUser.uid;
            if(firebaseAuth.currentUser.email == undefined || firebaseAuth.currentUser.name == undefined){
                this.$router.push('/auth');
            }
            firebaseDb.ref('user/' + userId).set({
                name: payload.name,
                email: payload.email,
                online: true
            })
        })
        .catch(error => {
            console.log(error.message);
        })
    },
    loginUser({ commit }, payload) {
        firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
        .then(response => {
            console.log(response);
            
        })
        .catch(error => {
            console.log(error.message);
            commit('setError', error.message);
        })
    },
    logoutUser() {
        firebaseAuth.signOut();
    },
    handleAuthStateChanged({ commit, dispatch }) {
        firebaseAuth.onAuthStateChanged(user => {
            if(user) {
                //User logged in
                let userId = firebaseAuth.currentUser.uid;
                if(firebaseAuth.currentUser.email == undefined || firebaseAuth.currentUser.name == undefined){
                    this.$router.push('/auth');
                } else {
                    firebaseDb.ref('user/' + userId).once('value', snapshot => { 
                        let userDetails = snapshot.val();
                        commit('setUserDetails', {
                            name: userDetails.name,
                            email: userDetails.email,
                            userId: userId
                        })
                    })
                    dispatch('firebaseUpdateUser', {
                        userId: userId,
                        updates: {
                            online: true
                        }
                    });
                    dispatch('firebaseGetUsers');
                    this.$router.push('/');
                }
            } else {
                //User logged out
                dispatch('firebaseUpdateUser', {
                    userId: state.userDetails.userId,
                    updates: {
                        online: false
                    }
                });
                commit('setUserDetails', {});
                this.$router.replace('/auth');
            }
        });
    },
    firebaseUpdateUser({}, payload) {
        if(payload.userId)
        firebaseDb.ref('user/' + payload.userId).update(payload.updates);
    },
    firebaseGetUsers({ commit }) {
        firebaseDb.ref('user').on('child_added', snapshot => {
            let userDetails = snapshot.val();
            let userId = snapshot.key;
            commit('addUser', {
                userId,
                userDetails
            });
        });
        firebaseDb.ref('user').on('child_changed', snapshot => {
            let userDetails = snapshot.val();
            let userId = snapshot.key;
            commit('updateUser', {
                userId,
                userDetails
            });
        });
    },
    firebaseGetMessages({ commit, state }, otherUserId) {
        let userId = state.userDetails.userId;
        messagesRef = firebaseDb.ref('chats/' + userId + '/' + otherUserId);
        messagesRef.on('child_added', snapshot => {
            let messageDetails = snapshot.val();
            let messageId = snapshot.key;
            commit('addMessage', {
                messageId, 
                messageDetails
            });
        });
    },
    firebaseStopGettingMessages({ commit }) {
        if(messagesRef) {
            messagesRef.off('child_added')
            commit('clearMessages');
        }
    },
    firebaseSendMessage({}, payload) {
        firebaseDb.ref('chats/'+ state.userDetails.userId +"/"+ payload.otherUserId).push(payload.message);

        payload.message.from = 'them';
        firebaseDb.ref('chats/'+ payload.otherUserId +"/"+ state.userDetails.userId).push(payload.message);
    }
}

const getters = {
    users: state => {
        let userFiltered = {};
        Object.keys(state.users).forEach(key => {
            if(key !== state.userDetails.userId){
                userFiltered[key] = state.users[key];
            }
        })
        return userFiltered;
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}