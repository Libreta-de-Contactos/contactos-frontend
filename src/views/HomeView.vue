<template>
  <div class=" bg-fixed w-screen h-screen bg-white flex flex-col items-center justify-around">
    <button class="absolute right-5 top-5 text-red-800 bg-gray-300 hover:bg-red-600 hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    @click="logOut">
      Log out
    </button>
    <h1 class="text-5xl font-bold text-black block">Your Contacts</h1>

    <button class="text-white bg-green-400 hover:bg-green-500 hover:text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
      @click="createContact">
      Add Contact
    </button>
    <CarouselComponent :items="items" @delete="deleteContact" @edit="editContact"/>
    <ModalComponent :show="showModal" @close="showModal = false" @save="addContact"/>
    <ModalComponent :show="showModalEdit" :contact="contact"  @close="showModalEdit = false" @save="updateContact" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import CarouselComponent from '../components/CarouselComponent.vue';
import ModalComponent from '../components/ModalComponent.vue';
import contactService from '../services/contactService';
import authService from '@/services/authService';

export default {
  components: {
    CarouselComponent,
    ModalComponent,
  },
  setup() {
    const items = ref([]);
    const contact = ref();
    const showModal = ref(false);
    const showModalEdit = ref(false);
    const errorMessage = ref('');

    const loadContacts = async () => {
      try {
        const data = await contactService.getContacts();
        items.value = data; 
        console.log(data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
        errorMessage.value = 'Error fetching contacts.';
      }
    };

    onMounted(loadContacts);

    const createContact = () => {
      showModal.value = true;
    };

    const editContactMod = () => {
      showModalEdit.value = true;
    };

    const addContact = async (contact) => {
      try {
        const request= await contactService.createContact(contact);
        await loadContacts();
      } catch (error) {
        console.error('Error fetching contacts:', error);
        errorMessage.value = 'Error fetching contacts.';
      }
      console.log('New contact added:', contact);
      showModal.value = false;
    };

    const deleteContact = async (id) => {
      try {
        const request= await contactService.deleteContact(id);
        await loadContacts();
      } catch (error) {
        console.error('Error fetching contacts:', error);
        errorMessage.value = 'Error fetching contacts.';
      }
    };

    const editContact = async (id) => {
      try {
        contact.value = await contactService.getContactById(id);
        
        
      } catch (error) {
        console.error('Error fetching contacts:', error);
        errorMessage.value = 'Error fetching contacts.';
      }
      
      showModalEdit.value = true;
    };

    const updateContact = async (contact) => {
      try {
        const request= await contactService.updateContact(contact.id,contact);
        await loadContacts();
      } catch (error) {
        console.error('Error fetching contacts:', error);
        errorMessage.value = 'Error fetching contacts.';
      }
    };

    const logOut = ()=>{
      authService.logout();
      window.location.reload();
    };

    return {
      items,
      contact,
      showModal,
      showModalEdit,
      errorMessage,
      createContact,
      editContactMod,
      addContact,
      deleteContact,
      editContact,
      updateContact,
      logOut
    };
  },
};
</script>

<style scoped>
  .bg-fixed {
      background-image: url('../assets/images/home.jpg');
      background-size: 130%;
      background-repeat: no-repeat;
      background-attachment: fixed;
      background-position: 50% 100%;
  
    }
</style>
