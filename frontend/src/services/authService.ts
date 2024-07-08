// src/services/authService.js

/**
 * Realiza el inicio de sesión del usuario.
 * 
 * @param {string} email - Correo electrónico del usuario.
 * @param {string} password - Contraseña del usuario.
 * @returns {Promise<boolean>} - Retorna true si el inicio de sesión es exitoso, de lo contrario false.
 */
export const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      return response.ok;
    } catch (error) {
      console.error('Error logging in:', error);
      return false;
    }
  };
  
  /**
   * Registra un nuevo usuario.
   * 
   * @param {string} email - Correo electrónico del usuario.
   * @param {string} password - Contraseña del usuario.
   * @param {object} extraData - Datos adicionales para el registro.
   * @returns {Promise<boolean>} - Retorna true si el registro es exitoso, de lo contrario false.
   */
  export const register = async (email: string, password: string, extraData: object = {}): Promise<boolean> => {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, ...extraData }),
      });
      return response.ok;
    } catch (error) {
      console.error('Error registering:', error);
      return false;
    }
  };
  
  /**
   * Envía un correo electrónico para la recuperación de contraseña.
   * 
   * @param {string} email - Correo electrónico del usuario.
   * @returns {Promise<boolean>} - Retorna true si el correo de recuperación es enviado, de lo contrario false.
   */
  export const recoverPassword = async (email: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/recover', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      return response.ok;
    } catch (error) {
      console.error('Error recovering password:', error);
      return false;
    }
  };
  
  /**
   * Cierra la sesión del usuario.
   * 
   * @returns {Promise<void>} - Retorna una promesa que se resuelve cuando la sesión se ha cerrado.
   */
  export const logout = async (): Promise<void> => {
    try {
      await fetch('/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  
