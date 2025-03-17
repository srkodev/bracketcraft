
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Search, Calendar, Users, Filter, Plus } from 'lucide-react';
import Layout from '@/components/Layout';

// Données de tournois fictives
const TOURNAMENTS = [
  {
    id: 1,
    title: "Coupe de France E-Sport 2023",
    organizer: "eSport Federation",
    date: "15 Nov - 20 Déc 2023",
    teams: 32,
    type: "Élimination Double",
    status: "En cours",
    imageSrc: "https://source.unsplash.com/random/300x200/?esport"
  },
  {
    id: 2,
    title: "League of Legends Championship",
    organizer: "Gaming Pro League",
    date: "1 Jan - 15 Fév 2024",
    teams: 16,
    type: "Élimination Simple",
    status: "À venir",
    imageSrc: "https://source.unsplash.com/random/300x200/?gaming"
  },
  {
    id: 3,
    title: "Tournoi de Tennis Municipal",
    organizer: "Club Sportif de Lyon",
    date: "5 - 10 Oct 2023",
    teams: 24,
    type: "Élimination Simple",
    status: "Terminé",
    imageSrc: "https://source.unsplash.com/random/300x200/?tennis"
  },
  {
    id: 4,
    title: "Coupe Inter-Entreprises de Football",
    organizer: "Association Sportive Corporate",
    date: "20 - 30 Nov 2023",
    teams: 12,
    type: "Élimination Double",
    status: "En cours",
    imageSrc: "https://source.unsplash.com/random/300x200/?football"
  },
  {
    id: 5,
    title: "Tournoi International de Basketball",
    organizer: "Fédération Internationale de Basketball",
    date: "5 - 20 Déc 2023",
    teams: 8,
    type: "Élimination Simple",
    status: "À venir",
    imageSrc: "https://source.unsplash.com/random/300x200/?basketball"
  },
  {
    id: 6,
    title: "Championnat d'Échecs des Écoles",
    organizer: "Académie des Échecs",
    date: "15 - 16 Oct 2023",
    teams: 20,
    type: "Élimination Simple",
    status: "Terminé",
    imageSrc: "https://source.unsplash.com/random/300x200/?chess"
  }
];

const Tournaments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tournaments, setTournaments] = useState(TOURNAMENTS);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Filtrer les tournois en fonction du terme de recherche
    const filtered = TOURNAMENTS.filter(tournament => 
      tournament.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tournament.organizer.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setTournaments(filtered);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tournois</h1>
            <p className="mt-2 text-gray-600">
              Découvrez et rejoignez des tournois ou créez le vôtre.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link to="/tournaments/create">
              <Button className="bg-tournament-blue hover:bg-blue-600">
                <Plus className="mr-2 h-4 w-4" />
                Créer un tournoi
              </Button>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Rechercher un tournoi..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" type="button" className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                Filtres
              </Button>
              <Button type="submit" className="bg-tournament-blue hover:bg-blue-600">
                Rechercher
              </Button>
            </div>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tournaments.map((tournament) => (
            <Link to={`/tournaments/${tournament.id}`} key={tournament.id}>
              <Card className="h-full hover:shadow-md transition-shadow duration-300 overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={tournament.imageSrc} 
                    alt={tournament.title} 
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{tournament.title}</CardTitle>
                    <div className={`
                      px-2 py-1 text-xs font-medium rounded-full
                      ${tournament.status === 'En cours' ? 'bg-green-100 text-green-800' : 
                        tournament.status === 'À venir' ? 'bg-blue-100 text-blue-800' : 
                        'bg-gray-100 text-gray-800'}
                    `}>
                      {tournament.status}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">{tournament.organizer}</p>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center text-sm">
                      <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                      <span>{tournament.date}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="mr-2 h-4 w-4 text-gray-400" />
                      <span>{tournament.teams} équipes</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Trophy className="mr-2 h-4 w-4 text-gray-400" />
                      <span>{tournament.type}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full text-tournament-blue hover:bg-blue-50">
                    Voir les détails
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>

        {tournaments.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">Aucun tournoi trouvé</h3>
            <p className="mt-1 text-gray-500">Essayez de modifier vos critères de recherche.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Tournaments;
