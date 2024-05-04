<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3005'
export default {
    components: { Header, Footer },
    data() {
        return {
            user: {},

            error: ``,
        }
    }, 
    mounted() {
        this.loadUser();
    },
    methods: {
        async loadUser() {
            try {
                let res = await axios.get(`/user?login=${this.$route.query.login}`);
                this.user = res.data;
            } catch(err) {
                this.error = err;
            }
        }
    }
}
</script>

<template>
<Header />
<div class="profile-container container">
    {{ user }}
    <h2 v-if="error">{{ error }}</h2>
</div>
<Footer />
</template>

<style scoped>
.profile-container {
    min-height: calc(100vh - 325px);
}
</style>