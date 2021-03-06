import React, 
{ 
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react';
import * as AuthSession from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { REDIRECT_URI } = process.env; 
const { ESCOPE } = process.env; 
const { RESPONSE_TYPE } = process.env; 
const { CDN_IMAGE } = process.env; 
const { CLIENT_ID } = process.env;

import { api } from '../services/api';
import { COLLECTION_APPOINTMENTS, COLLECTION_USERS } from '../configs/storage';

type User = {
  id: string;
  username: string;
  firstName: string;
  avatar: string;
  email: string;
  token: string;
}

type AuthorizationResponse = AuthSession.AuthSessionResult & {
  params: {
    access_token?: string;
    error?: string;
  }
}

type AuthContextData = {
  user: User;
  signIn: () => Promise<void>;
  loading: boolean;
  signOut: () => Promise<void>;
}

type AuthProviderProps = {
}

export const AuthContext = createContext({} as AuthContextData);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({} as User)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUserStorageData();

  async function loadUserStorageData() {
      const storage = await AsyncStorage.getItem(COLLECTION_USERS);
      if(storage) {
        const userLogged = JSON.parse(storage) as User;
        api.defaults.headers.authorization = `Bearer ${userLogged.token}`;
        setUser(userLogged);
      }
    }
  }, [])

  const signIn = useCallback(async () => {
    try {
      setLoading(true);

      const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${ESCOPE}`;

      const { type, params } = await AuthSession.
        startAsync({ authUrl }) as AuthorizationResponse;

      if(type === 'success' && !params.error) {
        api.defaults.headers.authorization = `Bearer ${params.access_token}`;
        const userInfo = await api.get('/users/@me');

        const firstName = userInfo.data.username.split(' ')[0];
        userInfo.data.avatar = `${CDN_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png`;

        const userData = {
          ...userInfo.data,
          firstName,
          token: params.access_token
        }
        await AsyncStorage.setItem(COLLECTION_USERS, JSON.stringify(userData));
        setUser(userData);
      }
    } catch (error) {
      throw new Error('N??o foi poss??vel autenticar');
    } finally {
      setLoading(false);  
    }
  }, [])

  const signOut = useCallback(async () => {
    setUser({} as User);
    await AsyncStorage.multiRemove([
      COLLECTION_USERS,
      COLLECTION_APPOINTMENTS
    ]);
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      signIn,
      loading,
      signOut
    }}>
      { children }
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth }