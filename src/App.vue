<template>
    <div class="container">
        
        <ItalyMap @select="checkRegione" :active="activeRegion" />

    </div>
</template>

<script>
import ItalyMap from './components/ItalyMap.vue'

export default {
    name: 'App',

    data(){
        return {
            activeRegion: null
        }
    },

    components: {
        ItalyMap
    },

    methods: {
        checkRegione(regione) {
            console.log('Click ok', regione);
            this.activeRegion = regione
        }
    }
}
</script>

<style lang="scss">
    .container {
        width: 960px;
        margin: auto;
        height: 100vh;
    }
</style>
