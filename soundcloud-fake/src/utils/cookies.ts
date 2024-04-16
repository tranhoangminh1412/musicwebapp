import Cookies from 'universal-cookie';

const cookies = new Cookies();

export function setCookie(name: string, value: string, options?: any) {
  cookies.set(name, value, options);
}

export function getCookie(name: string) {
  return cookies.get(name);
}

export function removeCookie(name: string) {
  cookies.remove(name);
}
