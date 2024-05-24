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
            reviews: [],
            userNow: {},

            error: ``,

            comment: ``,
            raiting: null,

            isCheck: false,
        }
    },

    mounted() {
        this.loadUser();
        this.loadUserNow();
        this.check();
    },

    methods: {
        async loadUser() {
            try {
                let res = await axios.get('/user', {
                    params: {
                        login: this.$route.params.login,
                    },
                });
                this.user = res.data;
                this.reviews = res.data.reviews;
            } catch (err) {
                this.error = err;
            }
        },

        async loadUserNow() {
            let res = await axios.get('/session');
            this.userNow = res.data;
        },

        async check() {
            let res = await axios.get('/check', {
                params: {
                    login: this.$route.params.login
                }
            });
            this.isCheck = res.data;
        },

        async addReview() {
            if(this.comment != `` && this.raiting != null)
            try {
                await axios.put('/reviews', {
                    comment: this.comment,
                    raiting: this.raiting,
                    login: this.$route.params.login,
                });
                this.error = ``;
            } catch(err) {
                this.error = err;
            }
        }
    }
}
</script>

<template>
    <Header />
    <div class="profile-container container d-flex justify-content-start">
        <div class="left-side d-flex flex-column border-end px-3">
            <div class="flex-row wrapper-window align-items-center justify-content-between">
                <div class="main-block">
                    <div class="info-block d-flex gap-2 align-items-center">
                        <img :src="user.avaImage" :alt="user.login">
                        <h2 class="mb-0">{{ user.login }}</h2>
                    </div>
                </div>
            </div>
        </div>

        <div class="right-side ms-5">
            <form class="send d-flex flex-column mb-3" @submit.prevent="addReview" v-if="this.isCheck == false && this.userNow">
                <div class="image-block d-flex gap-3 align-items-center mb-2">
                    <img class="mx-auto my-auto" :src="userNow.avaImage" :alt="userNow.login">
                    <h5 class="mb-2">{{ userNow.login }}</h5>
                </div>
                <div class="product-info d-flex flex-column gap-1">
                    <input v-model="raiting" class="mb-0" type="number" min="1" max="5" placeholder="Оцена пользователя от 1 до 5">
                    <textarea v-model="comment" type="text" placeholder="Отзыв"></textarea>
                </div>
                <div class="btn-right d-flex justify-content-end mt-2">
                    <button type="submit" class="btn btn-outline-primary">Отправить!</button>
                </div>
                <span v-if="this.error" class="text-danger">{{ error }}</span>
            </form>

            <h2>Отзывы {{ user.login }}:</h2>
            <div class="d-flex justify-content flex-wrap gap-3" v-if="this.reviews.length != 0">
                <div class="card d-flex flex-column gap-3" v-for="review in reviews">
                    <!-- <router-link :to="`/Prifile?login=${review.user.login}`"> -->
                    <div class="image-block d-flex gap-3">
                        <img class="mx-auto my-auto" :src="review.user.avaImage" :alt="review.user.login">
                        <h5 class="mb-0">{{ review.user.login }}</h5>
                    </div>
                    <div class="product-info d-flex flex-column gap-1">
                        <i class="mb-0">Оценка: {{ review.raiting }}</i>
                        <span class="fs-5 text-muted">{{ review.comment }}</span>
                    </div>
                </div>
            </div>
            <div v-else>
                <span class="text-muted fs-4">У пользователя нет отзывов</span>
            </div>
        </div>
    </div>

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
    width: 50px;
    height: 50px;
}

.image-block img {
    max-width: 50px;
    max-height: 50px;
}

.card {
    transition: all 300ms;
    width: 100%;
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