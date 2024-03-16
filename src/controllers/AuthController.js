class AuthController {
    constructor(model) {
      this.model = model;
    }
  
    handleLogin() {
      //const credentials = this.model.getCredentials();
      console.log('Credentials:');
      // Aqui você pode adicionar a lógica de autenticação, como enviar os dados para um servidor
    }
  }
  
  export default AuthController;