import { useState } from 'react';
import Link from 'next/link';
import { Shield, Users, Trophy, Star, MapPin, Phone, Mail, Clock } from 'lucide-react';
import Layout from '../components/layout/Layout';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const features = [
    {
      icon: <Shield className="w-8 h-8 text-red-600" />,
      title: "Seguridad y Disciplina",
      description: "Entrenamiento seguro con instructores certificados y enfoque en la disciplina tradicional del judo."
    },
    {
      icon: <Users className="w-8 h-8 text-red-600" />,
      title: "Comunidad Unida",
      description: "Únete a una comunidad de judokas apasionados que comparten valores y objetivos comunes."
    },
    {
      icon: <Trophy className="w-8 h-8 text-red-600" />,
      title: "Competencias",
      description: "Preparación para competencias locales, nacionales e internacionales con entrenamiento especializado."
    }
  ];

  const classes = [
    { day: "Lunes", time: "18:00 - 20:00", level: "Principiantes", age: "12+" },
    { day: "Martes", time: "19:00 - 21:00", level: "Avanzado", age: "16+" },
    { day: "Miércoles", time: "17:00 - 19:00", level: "Intermedio", age: "12+" },
    { day: "Jueves", time: "18:00 - 20:00", level: "Principiantes", age: "12+" },
    { day: "Viernes", time: "19:00 - 21:00", level: "Avanzado", age: "16+" },
    { day: "Sábado", time: "10:00 - 12:00", level: "Todos", age: "8+" }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Domina el Arte del Judo</h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Únete a la academia líder en formación de judokas. Entrenamiento de calidad, valores tradicionales y comunidad comprometida.
            </p>
            <Link href="/login">
              <a className="bg-white text-red-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-block">
                Comienza Hoy
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Por Qué Elegirnos</h2>
            <p className="text-lg text-gray-600">Calidad, tradición y excelencia en cada aspecto de tu formación</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg text-center">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Horarios de Clases</h2>
            <p className="text-lg text-gray-600">Entrenamiento regular para todos los niveles y edades</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((classItem, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{classItem.day}</h3>
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                    {classItem.age}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">{classItem.time}</p>
                <span className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                  {classItem.level}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contáctanos</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-red-600" />
                    <span className="text-gray-600">Calle Principal 123, Ciudad Central</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-red-600" />
                    <span className="text-gray-600">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-red-600" />
                    <span className="text-gray-600">info@judoacademy.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-red-600" />
                    <span className="text-gray-600">Lunes a Sábado: 8:00 - 21:00</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Horario de Atención</h3>
                <ul className="space-y-2 text-gray-600">
                  <li><span className="font-medium">Lunes - Viernes:</span> 8:00 - 21:00</li>
                  <li><span className="font-medium">Sábado:</span> 8:00 - 14:00</li>
                  <li><span className="font-medium">Domingo:</span> Cerrado</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
