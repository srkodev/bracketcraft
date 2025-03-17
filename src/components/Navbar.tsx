
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Trophy, Menu, X, Users, Home, Calendar } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Trophy className="h-8 w-8 text-tournament-blue" />
              <span className="ml-2 font-bold text-lg text-gray-900">BracketCraft</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link to="/" className="text-gray-700 hover:text-tournament-blue px-3 py-2 rounded-md text-sm font-medium">
                Accueil
              </Link>
              <Link to="/tournaments" className="text-gray-700 hover:text-tournament-blue px-3 py-2 rounded-md text-sm font-medium">
                Tournois
              </Link>
              <Link to="/teams" className="text-gray-700 hover:text-tournament-blue px-3 py-2 rounded-md text-sm font-medium">
                Équipes
              </Link>
              <Link to="/dashboard" className="text-gray-700 hover:text-tournament-blue px-3 py-2 rounded-md text-sm font-medium">
                Tableau de bord
              </Link>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-3">
              <Link to="/login">
                <Button variant="outline" className="border-tournament-blue text-tournament-blue hover:bg-tournament-blue hover:text-white">
                  Connexion
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-tournament-blue text-white hover:bg-blue-600">
                  Inscription
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-tournament-blue focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="flex items-center text-gray-700 hover:text-tournament-blue px-3 py-2 rounded-md text-base font-medium">
              <Home className="mr-2 h-5 w-5" />
              Accueil
            </Link>
            <Link to="/tournaments" className="flex items-center text-gray-700 hover:text-tournament-blue px-3 py-2 rounded-md text-base font-medium">
              <Trophy className="mr-2 h-5 w-5" />
              Tournois
            </Link>
            <Link to="/teams" className="flex items-center text-gray-700 hover:text-tournament-blue px-3 py-2 rounded-md text-base font-medium">
              <Users className="mr-2 h-5 w-5" />
              Équipes
            </Link>
            <Link to="/dashboard" className="flex items-center text-gray-700 hover:text-tournament-blue px-3 py-2 rounded-md text-base font-medium">
              <Calendar className="mr-2 h-5 w-5" />
              Tableau de bord
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5 space-x-3">
              <Link to="/login" className="w-full">
                <Button variant="outline" className="w-full border-tournament-blue text-tournament-blue hover:bg-tournament-blue hover:text-white">
                  Connexion
                </Button>
              </Link>
            </div>
            <div className="mt-3 px-5">
              <Link to="/register" className="w-full">
                <Button className="w-full bg-tournament-blue text-white hover:bg-blue-600">
                  Inscription
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
