import axios from 'axios';

class AddService {

    baseUrl = 'http://localhost:8080/AddressBook';

    createNewContact(data) {
        return axios.post(`${this.baseUrl}/add`, data);
    }

    getContactById(id) {
        return axios.get(`${this.baseUrl}/getbyid/${id}`);
    }

    getAllContacts() {
        return axios.get(`${this.baseUrl}/getAll`);
    }

    updateContactById(id, data) {
        return axios.put(`${this.baseUrl}/updatebyid/${id}`, data);
    }

    deleteContactById(id) {
        return axios.delete(`${this.baseUrl}/deletebyid/${id}`)
    }

}
export default new AddService()