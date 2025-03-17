
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Trophy, Users, Calendar, Shield, ArrowRight } from 'lucide-react';
import Layout from '@/components/Layout';

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-gradient">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div className="animate-slide-up">
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                Organisez vos tournois comme un pro
              </h1>
              <p className="mt-6 text-xl text-blue-100 max-w-3xl">
                BracketCraft vous offre tout ce dont vous avez besoin pour créer, 
                gérer et partager vos tournois en ligne facilement.
              </p>
              <div className="mt-10 sm:flex">
                <div className="rounded-md shadow">
                  <Link to="/register">
                    <Button size="lg" className="w-full sm:w-auto px-8 py-6 text-lg bg-white text-tournament-blue hover:bg-gray-100">
                      Commencer gratuitement
                    </Button>
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link to="/tournaments">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 py-6 text-lg border-white text-white hover:bg-white hover:text-tournament-blue">
                      Explorer les tournois
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-12 lg:mt-0 flex justify-center">
              <div className="relative mx-auto animate-fade-in">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 shadow-xl transform skew-y-6 sm:skew-y-0 sm:-rotate-6 rounded-3xl"></div>
                <div className="relative bg-white p-8 shadow-xl rounded-3xl">
                  <div className="grid grid-cols-2 gap-8">
                    <div className="col-span-2 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="font-semibold text-lg">Finale</div>
                        <div className="text-sm text-gray-500">14:00</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg flex justify-between items-center space-x-4">
                        <div className="font-medium">Team Alpha</div>
                        <div className="font-bold text-tournament-gold">3</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg flex justify-between items-center space-x-4">
                        <div className="font-medium">Team Omega</div>
                        <div className="font-bold">2</div>
                      </div>
                    </div>
                    
                    {/* Demi-finales */}
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Demi-finale 1</div>
                      <div className="text-xs text-gray-500 flex justify-between">
                        <span>Team Alpha</span>
                        <span className="font-semibold">2-1</span>
                        <span>Team Beta</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Demi-finale 2</div>
                      <div className="text-xs text-gray-500 flex justify-between">
                        <span>Team Omega</span>
                        <span className="font-semibold">2-0</span>
                        <span>Team Delta</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Tout ce dont vous avez besoin pour vos tournois
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-3xl mx-auto">
              Une plateforme complète pour créer, gérer et suivre vos tournois et équipes en toute simplicité.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white rounded-lg shadow-sm p-6 card-highlight">
              <div className="h-12 w-12 bg-blue-100 rounded-md flex items-center justify-center text-tournament-blue">
                <Trophy className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Types de tournois flexibles</h3>
              <p className="mt-2 text-gray-500">
                Simple ou double élimination, adaptez le format à vos besoins spécifiques.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 card-highlight">
              <div className="h-12 w-12 bg-blue-100 rounded-md flex items-center justify-center text-tournament-blue">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Gestion d'équipes</h3>
              <p className="mt-2 text-gray-500">
                Créez des équipes, invitez des membres et suivez vos performances.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 card-highlight">
              <div className="h-12 w-12 bg-blue-100 rounded-md flex items-center justify-center text-tournament-blue">
                <Calendar className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Planification intelligente</h3>
              <p className="mt-2 text-gray-500">
                Organisez vos matchs avec un calendrier intuitif et des notifications.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 card-highlight">
              <div className="h-12 w-12 bg-blue-100 rounded-md flex items-center justify-center text-tournament-blue">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Validation des résultats</h3>
              <p className="mt-2 text-gray-500">
                Système de validation des scores pour garantir l'équité des résultats.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 card-highlight" style={{ gridColumn: "span 2 / span 2" }}>
              <div className="h-12 w-12 bg-blue-100 rounded-md flex items-center justify-center text-tournament-blue">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Interface utilisateur intuitive</h3>
              <p className="mt-2 text-gray-500">
                Une plateforme moderne et réactive, accessible sur tous vos appareils pour une expérience utilisateur optimale.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-tournament-blue">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Prêt à commencer?</span>
            <span className="block text-blue-100">Créez votre premier tournoi dès aujourd'hui.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link to="/register">
                <Button size="lg" className="bg-white hover:bg-gray-50 text-tournament-blue">
                  Commencer maintenant
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
