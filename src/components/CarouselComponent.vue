<template>
  <Carousel class="w-[95%]" :items-to-show="5" :wrap-around="true" >
    <Slide v-for="(item, index) in items" :key="index">
      <div class="carousel__item flex justify-end">
        <div class="h-80 w-60 bg-gray-200 shadow-inner shadow-black rounded-lg p-4">
          <button class="absolute w-14 top-1 right-6  rounded-full text-white/80 bg-red-400 hover:bg-red-600 hover:text-white"
            @click="emitDelete(item.id)">
            delete</button>
          <button class="absolute w-14 top-1 left-6  rounded-full text-white/80 bg-blue-400 hover:bg-blue-600 hover:text-white"
            @click="emitEdit(item.id)">
            edit</button>
          <img v-if="item.photo" :src="item.photo" alt="Photo" class="h-24 w-24 rounded-full mx-auto mb-4"/>
          <h2 class="text-xl font-bold mb-2">{{ item.firstName }} {{ item.lastName }}</h2>
          <p class="text-gray-700 mb-2">Email: {{ item.email }}</p>
          <p v-if="item.phone" class="text-gray-700 mb-2">Phone: {{ item.phone }}</p>
          <p v-if="item.cellPhone" class="text-gray-700 mb-2">Cell Phone: {{ item.cellPhone }}</p>
          <p v-if="item.address" class="text-gray-700 mb-2">Address: {{ item.address }}</p>
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
import { defineComponent} from 'vue';
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
  },
  methods: {
    emitDelete(id) {
      this.$emit('delete', id);
    },
    emitEdit(id) {
      this.$emit('edit', id);
    },
  },
});
</script>
