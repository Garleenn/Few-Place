<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3005'

import dayjs from 'dayjs';

export default {
    components: { Header, Footer },
    data() {
        return {
            product: {},

            error: '',
            action: '',
            inCart: 'Добавить в корзину!',

            isAdded: false
        }
    },
    mounted() {
        this.loadProduct();
    },
    methods: {
        async loadProduct() {
            let res = await axios.get(`/product?id=${this.$route.query.id}`);
            this.product = res.data;
            this.dayJs();
        },

        async addToCart() {
            try {
                await axios.post('/cart', {
                    id: this.product._id,
                    title: this.product.title,
                    description: this.product.description,
                    brand: this.product.brand,
                    price: this.product.price,
                    category: this.product.category,
                    image: this.product.image,
                    isGood: this.product.isGood,
                    countHas: this.product.countHas,
                });
                this.isAdded = true;
                this.inCart = 'Добавленно!'
            } catch (err) {
                this.isAdded = true;
                this.inCart = 'Товар уже в корзине!'
                this.error = `Невозможно добавить товар! Код ошибки: ${err.response.status}`;
            }
        },

        async deleteProduct() {
            try {
                await axios.delete('/products', {
                    params: {
                        id: this.product._id,
                    }
                });
                window.location.href = `http://localhost:5173/`;
            } catch(err) {
                this.error = `Произошла ошибка. Код ошибки: ${err.response.status}`;
            }
        },

        dayJs() {
            let day = dayjs(this.product.createdAt).format('DD.MM.YYYY в HH:mm');
            this.product.createdAt = day;
        }
    }
}
</script>

<template>
    <Header />
    <div class="card-container d-flex justify-content-center flex-row gap-5">
        <div class="img-block d-flex flex-column gap-2">
            <img class="border rounded-5 p-3" :src="product.image" :alt="product.title">
            <i>Объявление создано: {{ product.createdAt }}</i>
        </div>
        <div class="info-container d-flex flex-column gap-2">
            <img class="brand-image" :src="product.brandImage" :alt="product.brand">
            <h2>{{ product.title }}</h2>
            <p class="text-muted mb-0">{{ product.description }}</p>
            <span>Категория: {{ product.category }}</span>
            <span v-if="product.isGood" class="d-flex align-items-center gap-2">Состояние:
                <span class="badge text-bg-success w-fit">Новая</span>
            </span>
            <span class="d-flex align-items-center gap-2" v-else>Состояние:
                <span class="badge text-bg-secondary w-fit">Б/У</span>
            </span>
            <span class="d-flex align-items-center gap-2">Автор:
                <span class="w-fit"><router-link :to="`/Profile?login=${product.author}&amI=false`">{{ product.author }}</router-link></span>
            </span>
            <span>В наличии: {{ product.countHas }}</span>
            <b class="fs-3">{{ product.price }} рублей</b>
            <button v-if="this.$route.query.itsMine == 'false'" :disabled="isAdded" @click="addToCart" type="button" class="btn btn-outline-primary">
                {{ inCart }}</button>
            <button v-else disabled type="button" class="btn btn-outline-primary">Это ваш товар</button>
            <h4 v-if="error" class="text-danger">{{ error }}</h4>
            <div class="btn-group" v-if="this.$route.query.itsMine == 'true'">
                <button type="button" class="btn btn-outline-primary">Действие</button>
                <button type="button" class="btn btn-outline-primary dropdown-toggle dropdown-toggle-split"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    <span class="visually-hidden">Toggle Dropdown</span>
                </button>
                <ul class="dropdown-menu">
                    <li><button type="button" class="dropdown-item">Редактировать</button></li>
                    <li><button type="button" class="dropdown-item" @click="deleteProduct">Удалить</button></li>
                </ul>
            </div>
        </div>
    </div>
    <Footer />
</template>

<style scoped>
.card-container {
    min-height: calc(100vh - 325px);
}

.img-block img {
    max-width: 600px;
    max-height: 700px;
}

.brand-image {
    max-width: 600px;
    max-height: 200px;
}

@media (max-width: 1124px) {
    .card-container {
        flex-direction: column !important;
        margin: 0 20px;
        gap: 20px !important;
    }

    .brand-image {
        display: none !important;
    }

    .img-block img {
        max-width: 100%;
        max-height: 100%;
    }
}
</style>