import '../styles/globals.css';
import { createClient } from '../lib/supabaseClient';
import { useState } from 'react';

export default function App({ Component, pageProps }) {
  const [supabase] = useState(() => createClient());

  return <Component {...pageProps} supabase={supabase} />;
}
