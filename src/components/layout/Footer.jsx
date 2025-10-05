export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Academia Judo Elite</h3>
            <p className="text-gray-400">
              Formando campeones con valores, disciplina y tradición desde 2010.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <address className="not-italic text-gray-400">
              <p>Calle Principal 123</p>
              <p>Ciudad Central</p>
              <p className="mt-2">+1 (555) 123-4567</p>
              <p>info@judoacademy.com</p>
            </address>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Horarios</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Lunes - Viernes: 8:00 - 21:00</li>
              <li>Sábado: 8:00 - 14:00</li>
              <li>Domingo: Cerrado</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Academia Judo Elite. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
