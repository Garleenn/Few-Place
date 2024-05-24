<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3005'
axios.defaults.withCredentials = true;

import dayjs from 'dayjs';

export default {
    components: { Header, Footer },
    data() {
        return {
            user: {},
            products: [],

            error: ``,

            isCheck: false,
        }
    },
    mounted() {
        this.loadUser();
        this.loadProducts();
        this.check();
    },
    methods: {
        async loadProducts() {
            let res = await axios.get(`/myProducts?author=${this.$route.query.login}`);
            this.products = res.data;
        },

        async loadUser() {
            try {
                let res = await axios.get(`/user`, {
                    params: {
                        login: this.$route.query.login,
                    }
                });
                this.user = res.data;
                this.dayJs();
            } catch (err) {
                this.error = err;
            }
        },

        async logout() {
            await axios.get('/logout');
            this.$router.push(`/`);
        },

        async check() {
            let res = await axios.get('/check', {
                params: {
                    login: this.$route.query.login
                }
            });

            this.isCheck = res.data;
        },

        dayJs() {
            let day = dayjs(this.user.createdAt).format('DD.MM.YYYY в HH:mm');
            this.user.createdAt = day;
        },
    }
}
</script>

<template>
    <Header />

    <div class="profile-container container d-flex justify-content-start" v-if="user.createdAt">
        <div class="left-side d-flex flex-column border-end p-3">
            <div class="flex-row wrapper-window align-items-center justify-content-between">
                <div class="main-block">
                    <div class="info-block d-flex gap-2 align-items-center">
                        <img :src="user.avaImage" :alt="user.login">
                        <h2 class="mb-0">{{ user.login }}</h2>
                    </div>
                </div>
                <nav class="d-flex flex-column mt-4" v-if="this.isCheck">
                    <ul class="ps-0 gap-1 d-flex flex-column">
                        <li class="fw-bold mb-1">Действия: </li>
                        <li><router-link :to="`/UpdateProfile?login=${user.login}`">Изменить данные
                                профиля</router-link></li>
                        <li><router-link :to="`/CreateProduct?author=${user.login}`">Создать объявление</router-link>
                        </li>
                        <li><a href="https://vk.com/ivangorbenko52" target="_blank">Связаться с нами</a></li>
                        <li><a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"
                                target="_blank">Сообщить об ошибке</a></li>
                        <li role="button" @click="logout" class="text-danger">Выйти из аккаунта</li>
                    </ul>
                </nav>

                <button class="btn right-menu-btn d-none" type="button" data-bs-toggle="offcanvas" v-if="isCheck"
                    data-bs-target="#offcanvasTop" aria-controls="offcanvasTop"><img src="../assets/close.svg" alt="x">
                </button>

                <div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop"
                    aria-labelledby="offcanvasRightLabel">
                    <div class="offcanvas-header">
                        <h5 class="offcanvas-title mb-2" id="offcanvasRightLabel">Действия: </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body">
                        <ul class="ps-0 gap-1 d-flex flex-column">
                            <li><router-link :to="`/UpdateProfile?login=${user.login}`">Изменить данные
                                    профиля</router-link></li>
                            <li><router-link :to="`/CreateProduct?author=${user.login}`">Создать
                                    объявление</router-link></li>
                            <li><a href="https://vk.com/ivangorbenko52" target="_blank">Связаться с нами</a></li>
                            <li><a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"
                                    target="_blank">Сообщить об ошибке</a></li>
                            <li @click="logout" class="text-danger">Выйти из аккаунта</li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
        <div class="right-side ms-5">
            <div class="about-block p-3 border border-2 border-dark rounded-3 fs-5 mb-3">
                <ul class="d-flex flex-column gap-2">
                    <li>Всем привет! Меня зовут <b>{{ user.login }}!</b></li>
                    <li>Я тут <b>{{ user.role }}</b>!</li>
                    <li @click="this.$router.push({ name: 'UserReviews', params: { login: this.$route.query.login } })">
                        <a href="#">Посмотрите мои отзывы!</a>
                    </li>
                    <li>Надеюсь произвести на вас впечатление!</li>
                </ul>
            </div>
            <span class="text-muted mt-1">Аккаунт создан: {{ user.createdAt }}</span>

            <h2>Мои объявления: </h2>
            <div class="d-flex justify-content flex-wrap gap-3" v-if="this.products.length != 0">
                <div class="card d-flex flex-column gap-3" v-for="product in products">
                    <router-link :to="`/Product?id=${product._id}`">
                        <div class="image-block text-center mx-auto"><img class="mx-auto my-auto" :src="product.image"
                                :alt="product.title"></div>
                        <div class="product-info d-flex flex-column gap-1">
                            <h5 class="mb-0">{{ product.title.substring(0, 30) }}</h5>
                            <div class="d-flex gap-2 align-items-center">
                                <span class="text-muted">{{ product.category }}</span>
                                <span v-if="product.isGood" class="badge text-bg-success w-fit">Новая</span>
                                <span v-else class="badge text-bg-secondary w-fit">Б/У</span>
                            </div>
                            <b class="fs-5">{{ product.price }} руб.</b>
                        </div>
                    </router-link>
                </div>
            </div>
            <div v-else>
                <span class="text-muted fs-4">Тут пока пусто)</span>
            </div>
        </div>
    </div>

    <h2 v-if="error">{{ error }}</h2>
    <Footer />
</template>

<style scoped>
router-link:hover {
    color: #000 !important;
}

.profile-container {
    min-height: calc(100vh - 325px);
    width: 100% !important;
}

.info-block img {
    max-width: 60px !important;
    max-height: 60px !important;
}

.image-block {
    width: 150px;
    height: 150px;
}

.image-block img {
    max-width: 150px;
    max-height: 150px;
}

.card {
    transition: all 300ms;
    max-width: 23.85%;
}

.card:hover,
.card a {
    transform: translateY(-12px);
    color: #000 !important;
}

@media (max-width: 1224px) {
    .card {
        transition: all 300ms;
        width: 100% !important;
    }

    .right-side {
        margin: 0 0 !important;
    }

    .profile-container {
        display: block !important;
        padding: 10px 10px !important;
    }

    .about-block {
        padding: 10px 0 !important;
    }

    .about-block ul {
        font-size: 14px;
    }

    nav {
        display: none !important;
    }

    .left-side {
        border: none !important;
    }

    .right-menu-btn {
        display: flex !important;
    }

    .wrapper-window {
        display: flex;
    }
}
</style>