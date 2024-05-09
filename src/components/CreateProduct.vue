<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3005'
export default {
    components: { Header, Footer },
    data() {
        return {
            title: ``,
            description: ``,
            price: 100,
            category: ``,
            image: ``,
            isGood: false,
            brand: ``,
            countHas: 1,

            error: ``,
        }
    },
    methods: {
        async createProduct() {
            try {
                await axios.post('/products', {
                    title: this.title,
                    description: this.description, 
                    price: this.price, 
                    category: this.category, 
                    image: this.image, 
                    isGood: this.isGood, 
                    brand: this.brand, 
                    countHas: this.countHas,
                    author: this.$route.query.author,
                });
                this.error = 'Опубликованно!';
                window.location.href = `http://localhost:5173/`;
            } catch (err) {
                this.error = err;
            }
        },
    }
}
</script>

<template>
<Header />
    <div class="content">
        <form @submit.prevent="createProduct"
            class="container px-5 py-3 border border-2 rounded-3 d-flex flex-column align-items-center">
            <h2>Создать объявление</h2>
            <div class="mb-3">
                <label class="form-label">Изображение</label>
                <input type="text" class="form-control mb-2" v-model="image">
                <label class="form-label">Название</label>
                <input type="text" class="form-control mb-2" v-model="title">
                <label class="form-label">Описание</label>
                <textarea type="text" class="form-control mb-2" v-model="description"></textarea>
                <label class="form-label">Бренд</label>
                <input type="text" class="form-control mb-2" v-model="brand">
                <label class="form-label">Категория</label>
                <select class="form-select mb-2" v-model="category">
                    <option value="Техника">Техника</option>
                    <option value="Одежда">Одежда</option>
                    <option value="Для дома">Для дома</option>
                    <option value="Неопределённая">Неопределённая</option>
                </select>
                <label class="form-label">В наличии</label>
                <input type="number" class="form-control mb-2" v-model="countHas">
                <label class="form-label">Цена в рублях</label>
                <input type="number" class="form-control mb-2" v-model="price">
                <div class="form-check d-flex align-items-center gap-2">
                    <input class="form-check-input" type="checkbox" id="asNew" v-model="isGood">
                    <label class="form-check-label" for="asNew">Как новенький</label>
                </div>
                <div class="d-flex align-items-center mt-5 flex-column">
                    <button type="submit" class="btn btn-outline-success px-5">Опубликовать</button>
                    <span v-if="this.error" class="text-danger mt-2">{{ error }}</span>
                </div>
            </div>
        </form>
    </div>
<Footer />
</template>

<style scoped>
.content {
    min-height: calc(100vh - 325px);
}
</style>