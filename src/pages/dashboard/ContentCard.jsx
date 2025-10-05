import { Video, FileText } from 'lucide-react';

export default function ContentCard({ item }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-48 bg-gray-200 flex items-center justify-center">
        <img
          src={item.url}
          alt={item.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            {item.type === 'video' ? (
              <><Video className="w-3 h-3 mr-1" /> Video</>
            ) : (
              <><FileText className="w-3 h-3 mr-1" /> Documento</>
            )}
          </span>
          <span className="text-xs text-gray-500">
            {new Date(item.created_at).toLocaleDateString()}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 capitalize">{item.category}</span>
          <button className="text-red-600 hover:text-red-700 text-sm font-medium">
            {item.type === 'video' ? 'Ver Video' : 'Descargar'}
          </button>
        </div>
      </div>
    </div>
  );
}
