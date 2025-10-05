import { useState } from 'react';

export default function UserTable({ users, onUserUpdate, supabase }) {
  const [editingId, setEditingId] = useState(null);
  const [editRole, setEditRole] = useState('');

  const handleEdit = (user) => {
    setEditingId(user.id);
    setEditRole(user.role);
  };

  const handleSave = async (userId) => {
    try {
      const { error } = await supabase
        .from('users')
        .update({ role: editRole })
        .eq('id', userId);

      if (error) throw error;
      
      onUserUpdate();
      setEditingId(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      try {
        const { error } = await supabase
          .from('users')
          .delete()
          .eq('id', userId);

        if (error) throw error;
        
        onUserUpdate();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rol
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fecha de Registro
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{user.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {editingId === user.id ? (
                  <select
                    value={editRole}
                    onChange={(e) => setEditRole(e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value="user">Usuario</option>
                    <option value="admin">Administrador</option>
                  </select>
                ) : (
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.role === 'admin'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {user.role}
                  </span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(user.created_at).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                {editingId === user.id ? (
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleSave(user.id)}
                      className="text-green-600 hover:text-green-900"
                    >
                      Guardar
                    </button>
                    <button 
                      onClick={() => setEditingId(null)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => handleEdit(user)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => handleDelete(user.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Eliminar
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
