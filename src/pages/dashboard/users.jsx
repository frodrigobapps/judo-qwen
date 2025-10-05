import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/layout/Layout';
import AdminPanel from '../../components/dashboard/AdminPanel';

export default function UsersDashboard({ supabase }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      
      // Verificar rol
      const { data: userData, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single();

      if (error || userData?.role !== 'admin') {
        router.push('/dashboard/content');
        return;
      }

      setUser(user);
      setLoading(false);
    };

    checkUser();
  }, [supabase, router]);

  if (loading) return null;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdminPanel supabase={supabase} />
      </div>
    </Layout>
  );
}
