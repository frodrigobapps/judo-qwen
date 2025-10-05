import '../styles/globals.css';
import { UserProvider } from '@supabase/auth-helpers-react';
import { supabase } from '../lib/supabaseClient';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider supabaseClient={supabase}>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
