<template>
  <div class="home">
      <logo msg="Yoel & Cohcav Transportation"/>
      <dashboard></dashboard>
  </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import Logo from '@/components/Logo.vue';
    import Dashboard from '@/components/dashboard/Index.vue';

    @Component({
  components: {
      Logo,
      Dashboard
  },
})
export default class Home extends Vue {}
</script>
