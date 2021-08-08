<template>
    <div class="home flex_start_0">
        <div class="slide-main">
            <Slide></Slide>
        </div>
        <div class="right_main flex_1">
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive" :key="$route.fullPath" id="router-view"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive" :key="$route.fullPath" id="router-view"></router-view>
        </div>
    </div>
</template>

<script>
// import {mapActions,mapState, mapGetters} from 'vuex';
// @ is an alias to /src
import Slide from '@/components/slide.vue'

export default {
    name: 'Home',
    components: {
        Slide
    },
    created(){},
}
</script>
<style scoped>
.home{
    color: #2c3e50;
    background-color: #f5f5f5;
}
    .slide-main{width:200px;background: linear-gradient(0.02deg, #96D6FF -64.3%, #7977FE 100.55%);min-height: 100vh;padding: 20px 0;}
</style>
