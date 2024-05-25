<script>
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3005';

export default {
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
                this.loadUser();
                this.comment = ``;
                this.raiting = ``;
            } catch(err) {
                this.error = err;
            }
        },

        async deleteReview(review) {
            await axios.put('/delete-review', {
                login: this.$route.params.login,
                id: review._id,
            });
            this.loadUser();
        }
    }
}
</script>

<template>
    <div class="profile-container container d-flex justify-content-start">
        <div class="left-side d-flex flex-column border-end px-3">
            <div class="flex-row wrapper-window align-items-center justify-content-between">
                <div class="main-block">
                    <router-link class="info-block d-flex gap-2 align-items-center" :to="`/Profile/${this.user.login}`">
                        <img class="rounded-circle" :src="user.avaImage" :alt="user.login">
                        <h2 class="mb-0">{{ user.login }}</h2>
                    </router-link>
                </div>
            </div>
        </div>

        <div class="right-side ms-5">
            <form class="send d-flex flex-column mb-3" @submit.prevent="addReview" v-if="this.isCheck == false && this.userNow">
                <router-link :to="`/Profile/${this.userNow.login}`" class="image-block d-flex gap-3 align-items-center mb-2">
                    <img class="my-auto rounded-circle" :src="userNow.avaImage" :alt="userNow.login">
                    <h5 class="mb-2">{{ userNow.login }}</h5>
                </router-link>
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
                    <router-link class="image-block d-flex flex-row align-items-center gap-3" :to="`/Profile/${review.user.login}`">
                        <img class="my-auto rounded-circle" :src="review.user.avaImage" :alt="review.user.login">
                        <h5 class="mb-0">{{ review.user.login }}</h5>
                    </router-link>
                    <div class="product-info d-flex flex-column gap-1">
                        <i class="mb-0">Оценка: {{ review.raiting }}</i>
                        <span class="fs-5 text-muted">{{ review.comment }}</span>
                    </div>
                    <button v-if="this.userNow.login == review.user.login" class="btn btn-closes btn-outline-danger w-fit" 
                    @click="deleteReview(review)">
                        <img src="../assets/cose.svg" alt="Close">
                    </button>
                </div>
            </div>
            <div v-else>
                <span class="text-muted fs-4">У пользователя нет отзывов</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
router-link img, .image-block img {
    width: 60px !important;
    height: 60px !important;
}

.btn-closes {
  position: absolute;
  bottom: 20px;
  right: 20px;
}

.btn-closes img {
  width: 30px !important;
  height: 30px !important;
  height: fit-content;
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
    max-width: 230px !important;
    max-height: 60px !important;
}


.image-block img {
    max-width: 50px;
    max-height: 50px;
}

.card {
    transition: all 300ms;
    width: 100%;
    padding-right: 100px;
}

.card:hover {
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