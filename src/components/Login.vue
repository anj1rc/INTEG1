<template>
  <div>
    <h2 v-if="user">Welcome, {{ user.displayName }}</h2>
    <button v-if="!user" @click="login">Login with Gmail</button>
    <button v-if="user" @click="logout">Logout</button>
  </div>
</template>

<script>
import { auth, provider, signInWithPopup, signOut, onAuthStateChanged } from '../firebase';

export default {
  name: 'Login',
  data() {
    return {
      user: null
    };
  },
  methods: {
    async login() {
      try {
        const result = await signInWithPopup(auth, provider);
        this.user = result.user;
      } catch (error) {
        console.error('Login error:', error);
      }
    },
    async logout() {
      try {
        await signOut(auth);
        this.user = null;
      } catch (error) {
        console.error('Logout error:', error);
      }
    }
  },
  created() {
    onAuthStateChanged(auth, (firebaseUser) => {
      this.user = firebaseUser;
    });
  }
};
</script>
