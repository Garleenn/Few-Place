<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
export default {
    components: { Header, Footer }
}
</script>

<template>
<Header />
<div class="container log-container d-flex flex-column align-items-center">
    <h2 class="mb-5">Войдите в систему</h2>
    <button class="btn btn-outline-primary mb-3"><router-link to="Login">Войти в свой аккаунт</router-link></button>
    <button class="btn btn-outline-primary"><router-link to="Registration">Создать новый аккаунт</router-link></button>
</div>
<Footer />
</template>

<style scoped>
.log-container {
    min-height: calc(100vh - 325px);
}
button:hover, nk:hover, a:hover {
    color: #fff !important;
}
</style>