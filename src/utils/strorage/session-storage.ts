import { SessionStorageKeys } from '@/common/constant/session-storage-keys';

const setItem = (key: string, value: string) => {
  sessionStorage.setItem(key, value);
};

const getItem = (key: string) => {
  return sessionStorage.getItem(key);
};

const setObject = (key: string, value: any) => {
  const str = value ? JSON.stringify(value) : '';
  sessionStorage.setItem(key, str);
};

const getObject = (key: string) => {
  const str = sessionStorage.getItem(key);
  return str ? JSON.parse(str) : {};
};

const MySessionStorage = {
  setItem,
  getItem,
  setObject,
  getObject
};

export { SessionStorageKeys, MySessionStorage };
