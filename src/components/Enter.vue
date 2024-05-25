<template>
<div class="container log-container d-flex flex-column align-items-center">
    <h2 class="mb-5">Войдите в систему</h2>
    <button class="btn btn-outline-primary mb-3"><router-link to="Login">Войти в свой аккаунт</router-link></button>
    <button class="btn btn-outline-primary"><router-link to="Registration">Создать новый аккаунт</router-link></button>
</div>
</template>

<style scoped>
.log-container {
    min-height: calc(100vh - 325px);
}
button:hover a {
    color: #fff !important;
}
a {
    color: #000 !important;
}
</style>