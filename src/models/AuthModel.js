class AuthModel {
  constructor() {
    this.username = ''; // Adicionando o campo username
    this.email = '';
    this.password = '';
  }

  setUsername(username) { 
    this.username = username;
  }

  setEmail(email) {
    this.email = email;
  }

  setPassword(password) {
    this.password = password;
  }

  getCredentials() {
    return {
      username: this.username, 
      email: this.email,
      password: this.password,
    };
  }

  getUserData() {
    return {
      username: this.username,
      email: this.email,
      password: this.password,
    };
  }
}

export default AuthModel;
