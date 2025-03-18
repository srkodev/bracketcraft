
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Search, Calendar, Users, Filter, Plus } from 'lucide-react';
import Layout from '@/components/Layout';

// Tournament status types
type TournamentStatus = 'En cours' | 'À venir' | 'Terminé';
type TournamentType = 'Élimination Simple' | 'Élimination Double';

// Extended tournament type
interface Tournament {
  id: number;
  title: string;
  organizer: string;
  date: string;
  teams: number;
  type: TournamentType;
  status: TournamentStatus;
  imageSrc: string;
}

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
  const [statusFilter, setStatusFilter] = useState<TournamentStatus | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<TournamentType | 'all'>('all');
  const [tournaments, setTournaments] = useState<Tournament[]>(TOURNAMENTS);

  const handleFilters = () => {
    let filtered = TOURNAMENTS.filter(tournament => {
      const matchesSearch = tournament.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tournament.organizer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || tournament.status === statusFilter;
      const matchesType = typeFilter === 'all' || tournament.type === typeFilter;
      
      return matchesSearch && matchesStatus && matchesType;
    });
    setTournaments(filtered);
  };

  React.useEffect(() => {
    handleFilters();
  }, [searchTerm, statusFilter, typeFilter]);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
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

        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
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
            <div className="flex flex-col md:flex-row gap-4">
              <Select
                value={statusFilter}
                onValueChange={(value) => setStatusFilter(value as TournamentStatus | 'all')}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="En cours">En cours</SelectItem>
                  <SelectItem value="À venir">À venir</SelectItem>
                  <SelectItem value="Terminé">Terminé</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={typeFilter}
                onValueChange={(value) => setTypeFilter(value as TournamentType | 'all')}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="Élimination Simple">Élimination Simple</SelectItem>
                  <SelectItem value="Élimination Double">Élimination Double</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Tournament Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tournaments.map((tournament) => (
            <Link to={`/tournaments/${tournament.id}`} key={tournament.id}>
              <Card className="h-full hover:shadow-lg transition-all duration-300 overflow-hidden group">
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                  <img 
                    src={tournament.imageSrc} 
                    alt={tournament.title} 
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className={`
                    absolute top-4 right-4 z-20 px-3 py-1 text-sm font-medium rounded-full
                    ${tournament.status === 'En cours' ? 'bg-green-500 text-white' : 
                      tournament.status === 'À venir' ? 'bg-blue-500 text-white' : 
                      'bg-gray-500 text-white'}
                  `}>
                    {tournament.status}
                  </div>
                </div>
                <CardHeader className="relative z-20 -mt-6">
                  <div className="bg-white rounded-lg p-4 shadow-md">
                    <CardTitle className="text-xl mb-2">{tournament.title}</CardTitle>
                    <p className="text-sm text-gray-500">{tournament.organizer}</p>
                  </div>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="mr-2 h-4 w-4 text-tournament-blue" />
                      <span>{tournament.date}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="mr-2 h-4 w-4 text-tournament-blue" />
                      <span>{tournament.teams} équipes</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Trophy className="mr-2 h-4 w-4 text-tournament-blue" />
                      <span>{tournament.type}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full text-tournament-blue hover:bg-blue-50 group-hover:bg-blue-50">
                    Voir les détails
                    <svg
                      className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
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
