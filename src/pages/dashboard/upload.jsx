import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/layout/Layout';

export default function UploadContent({ supabase }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [type, setType] = useState('video');
  const [category, setCategory] = useState('fundamentals');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
    };

    checkUser();
  }, [supabase, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (!file) {
        throw new Error('Por favor selecciona un archivo');
      }

      // Subir archivo a Supabase Storage
      const fileName = `${Date.now()}-${file.name}`;
      const { data, error: uploadError } = await supabase.storage
        .from('judo-content')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Obtener URL pública
      const { data: publicUrlData } = supabase.storage
        .from('judo-content')
        .getPublicUrl(fileName);

      // Guardar metadatos en tabla content
      const { error: insertError } = await supabase
        .from('content')
        .insert({
          title,
          type,
          url: publicUrlData.publicUrl,
          category,
          created_at: new Date().toISOString()
        });

      if (insertError) throw insertError;

      setSuccess('Contenido subido correctamente!');
      setTitle('');
      setFile(null);
      document.getElementById('file-input').value = '';
    } catch (err) {
      setError(err.message || 'Error al subir el contenido');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Subir Nuevo Contenido</h1>
          <p className="text-gray-600">Como administrador, puedes subir videos, documentos y otros recursos exclusivos.</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 text-green-700 p-3 rounded-lg mb-6">
            {success}
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Título
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Contenido
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="video">Video</option>
                <option value="document">Documento</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Categoría
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="fundamentals">Fundamentos</option>
                <option value="katas">Katas</option>
                <option value="competition">Competencia</option>
                <option value="nutrition">Nutrición</option>
                <option value="techniques">Técnicas</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Archivo (MP4, PDF, etc.)
              </label>
              <input
                id="file-input"
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                accept=".mp4,.pdf,.jpg,.jpeg,.png"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Subiendo...' : 'Subir Contenido'}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
