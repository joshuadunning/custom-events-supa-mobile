import 'react-native-url-polyfill/auto';
import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { View } from 'react-native';
import { Session } from '@supabase/supabase-js';
import Account from './Views/Auth/Account';
import Auth from './Views/Auth/Login';

export default function App() {
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }, []);

    return (
        <View>
            {session && session.user ? (
                <Account key={session.user.id} session={session} />
            ) : (
                <Auth />
            )}
        </View>
    );
}
