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
            password: ``,

            error: ``,
        }
    }, 

    methods: {
        async LogIn() {
            try {
                let res = await axios.get('/user', {
                    params: {
                        login: this.login,
                    },
                });
                if(res.data.password == this.password) {
                    this.error = 'Вход выполнен!';
                    window.location.href = `http://localhost:5173/Profile?login=${this.login}`;
                } else {
                    this.error = 'Пароль неверен!';
                }
            } catch(err) {
                this.error = 'Логин или пароль неверны!';
            }
        }
    }
}
</script>

<template>
<Header />
<form class="log-container container border border-dark rounded-4 p-4 d-flex flex-column align-items-center" @submit.prevent="LogIn">
    <h2 class="mb-5">Войдите в свой аккаунт</h2>
    <div class="mb-3 mt-5">
        <label for="exampleFormControlInput1" class="form-label">Ваш логин: </label>
        <input type="text" class="form-control" id="exampleFormControlInput1" v-model="login">
    </div>
    <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Ваш пароль: </label>
        <input type="password" class="form-control" id="exampleFormControlInput1" v-model="password">
    </div>
    <span v-if="error" class="text-danger mb-2">{{ error }}</span>
    <button type="submit" class="btn btn-outline-success px-5">Войти</button>
    <router-link to="/Registration" class="mt-3">Ещё нет аккаунта? Зарегистрируйтесь!</router-link>
</form>
<Footer />
</template>

<style scoped>
.log-container {
    min-height: calc(100vh - 325px);
}
</style>