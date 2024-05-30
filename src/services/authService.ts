import axios from '../config/axiosConfig.js';

interface AuthResponse {
    id: number;
    token: string;
}

class AuthService {
    async login(username: string, password: string): Promise<AuthResponse> {
      const response = await axios.post<AuthResponse>('user/login', { username, password });
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    }
  
    logout() {
      localStorage.removeItem('user');
    }
  
    getCurrentUser(): AuthResponse | null {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    }
  
    async isAuthenticated(): Promise<boolean> {
        const user = this.getCurrentUser();
        if (user && user.token) {
          try {
            const response = await axios.get('/user/auth', {
              headers: { Authorization: `Bearer ${user.token}` }
            });
            if(response.status === 200){
                return true;
            }
            return false;
          } catch (error) {
            console.error('Authentication check failed:', error);
            return false;
          }
        }
        return false;
      }
  }
  
  export default new AuthService();