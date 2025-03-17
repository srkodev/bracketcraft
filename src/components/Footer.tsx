
import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Github, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <div className="flex items-center">
              <Trophy className="h-8 w-8 text-tournament-blue" />
              <span className="ml-2 font-bold text-lg text-gray-900">BracketCraft</span>
            </div>
            <p className="text-gray-500 text-base">
              Créez et gérez facilement vos tournois en ligne. Une plateforme simple, élégante et puissante.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <Github className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Plateforme</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link to="/tournaments" className="text-base text-gray-500 hover:text-tournament-blue">
                      Tournois
                    </Link>
                  </li>
                  <li>
                    <Link to="/teams" className="text-base text-gray-500 hover:text-tournament-blue">
                      Équipes
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard" className="text-base text-gray-500 hover:text-tournament-blue">
                      Tableau de bord
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link to="/faq" className="text-base text-gray-500 hover:text-tournament-blue">
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="text-base text-gray-500 hover:text-tournament-blue">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Légal</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link to="/privacy" className="text-base text-gray-500 hover:text-tournament-blue">
                      Confidentialité
                    </Link>
                  </li>
                  <li>
                    <Link to="/terms" className="text-base text-gray-500 hover:text-tournament-blue">
                      Conditions d'utilisation
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Entreprise</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link to="/about" className="text-base text-gray-500 hover:text-tournament-blue">
                      À propos
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 text-center">
            &copy; {new Date().getFullYear()} BracketCraft. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
