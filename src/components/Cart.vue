<script>
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3005'
export default {
  data() {
    return {
      products: [],
      isCheck: false,

      summ: 0
    }
  },
  mounted() {
    this.loadCart();
  },
  methods: {
    async loadCart() {
      let res = await axios.get(`/user`, {
        params: {
          login: this.$route.params.login
        }
      });
      this.check();
      this.products = res.data.cart;
      for(let i = 0; i< this.products.length; i++) {
        let item = this.products[i];
        this.summ += item.price;
      }
    },

    async deleteFromCart(id) {
      await axios.put('/cart-delete', {
          login: this.$route.params.login,
          id: id,
      });
      this.summ = 0;
      this.loadCart();
    },

    async check() {
        let res = await axios.get('/check', {
            params: {
                login: this.$route.params.login
            }
        });

        this.isCheck = res.data;
    },
  }
}
</script>

<template>
  <div class="cart-container mx-4" v-if="this.isCheck">
    <h2>Корзина: {{ summ }} рублей</h2>
    <hr>
    <div class="cards-container d-flex flex-column gap-3 mx-5">
      <span v-if="this.products.length == 0" class="text-muted text-2 m-5 py-5 text-center">
        Тут пока пусто, но ты можешь добавить что-нибудь в корзину и оно обязательно тут появится</span>
      <div class="card d-flex flex-row w-100 gap-5 align-items-center" v-for="product in products">
        <router-link :to="`/Product/${product.idProduct}`" class="d-flex flex-row w-100 gap-5 align-items-center">
          <img :src="product.image" :alt="product.title">
          <div class="info-container d-flex flex-column gap-2">
            <h3 class="mb-1">{{ product.title }}</h3>
            <p class="text-muted mb-0">{{ product.description }}</p>
            <span>Категория: {{ product.category }}</span>
            <span v-if="product.isGood" class="d-flex align-items-center gap-2">Состояние:
              <span class="badge text-bg-success w-fit">Новая</span>
            </span>
            <span class="d-flex align-items-center gap-2" v-else>Состояние:
              <span class="badge text-bg-secondary w-fit">Б/У</span>
            </span>
            <span class="brand d-flex align-items-center gap-2">Бренд: {{ product.brand }}</span>
            <span class="brand d-flex align-items-center gap-2">В наличии: {{ product.countHas }}</span>
            <b class="fs-3">{{ product.price }} рублей</b>
          </div>
        </router-link>
        <button class="btn btn-closes btn-outline-danger w-fit" @click="deleteFromCart(product._id)">
          <img src="../assets/cose.svg" alt="Close">
        </button>
      </div>
      <div class="bt mt-3 d-flex justify-content-end w-100" v-if="this.products.length != 0">
        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" target="_blank">
          <button type="button" class="btn btn-outline-primary p-2 px-5">Заказать!</button>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
router-link:hover,
a:hover {
  color: #000;
}

.cart-container {
  margin: 0 30px;
  min-height: calc(100vh - 330px);
}

.card img {
  width: 300px !important;
  max-height: 400px !important;
  text-align: center
}

.card {
  position: relative;
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

@media (max-width: 1024px) {
  .info-container p {
    display: none !important;
  }

  .card img {
    max-width: 100px !important;
    max-height: 120px !important;
  }

  .brand {
    display: none !important;
  }

  h3 {
    margin: 0 !important;
    font-size: 16px;
  }

  .card,
  router-link {
    font-size: 12px !important;
    gap: 0 !important;
    padding: 20px !important;
  }

  b {
    font-size: 16px !important;
  }
  .btn-closes {
    position: absolute;
    right: 7px !important;
    bottom: 7px !important;
    background-color: #fff;
    height: fit-content !important;
  }

  .btn-closes img {
    width: 15px !important;
    height: 15px !important;
    height: fit-content;
  }
  .cards-container {
    margin: 0 !important;
  }
}
</style>