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
    mounted() {
        this.infoProduct()
    },
    methods: {
        async infoProduct() {
            try {
                let res = await axios.get('/product', {
                    params: {
                        id: this.$route.query.id
                    }
                });

                this.title = res.data.title
                this.description = res.data.description, 
                this.price = res.data.price, 
                this.category = res.data.category, 
                this.image = res.data.image, 
                this.isGood = res.data.isGood, 
                this.brand = res.data.brand, 
                this.countHas = res.data.countHas,

                this.error = '';
            } catch (err) {
                this.error = err;
            }
        },

        async updProduct() {
            try {
                await axios.put('/products', {
                    title: this.title,
                    description: this.description, 
                    price: this.price, 
                    category: this.category, 
                    image: this.image, 
                    isGood: this.isGood, 
                    brand: this.brand, 
                    countHas: this.countHas,
                    id: this.$route.query.id,
                });
                this.error = 'Изменено!';
                this.$router.push('/');
            } catch (err) {
                this.error = err;
            }
        }
    }
}
</script>

<template>
<Header />
    <div class="content">
        <form @submit.prevent="updProduct"
            class="container px-5 py-3 border border-2 rounded-3 d-flex flex-column align-items-center">
            <h2>Изменить объявление</h2>
            <div class="mb-3">
                <label class="form-label">Изображение</label>
                <input type="text" class="form-control mb-2" v-model="image">
                <label class="form-label">Название</label>
                <input type="text" class="form-control mb-2" v-model="title">
                <div class="descr">
                    <label class="form-label">Описание</label>
                    <textarea type="text" class="form-control mb-2 pb-3" v-model="description" cols="20"></textarea>
                    <span class="text-muted symbol-counter">{{ description.length }} / 2000</span>
                </div>
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
.descr {
    position: relative;
}

.symbol-counter {
    position: absolute;
    bottom: 2px;
    right: 2px;
    font-size: 14px;
}
</style>