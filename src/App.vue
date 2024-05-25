<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default {
    components: { Header, Footer }
}
</script>

<template>
    <Header v-if="this.$route.name != 'Main'"/>

    <routerView />

    <Footer />
</template>