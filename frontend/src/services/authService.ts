export const login = async (email: string, password: string): Promise<boolean> => {
  try {
    const response = await fetch('/api/auth/login', {
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

export const register = async (email: string, password: string, extraData: object = {}): Promise<boolean> => {
  try {
    const response = await fetch('/api/auth/register', {
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

export const recoverPassword = async (email: string): Promise<boolean> => {
  try {
    const response = await fetch('/api/auth/recover', {
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

export const logout = async (): Promise<void> => {
  try {
    await fetch('/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error logging out:', error);
  }
};

