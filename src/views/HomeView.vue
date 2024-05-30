
<template>
  <div class="w-screen h-screen bg-white flex flex-col items-center justify-around">
    <button class="absolute right-5 top-5 text-gray-900 bg-blue-300/20 hover:bg-green-400 hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
      Log out
    </button>
    <h1 class="text-5xl text-black block">Your Contacts</h1>

    <button class=" text-gray-700 bg-green-400 hover:bg-green-400 hover:text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">
      Add Contact 
    </button>
    <CarouselComponent :items="items"/>
    
  </div>
</template>


<script>
import CarouselComponent from '../components/CarouselComponent.vue';

export default {
  components: {
    CarouselComponent,
  },
  data() {
    return {
      items: [
        { title: 'Card 1', description: 'This is the first card.' },
        { title: 'Card 2', description: 'This is the second card.' },
        { title: 'Card 3', description: 'This is the third card.' },
        { title: 'Card 4', description: 'This is the fourth card.' },
        { title: 'Card 5', description: 'This is the fifth card.' },
        { title: 'Card 6', description: 'This is the sixth card.' },
        { title: 'Card 7', description: 'This is the seventh card.' },
        { title: 'Card 8', description: 'This is the eighth card.' },
        { title: 'Card 9', description: 'This is the ninth card.' },
        { title: 'Card 10', description: 'This is the tenth card.' },
      ]
    };
  }
};
</script>