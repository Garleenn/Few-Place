<script>
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3005'
export default {
    data() {
        return {
            login: ``,
            email: ``,
            password: ``,
            password2: ``,
            role: null,

            error: ``,
            is1: false, is2: false,
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
                        role: this.role,
                    });
                    this.error = 'Аккаунт создан!';
                    this.$router.push(`/Profile/${this.login}`);
                    
                } catch(err) {
                    this.error = 'Логин, почта должны быть уникальными, длинна пароля должна составлять от 6 до 20 символов!';
                }
            } else {
                this.error = 'Пароли не совпадают';
            }
        }
    }
}
</script>

<template>
<form class="log-container container border border-dark rounded-4 p-4 d-flex flex-column align-items-center" @submit.prevent="RegIn">
    <h2 class="mb-5">Зарегистрироваться</h2>
    <div class="mb-3">
        <label class="form-label">Ваш логин: </label>
        <input type="text" class="form-control" v-model="login">
    </div>
    <div class="mb-3">
        <label class="form-label">Ваш email: </label>
        <input type="email" class="form-control" placeholder="exemple@ya.ru" v-model="email">
    </div>
    <div class="mb-3">
        <label class="form-label">Ваш пароль: </label>
        <input type="password" class="form-control" v-model="password">
    </div>
    <div class="mb-3">
        <label class="form-label">Повторите пароль: </label>
        <input type="password" class="form-control" v-model="password2">
    </div>
    <div class="d-flex flex-row mb-3 gap-2">
        <button type="button" :class="{ 'active-btn': is1 }" class="btn btn-outline-primary rounded-3" @click="this.role = 'покупатель'; this.is2 = false; this.is1 = true">Я покупатель</button>
        <button type="button" :class="{ 'active-btn': is2 }" class="btn btn-outline-primary rounded-3" @click="this.role = 'продавец'; this.is1 = false; this.is2 = true">Я продавец</button>
    </div>
    <span v-if="error" class="text-danger mb-2">{{ error }}</span>
    <button type="submit" class="btn btn-outline-success px-5">Зарегистрироваться</button>
    <router-link class="mt-3" to="/Login">Уже есть аккаунт? Войдите!</router-link>
</form>
</template>

<style scoped>
.log-container {
    min-height: calc(100vh - 325px);
}
.active-btn {
    background-color: #7cfbff !important;
}
</style>