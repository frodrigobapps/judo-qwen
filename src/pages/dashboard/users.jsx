import { useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import AdminPanel from '../../components/dashboard/AdminPanel';
import Layout from '../../components/layout/Layout';

export default function UsersDashboard() {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    // Check if user is admin
    if (user.user_metadata?.role !== 'admin') {
      router.push('/dashboard/content');
    }
  }, [user, router]);

  if (!user || user.user_metadata?.role !== 'admin') {
    return null;
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdminPanel />
      </div>
    </Layout>
  );
}
