import jwtDecode from 'jwt-decode';

export let accessToken = '';

export const getAccessToken = () => accessToken;
export const setAccessToken = (token: string) => (accessToken = token);
export const isTokenValid = (token: string) => {
  if (!token) return false;
  try {
    const { exp } = jwtDecode(token);
    if (Date.now() >= exp * 1000) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
