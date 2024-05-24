<script>
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3005'
axios.defaults.withCredentials = true;

export default {
    data() {
        return {
            title: ``,
            user: null,
        }
    },

    mounted() {
        this.getSession();
    },

    methods: {
        async getSession() {
            let res = await axios.get('/session');
            this.user = res.data;
        },
    }
}
</script>


<template>
    <div class="nav-container px-5 py-5 d-flex justify-content-between border-bottom border-dark align-items-center mb-5">
        <routerLink to="/"><img role="button" class="me-5" src="../assets/favicon.ico" alt="Logo"></routerLink>
        <form @submit.prevent="$emit('productsTitle', this.title)" class="form-container d-flex gap-3">
            <input v-model="title" type="search" placeholder="Найти товар...">
            <button type="submit" class="btn btn-outline-success">Найти</button>
        </form>
        <nav class="nav ms-5 d-flex align-items-center">
            <ul class="d-flex gap-5 list-unstyled mb-0">
                <li class="fs-5 my-auto"><routerLink to="/">Главная</routerLink></li>
                <li v-if="this.user" class="fs-5"><routerLink to="/Cart">Корзина</routerLink></li> 
                <li v-if="this.user" class="fs-5"><routerLink :to="`/Profile/${user.login}`">Профиль</routerLink></li>
                <li v-else class="fs-5"><routerLink to="/Enter"><button>Войти</button></routerLink></li>
            </ul>
        </nav>
    
        <button class="btn right-menu-btn d-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"
            aria-controls="offcanvasRight"><img src="../assets/close.svg" alt="x"></button>
    
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title mb-2" id="offcanvasRightLabel">Перемещение</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <ul class="list-unstyled mb-0 d-flex flex-column gap-3">
                    <li class="fs-5 my-auto"><routerLink to="/">Главная</routerLink></li>
                    <li v-if="this.user" class="fs-5"><routerLink to="/Cart">Корзина</routerLink></li> 
                    <li v-if="this.user" class="fs-5"><routerLink :to="`/Profile/${user.login}`">Профиль</routerLink></li>
                    <li v-else class="fs-5"><routerLink to="/Enter"><button>Войти</button></routerLink></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>
.nav-container img {
    width: 35px;
    height: 35px;
}
.form-container {
    width: 100%;
    flex-grow: 1;
}

@media (max-width:900px) {
    .nav-container {
        padding: 20px 15px !important;
    }
    .right-menu-btn {
        display: block !important;
    }
    .nav {
        display: none !important;
    }
    .form-container button {
        display: none !important;
    }
    .nav-container>img {
        margin-right: 10px !important;
    }
}
</style>