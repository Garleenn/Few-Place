<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3005'
export default {
    components: { Header, Footer },
    data() {
        return {
            login: ``,
            email: ``,
            role: null,
            password: ``,
            activePassword: ``,
            id: ``,

            error: ``,
            is1: false, is2: false,

            isCheck: false
        }
    }, 
    mounted() {
        this.loadUser();
    },
    methods: {
        async loadUser() {
            let res = await axios.get('/user', {
                params: {
                    login: this.$route.params.login
                }
            });

            this.check();

            this.login = res.data.login;
            this.email = res.data.email;
            this.role = res.data.role;
            if(this.role == 'покупатель') {
                this.is2 = false; 
                this.is1 = true;
            } else {
                this.is2 = true; 
                this.is1 = false;
            }
            this.password = res.data.password;
            this.id = res.data._id;
        },
        async updProfile() {
            if(this.activePassword == this.password) {
                try {
                    await axios.put('/users', {
                        id: this.id,
                        login: this.login,
                        email: this.email,
                        role: this.role,
                    });
                    this.error = 'Данные изменены!';
                    this.$router.push(`/Profile/${this.login}`);
                    
                } catch(err) {
                    this.error = `Произошла ошибка ${err} Логин и почта должна быть уникальными!`;
                }
            } else {
                this.error = 'Пароль неверен!';
            }
        },

        async check() {
            let res = await axios.get('/check', {
                params: {
                    login: this.$route.params.login
                }
            });

            this.isCheck = res.data;
        },
    }
}
</script>

<template>
<Header />
<form v-if="this.isCheck" class="log-container container border border-dark rounded-4 p-4 d-flex flex-column align-items-center" @submit.prevent="updProfile">
    <h2 class="mb-5">Редактировать профиль</h2>
    <div class="mb-3">
        <label class="form-label">Ваш логин: </label>
        <input type="text" class="form-control" v-model="login">
    </div>
    <div class="mb-3">
        <label class="form-label">Ваш email: </label>
        <input type="text" class="form-control" placeholder="exemple@ya.ru" v-model="email">
    </div>
    <div class="mb-3">
        <label class="form-label">Ваш пароль: </label>
        <input type="password" class="form-control" v-model="activePassword">
    </div>
    <div class="d-flex flex-row mb-3 gap-2">
        <button type="button" :class="{ 'active-btn': is1 }" class="btn btn-outline-primary rounded-3" @click="this.role = 'покупатель'; this.is2 = false; this.is1 = true">Я покупатель</button>
        <button type="button" :class="{ 'active-btn': is2 }" class="btn btn-outline-primary rounded-3" @click="this.role = 'продавец'; this.is1 = false; this.is2 = true">Я продавец</button>
    </div>
    <span v-if="error" class="text-danger mb-2">{{ error }}</span>
    <button type="submit" class="btn btn-outline-success px-5">Изменить!</button>
</form>
<Footer />
</template>

<style scoped>
.log-container {
    min-height: calc(100vh - 325px);
}
.active-btn {
    background-color: #7cfbff !important;
}
</style>