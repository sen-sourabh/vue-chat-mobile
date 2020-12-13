import { firebaseAuth, firebaseDb } from 'boot/firebase'; 

const store = {
    userDetails: {}
}

const mutations = {
    setUserDetails(state, payload) {
        state.userDetails = payload;
        console.log(state.userDetails);
    }
}

const actions = {
    registerUser({}, payload) {
        firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
        .then(response => {
            console.log(response);
            let userId = firebaseAuth.currentUser.uid;
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
    loginUser({}, payload) {
        firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
        .then(response => {
            console.log(response);
            
        })
        .catch(error => {
            console.log(error.message);
        })
    },
    logoutUser() {
        firebaseAuth.signOut();
    },
    handleAuthStateChanged({ commit }) {
        firebaseAuth.onAuthStateChanged(user => {
            if(user) {
                //User logged in
                let userId = firebaseAuth.currentUser.uid;
                firebaseDb.ref('user/' + userId).once('value', snapshot => { 
                    let userDetails = snapshot.val();
                    commit('setUserDetails', {
                        name: userDetails.name,
                        email: userDetails.email,
                        userId: userId
                    })
                })
            } else {
                //User logged out
                commit('setUserDetails', {});
            }
        });
    }
}

const getters = {

}

export default {
    namespaced: true,
    store,
    mutations,
    actions,
    getters
}