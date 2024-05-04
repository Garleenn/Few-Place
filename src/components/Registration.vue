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
            password: ``,
            password2: ``,

            error: ``,
        }
    }, 

    methods: {
        async RegIn() {
            if(this.password == this.password2) {
                try {
                    await axios.post('/users', {
                        login: this.login,
                        email: this.email,
                        password: this.password,
                    });
                    this.error = 'Аккаунт создан!';
                    window.location.href = `http://localhost:5173/Profile?login=${this.login}`;
                } catch(err) {
                    this.error = 'Логин должен быть уникальным, минимальная длинна пароля должна составлять 6 символов!';
                }
            } else {
                this.error = 'Пароли не совпадают';
            }
        }
    }
}
</script>

<template>
<Header />
<form class="log-container container border border-dark rounded-4 p-4 d-flex flex-column align-items-center" @submit.prevent="RegIn">
    <h2 class="mb-5">Зарегистрироваться</h2>
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
        <input type="password" class="form-control" v-model="password">
    </div>
    <div class="mb-3">
        <label class="form-label">Повторите пароль: </label>
        <input type="password" class="form-control" v-model="password2">
    </div>
    <span v-if="error" class="text-danger mb-2">{{ error }}</span>
    <button type="submit" class="btn btn-outline-success px-5">Войти</button>
    <router-link class="mt-3" to="/Login">Уже есть аккаунт? Войдите!</router-link>
</form>
<Footer />
</template>

<style scoped>
.log-container {
    min-height: calc(100vh - 325px);
}
</style>