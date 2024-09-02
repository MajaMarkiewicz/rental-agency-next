'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode, Dispatch, SetStateAction } from 'react';
import { useSession } from 'next-auth/react';
import getUnreadMessageCount from '@/app/actions/getUnreadMessageCount';
import { log } from 'console';
interface GlobalContextType {
  unreadCount: number;
  setUnreadCount: Dispatch<SetStateAction<number>>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

export function GlobalProvider({ children }: GlobalProviderProps) {
  const [unreadCount, setUnreadCount] = useState<number>(0);

  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      console.log('useEffect');
      getUnreadMessageCount().then((res) => {
        console.log('res', res);
        if (res.unreadCount) setUnreadCount(res.unreadCount);
      });
    }
  }, [getUnreadMessageCount, session]);
  return (
    <GlobalContext.Provider
      value={{
        unreadCount,
        setUnreadCount,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
}
