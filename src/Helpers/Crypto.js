import * as Crypto from 'expo-crypto';

// Função para gerar um salt aleatório
async function generateSalt(length) {
  try {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let salt = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      salt += charset[randomIndex];
    }
    return salt;
  } catch (error) {
    throw new Error('Erro ao gerar o salt:', error);
  }
}

// Função para criar o hash da senha com o salt
async function hashPassword(password, salt) {
  try {
    // Concatenando a senha com o salt
    const combinedString = `${password}${salt}`;

    // Gerando o hash
    const hashedPassword = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA512,
      combinedString
    );
    return hashedPassword;
  } catch (error) {
    console.error('Erro ao criar o hash da senha:', error);
    throw error;
  }
}


// Função para verificar se a senha corresponde ao hash
async function verifyPassword(password, storedHash, salt) {
  try {
    // Verificar se a senha fornecida corresponde ao hash armazenado no banco de dados
    const recreatedHash = await hashPassword(password, salt);

    return recreatedHash === storedHash;
  } catch (error) {
    throw new Error('Erro ao verificar a senha:', error);
  }
}
 
export {
  generateSalt,
  hashPassword,
  verifyPassword
};
