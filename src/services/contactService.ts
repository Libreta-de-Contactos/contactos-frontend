import axios from '../config/axiosConfig.js';

interface ContactAttributes {
  id?: number;
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  cellPhone?: number;
  address?: string;
  photo?: string;
}

class ContactService {


  async createContact(contact: ContactAttributes): Promise<void> {
    const userStr = localStorage.getItem('user');
    if (userStr !== null) {
      const user = JSON.parse(userStr);
      const newContact: ContactAttributes = {
        userId: user.id,
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email,
        phone: contact.phone,
        cellPhone: contact.cellPhone,
        address: contact.address,
        photo: contact.phone,
      }; 

      console.log(newContact)

      const response = await axios.post<ContactAttributes>('contact/create', newContact as Object, {
        headers: { Authorization: `Bearer ${this.getToken()}` }
      });

    } 

    
  }

  async getContacts(): Promise<ContactAttributes[]> {
    const response = await axios.get<ContactAttributes[]>('/contact/getAll', {
      headers: { Authorization: `Bearer ${this.getToken()}` }
    });
    return response.data;
  }

  async getContactById(id: number): Promise<ContactAttributes> {
    const response = await axios.get<ContactAttributes>(`/contact/getById/${id}`, {
      headers: { Authorization: `Bearer ${this.getToken()}` }
    });
    return response.data;
  }

  async updateContact(id: number, contact: Partial<ContactAttributes>): Promise<ContactAttributes> {
    const response = await axios.put<ContactAttributes>(`contact/update/${id}`, contact, {
      headers: { Authorization: `Bearer ${this.getToken()}` }
    });
    return response.data;
  }

  async deleteContact(id: number): Promise<void> {
    await axios.delete(`contact/delete/${id}`, {
      headers: { Authorization: `Bearer ${this.getToken()}` }
    });
  }

  private getToken(): string | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).token : null;
  }
}

export default new ContactService();