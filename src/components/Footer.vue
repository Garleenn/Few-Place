<script>
export default {
    data() {
        return {

        }
    }
}
</script>

<template>
        <div class="footer-container d-flex p-3 pt-4 text-4 flex-column justify-content-center mt-3">
            <ul class="d-flex align-items-center justify-content-evenly">
                <li><a href="#">О нас</a></li>
                <li><a href="#">Гарантии</a></li>
                <li><a href="#">Соц. Сети</a></li>
                <li><a href="#">Лицензионное соглашение</a></li>
                <li><a href="#">Политика конфидициальности</a></li>
            </ul>
            <span class="text-center mt-2 text-4">Все права защищены ©</span>
        </div>
</template>

<style scoped>
.footer-container {
    border-top: 2px solid #000 !important;
}
@media (max-width: 768px) {
    .footer-container {
        padding: 12px 32px;
        font-size: 16px;
        flex-direction: column;
        text-align: center;
    }

    ul {
        display: block !important;
    }

    span {
        font-size: 16px !important;
    }
}
</style>