<template>
  <div v-if="show" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
    <div class="w-1/2 bg-white pt-5 text-black flex flex-col rounded-lg shadow-lg">
      <h2 class="text-2xl text-black mb-4 mx-auto">Add Contact</h2>
      <form @submit.prevent="submitForm">
        <div class="w-full flex justify-center space-x-10">
          <div class="my-4 w-[35%]">
            <label class="block text-gray-700">First Name</label>
            <input v-model="firstName" type="text" class="border rounded-md border-gray-300 p-2 w-full" required>
          </div>
          <div class="my-4 w-[35%]">
            <label class="block text-gray-700">Last Name</label>
            <input v-model="lastName" type="text" class="border rounded-md border-gray-300 p-2 w-full" required>
          </div>
        </div>
        <div class="w-full flex justify-center space-x-10">
          <div class="mb-4 w-[35%]">
            <label class="block text-gray-700">Email</label>
            <input v-model="email" type="email" class="border rounded-md border-gray-300 p-2 w-full" required>
          </div>
          <div class="mb-4 w-[35%]">
            <label class="block text-gray-700">Phone</label>
            <input v-model="phone" type="text" class="border rounded-md border-gray-300 p-2 w-full">
          </div>
        </div>
        <div class="w-full flex justify-center space-x-10">
          <div class="mb-4 w-[35%]">
            <label class="block text-gray-700">Cell Phone</label>
            <input v-model="cellPhone" type="number" class="border rounded-md border-gray-300 p-2 w-full">
          </div>
          <div class="mb-4 w-[35%]">
            <label class="block text-gray-700">Address</label>
            <input v-model="address" type="text" class="border rounded-md border-gray-300 p-2 w-full">
          </div>
        </div>
        <div class="w-[76%] mb-4 mx-auto text-black">
          <label class="block text-gray-700">Photo</label>
          <input @change="handleFileUpload" type="file" class="border rounded-md border-gray-300 p-2 w-full">
        </div>
        <div class="flex justify-center my-8">
          <button type="button" @click="closeModal" class="bg-red-400 hover:bg-red-600 w-32 font-bold text-white py-2 px-4 rounded mr-2">Cancel</button>
          <button type="submit" class="bg-green-400 hover:bg-green-600 w-32 font-bold text-white py-2 px-4 rounded">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { defineComponent, watch } from 'vue';

export default defineComponent({
  props: {
    show: {
      type: Boolean,
      required: true
    },
    contact: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      id: null,
      userId: null,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      cellPhone: null,
      address: '',
      photo: null
    };
  },
  watch: {
    contact: {
      handler(newContact) {
        if (newContact) {
          this.id = newContact.id || null;
          this.userId = newContact.userId || null
          this.firstName = newContact.firstName || '';
          this.lastName = newContact.lastName || '';
          this.email = newContact.email || '';
          this.phone = newContact.phone || '';
          this.cellPhone = newContact.cellPhone || null;
          this.address = newContact.address || '';
          // Assuming photo is a URL or some string representation
          this.photo = newContact.photo || null;
        } else {
          this.resetForm();
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      this.photo = file;
    },
    submitForm() {
      const contact = {
        id: this.id,
        userId: this.userId,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phone: this.phone,
        cellPhone: this.cellPhone,
        address: this.address,
        photo: this.photo
      };
      this.$emit('save', contact);
      this.closeModal();
    },
    resetForm() {
      this.firstName = '';
      this.lastName = '';
      this.email = '';
      this.phone = '';
      this.cellPhone = null;
      this.address = '';
      this.photo = null;
    }
  }
});
</script>
