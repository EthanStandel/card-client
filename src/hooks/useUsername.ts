import { useLocalStorageValue } from "@react-hookz/web";

export const USERNAME_STORAGE_KEY = "USERNAME_STORAGE_KEY";

const useUsername = () => {
  const [username, setUsername] =
    useLocalStorageValue<string>(USERNAME_STORAGE_KEY);
  return { username: username ?? "", setUsername };
};

export default useUsername;
