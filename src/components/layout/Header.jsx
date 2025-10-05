import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Header({ supabase }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (!supabase) return;
      
      const {  { user } } = await supabase.auth.getUser();
      if (!user) {
        setUser(null);
        setIsAdmin(false);
        return;
      }

      // Obtener rol del usuario
      const { data: userData, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error al obtener rol del usuario:', error);
        setUser(null);
        setIsAdmin(false);
        return;
      }

      setUser(user);
      setIsAdmin(userData?.role === 'admin');
    };

    fetchUser();
  }, [supabase]);

  const handleLogout = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">J</span>
            </div>
            <Link href="/">
              <a className="text-xl font-bold text-gray-900">Academia Judo Elite</a>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {user ? (
              <>
                <Link href="/dashboard/content">
                  <a className="text-gray-600 hover:text-red-600 font-medium">Contenido</a>
                </Link>
                {isAdmin && (
                  <>
                    <Link href="/dashboard/users">
                      <a className="text-gray-600 hover:text-red-600 font-medium">Usuarios</a>
                    </Link>
                    <Link href="/dashboard/upload">
                      <a className="text-gray-600 hover:text-red-600 font-medium">Subir Contenido</a>
                    </Link>
                  </>
                )}
                <button 
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-red-600 font-medium flex items-center space-x-1"
                >
                  <span>Salir</span>
                </button>
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                  <span className="text-red-800 font-semibold text-sm">
                    {user.email?.charAt(0).toUpperCase()}
                  </span>
                </div>
              </>
            ) : (
              <Link href="/login">
                <a className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                  Acceder
                </a>
              </Link>
            )}
          </nav>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            {user ? (
              <div className="space-y-4">
                <Link href="/dashboard/content">
                  <a className="block text-gray-600 hover:text-red-600 font-medium py-2">Contenido</a>
                </Link>
                {isAdmin && (
                  <>
                    <Link href="/dashboard/users">
                      <a className="block text-gray-600 hover:text-red-600 font-medium py-2">Usuarios</a>
                    </Link>
                    <Link href="/dashboard/upload">
                      <a className="block text-gray-600 hover:text-red-600 font-medium py-2">Subir Contenido</a>
                    </Link>
                  </>
                )}
                <button 
                  onClick={handleLogout}
                  className="block text-gray-600 hover:text-red-600 font-medium py-2 w-full text-left"
                >
                  Salir
                </button>
              </div>
            ) : (
              <Link href="/login">
                <a className="block bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700
