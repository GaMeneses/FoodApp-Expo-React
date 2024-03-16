class AuthModel {
    constructor() {
      this.email = '';
      this.password = '';
    }
  
    setEmail(email) {
      this.email = email;
    }
  
    setPassword(password) {
      this.password = password;
    }
  
    getCredentials() {
      return {
        email: this.email,
        password: this.password,
      };
    }
  }
  
  export default AuthModel;