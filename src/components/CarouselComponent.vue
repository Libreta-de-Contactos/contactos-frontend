<template>
  <Carousel class="w-[85%]" :items-to-show="4.5" :wrap-around="true" >
    <Slide v-for="(item, index) in items" :key="index">
      <div class="carousel__item flex justify-end ">
        <div class="h-[350px] w-[240px] bg-green-400 shadow-md rounded-lg">
          <h2 class="text-xl font-bold mb-2">{{ item.title }}</h2>
          <p class="text-gray-700">{{ item.description }}</p>
        </div>
        
      </div>
    </Slide>

    <template #addons>
      <Navigation />
    </template>
  </Carousel>
</template>

<script>
import { defineComponent } from 'vue';
import { Carousel, Navigation, Slide } from 'vue3-carousel';

import 'vue3-carousel/dist/carousel.css';

export default defineComponent({
  name: 'WrapAround',
  components: {
    Carousel,
    Slide,
    Navigation,
  },
  props: {
    items: {
      type: Array,
      required: true
    }
  }
});
</script>
