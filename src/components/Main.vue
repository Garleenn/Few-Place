<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3005'

export default {
    components: { Header, Footer },
    data() {
        return {
            products: [],

            sortPrice: null,
            sortData: null,
            isNew: null,
            category: null,

            sPrice: null,
            dPrice: null,
            title: null,

            is1: false, is2: false, is3: false, is4: false, is5: false, is6: false,
            empty: ``,       
        }
    },
    mounted() {
        this.loadProducts();
    },
    methods: {
        async loadProducts() {
            let res = await axios.get('/products');
            this.products = res.data;
        },
        async filterProducts() {
            let res = await axios.get(`/products`, {
                params: {
                    sortPrice: this.sortPrice,
                    sortData: this.sortData,
                    asNew: this.isNew,
                    sPrice: this.sPrice,
                    dPrice: this.dPrice,
                    category: this.category,
                    title: this.title,
                }
            });
            this.products = res.data;
            if(this.products.length == 0) {
                this.empty = 'По данным критериям товаров пока нет, но вы можете их добавить)';
            } else {
                this.empty = ``;
            }
        },
        async resetProducts() {
            this.is1 = false; this.is2 = false; this.is3 = false; this.is4 = false; this.is5 = false; this.is6 = false;
            this.category = null;
            this.sPrice = null; this.dPrice = null;
            this.empty = ``;
            let res = await axios.get('/products');
            this.products = res.data;
        },
        productsTitle(title) {
            if(title.length != 0) {
                this.title = title;
                this.empty = ``;
                this.filterProducts();
            } else {
                this.empty = 'По данному запросу товаров пока нет, но вы можете их добавить)';
                this.title = null;
                this.filterProducts();
            }
        }
    }
}
</script>


<template>
    <Header @productsTitle="productsTitle"/>
    <div class="main-container mb-5">
        <button class="btn p-0 border-0 mb-3" type="button" data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling"><span role="button"
                class="fw-bold fs-4 d-flex gap-2 border p-2 rounded-3 w-fit">
                <img src="../assets/filters.svg" alt="Фильтры">Фильтры</span></button>

        <div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1"
            id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasScrollingLabel">Сортировать по...</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body d-flex flex-column gap-5">
                <div class="price-block d-flex flex-column gap-3">
                    <h5 class="mb-0">Цена:</h5>
                    <button type="button" @click="this.sortPrice = 1; this.is1 = true; this.is2 = false"
                        :class="{ 'active-btn': is1 }" class="btn btn-outline-primary">По возрастанию</button>
                    <button type="button" @click="this.sortPrice = -1; this.is2 = true; this.is1 = false"
                        :class="{ 'active-btn': is2 }" class="btn btn-outline-primary">По убыванию</button>
                    <input v-model="sPrice" type="number" placeholder="Цена от...">
                    <input v-model="dPrice" type="number" placeholder="Цена до...">
                </div>
                <div class="time-block d-flex flex-column gap-3">
                    <h5 class="mb-0">По дате:</h5>
                    <button type="button" @click="this.sortData = -1; this.is3 = true; this.is4 = false"
                        :class="{ 'active-btn': is3 }" class="btn btn-outline-primary">Сначала новые</button>
                    <button type="button" @click="this.sortData = 1; this.is4 = true; this.is3 = false"
                        :class="{ 'active-btn': is4 }" class="btn btn-outline-primary">Сначала старые</button>
                </div>
                <div class="time-block d-flex flex-column gap-3">
                    <h5 class="mb-0">По Качеству:</h5>
                    <button type="button" @click="this.isNew = false; this.is5 = true; this.is6 = false"
                        :class="{ 'active-btn': is5 }" class="btn btn-outline-primary">Только Б/У</button>
                    <button type="button" @click="this.isNew = true; this.is6 = true; this.is5 = false"
                        :class="{ 'active-btn': is6 }" class="btn btn-outline-primary">Только новые</button>
                    <h5 class="mb-0">Категория: </h5>
                    <select class="form-select" v-model="category" aria-label="Default select example">
                        <option selected="selected" :value="null">Выбирите категорию</option>
                        <option value="Техника">Техника</option>
                        <option value="Одежда">Одежда</option>
                        <option value="Для дома">Для дома</option>
                    </select>
                    <div class="buttons find-btn d-flex justify-content-between">
                        <button type="button" @click="resetProducts"
                            class="btn btn-outline-secondary mt-5 p-2">Сбросить</button>
                        <button type="button" @click="filterProducts"
                            class="btn btn-outline-primary mt-5 p-2">Найти</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="card-cont row gap-4 justify-content-center w-100">
            <span v-if="this.empty" class="text-muted text-center fs-2 mb-5 pb-2">{{ empty }}</span>
                <div class="card col-xxl-2 col-lg-3 col-md-4 col-sm-6 d-flex flex-column gap-3" v-for="product in products">
                    <div @click="this.$router.push({name: 'Product', params: {id: product._id}})">
                    <div class="image-block text-center mx-auto"><img class="mx-auto my-auto" :src="product.image"
                            :alt="product.title"></div>
                    <div class="product-info d-flex flex-column gap-1">
                        <h5 class="mb-0">{{ product.title }}</h5>
                        <div class="d-flex gap-2 align-items-center">
                            <span class="text-muted">{{ product.category }}</span>
                            <span v-if="product.isGood" class="badge text-bg-success w-fit">Новая</span>
                            <span v-else class="badge text-bg-secondary w-fit">Б/У</span>
                        </div>
                        <b class="fs-5">{{ product.price }} руб.</b>
                    </div>
                    </div>
                </div>
        </div>
    </div>
    <Footer />
</template>

<style lang="css" scoped>
router-link:hover, a:hover {
    color: #000;
}

.main-container {
  min-height: calc(100vh - 360px);
}

.image-block {
    width: 180px;
    height: 180px;
}

.image-block img {
    max-width: 180px;
    max-height: 180px;
}

.card {
    transition: all 300ms;
}

.card:hover {
    transform: translateY(-12px);
}

.main-container>button {
    margin-left: 20px !important;
    transition: all 300ms;
}

@media (min-width: 1624px) {
    .main-container>button {
        margin-left: 100px !important;
        transition: all 300ms;
    }
}

@media (max-width: 650px) {
    .card-cont {
        margin: 0 2px 0 2px !important;
    }
    .card {
        width: 90% !important
    }
}


.main-container>button:hover {
    background: rgb(202, 202, 202);
}

.find-btn {
    position: absolute;
    bottom: 10px;
    width: 90%
}

.active-btn {
    background-color: #7cfbff !important;
}
</style>