import { useEffect, useState } from 'react';
import { LocalStorageService } from '../utils/localStorageService';
import { isEmpty } from '../utils/utilFunctions';

const useAuth = () => {
    const [authData, setAuthData] = useState(() => {
        const data = LocalStorageService.get('auth')
        return data;
    });
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return !isEmpty(authData);
    }); 

    const logout = () => {
        setAuthData(null);
        setIsAuthenticated(false);
        LocalStorageService.clear();
    }
    
    return {isAuthenticated, authData, logout};
}

export default useAuth;