import React, 
{ 
  createContext,
  useCallback,
  useContext,
  useState
} from 'react';
import * as AuthSession from 'expo-auth-session';

import { REDIRECT_URI, ESCOPE, RESPONSE_TYPE, CDN_IMAGE, CLIENT_ID } from '../configs';
import { api } from '../services/api';

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
    access_token: string;
  }
}

type AuthContextData = {
  user: User;
  signIn: () => Promise<void>;
  loading: boolean;
}

type AuthProviderProps = {
}

export const AuthContext = createContext({} as AuthContextData);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({} as User)
  const [loading, setLoading] = useState(false);

  const signIn = useCallback(async () => {
    try {
      setLoading(true);

      const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${ESCOPE}`;

      const { type, params } = await AuthSession.
        startAsync({ authUrl }) as AuthorizationResponse;

      if(type === 'success') {
        api.defaults.headers.authorization = `Bearer ${params.access_token}`;
        const userInfo = await api.get('/users/@me');

        const firstName = userInfo.data.username.split(' ')[0];
        userInfo.data.avatar = `${CDN_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png`;

        setUser({
          ...userInfo.data,
          firstName,
          token: params.access_token
        });

        console.log(user);
      }
      setLoading(false);  
    } catch (error) {
      throw new Error('Não foi possível autenticar');
    }
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      signIn,
      loading
    }}>
      { children }
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth }