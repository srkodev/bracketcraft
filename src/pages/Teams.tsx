
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Search, UserPlus, Crown, Share2, Trophy, AlertCircle, ArrowLeft } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Layout from '@/components/Layout';

// Données de tournois fictifs (référence)
const TOURNAMENTS = [
  { id: 1, name: "Coupe de France E-Sport 2023" },
  { id: 2, name: "League of Legends Championship" },
  { id: 3, name: "Tournoi de Tennis Municipal" },
  { id: 4, name: "Coupe Inter-Entreprises de Football" },
];

// Données d'équipes fictives liées aux tournois
const TEAMS_DATA = [
  {
    id: 1,
    name: "Les Invincibles",
    leader: "Martin Dupont",
    leaderAvatar: "https://randomuser.me/api/portraits/men/1.jpg",
    members: 6,
    wins: 5,
    tournamentId: 1,
    logo: "https://source.unsplash.com/random/100x100/?logo"
  },
  {
    id: 2,
    name: "Team Phoenix",
    leader: "Sophie Martin",
    leaderAvatar: "https://randomuser.me/api/portraits/women/1.jpg",
    members: 4,
    wins: 3,
    tournamentId: 1,
    logo: "https://source.unsplash.com/random/100x100/?phoenix"
  },
  {
    id: 3,
    name: "Les Stratèges",
    leader: "Antoine Bernard",
    leaderAvatar: "https://randomuser.me/api/portraits/men/2.jpg",
    members: 5,
    wins: 2,
    tournamentId: 2,
    logo: "https://source.unsplash.com/random/100x100/?strategy"
  },
  {
    id: 4,
    name: "Équipe Alpha",
    leader: "Julie Renard",
    leaderAvatar: "https://randomuser.me/api/portraits/women/2.jpg",
    members: 6,
    wins: 7,
    tournamentId: 2,
    logo: "https://source.unsplash.com/random/100x100/?alpha"
  },
  {
    id: 5,
    name: "Les Champions",
    leader: "Pierre Leclerc",
    leaderAvatar: "https://randomuser.me/api/portraits/men/3.jpg",
    members: 5,
    wins: 4,
    tournamentId: 3,
    logo: "https://source.unsplash.com/random/100x100/?champion"
  },
  {
    id: 6,
    name: "Team Omega",
    leader: "Marie Dubois",
    leaderAvatar: "https://randomuser.me/api/portraits/women/3.jpg",
    members: 4,
    wins: 2,
    tournamentId: 4,
    logo: "https://source.unsplash.com/random/100x100/?omega"
  }
];

// Type pour une équipe
interface Team {
  id: number;
  name: string;
  leader: string;
  leaderAvatar: string;
  members: number;
  wins: number;
  tournamentId: number;
  logo: string;
}

const Teams = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tournamentId = searchParams.get('tournamentId') ? Number(searchParams.get('tournamentId')) : null;
  const [searchTerm, setSearchTerm] = useState('');
  const [teams, setTeams] = useState<Team[]>([]);
  const [currentTournament, setCurrentTournament] = useState<{id: number, name: string} | null>(null);

  useEffect(() => {
    // Redirect if no tournamentId is provided
    if (!tournamentId) {
      navigate('/tournaments');
      return;
    }

    // Filtrer les équipes par tournoi et terme de recherche
    let filteredTeams = TEAMS_DATA;
    
    filteredTeams = filteredTeams.filter(team => team.tournamentId === tournamentId);
    const tournament = TOURNAMENTS.find(t => t.id === tournamentId);
    if (tournament) {
      setCurrentTournament(tournament);
    } else {
      // Redirect if tournament doesn't exist
      navigate('/tournaments');
      return;
    }
    
    if (searchTerm) {
      filteredTeams = filteredTeams.filter(team => 
        team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        team.leader.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setTeams(filteredTeams);
  }, [tournamentId, searchTerm, navigate]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Le filtrage est déjà géré par useEffect
  };

  // If no tournamentId is provided, this will redirect automatically
  if (!tournamentId || !currentTournament) {
    return null;
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center text-gray-500" 
                onClick={() => navigate('/tournaments')}
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Tournois
              </Button>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              Équipes - {currentTournament.name}
            </h1>
            <p className="mt-2 text-gray-600">
              Découvrez les équipes participant à ce tournoi
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link to={`/teams/create?tournamentId=${currentTournament.id}`}>
              <Button className="bg-tournament-blue hover:bg-blue-600">
                <UserPlus className="mr-2 h-4 w-4" />
                Inscrire une équipe
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
                placeholder="Rechercher une équipe..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button type="submit" className="bg-tournament-blue hover:bg-blue-600">
              Rechercher
            </Button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team) => (
            <Link to={`/teams/${team.id}?tournamentId=${team.tournamentId}`} key={team.id}>
              <Card className="h-full hover:shadow-md transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center gap-4">
                  <Avatar className="h-14 w-14 border-2 border-gray-200">
                    <AvatarImage src={team.logo} alt={team.name} />
                    <AvatarFallback>{team.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{team.name}</CardTitle>
                    <div className="flex items-center mt-1 text-sm text-gray-500">
                      <Crown className="mr-1 h-3.5 w-3.5 text-tournament-gold" />
                      <span>{team.leader}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Users className="mr-1 h-4 w-4 text-gray-400" />
                      <span>{team.members} membres</span>
                    </div>
                    <div className="flex items-center">
                      <Trophy className="mr-1 h-4 w-4 text-gray-400" />
                      <span>{team.wins} victoires</span>
                    </div>
                  </div>
                  <div className="flex -space-x-2">
                    {[...Array(Math.min(4, team.members))].map((_, index) => (
                      <Avatar key={index} className="border-2 border-white">
                        <AvatarImage src={`https://randomuser.me/api/portraits/${index % 2 ? 'women' : 'men'}/${index + 10}.jpg`} />
                        <AvatarFallback>?</AvatarFallback>
                      </Avatar>
                    ))}
                    {team.members > 4 && (
                      <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-white bg-gray-100 text-xs font-medium text-gray-500">
                        +{team.members - 4}
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="ghost" className="text-tournament-blue hover:bg-blue-50">
                    Voir l'équipe
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Share2 className="h-4 w-4 text-gray-500" />
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>

        {teams.length === 0 && (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              {currentTournament ? "Aucune équipe inscrite à ce tournoi" : "Aucune équipe trouvée"}
            </h3>
            <p className="mt-1 text-gray-500">
              {currentTournament 
                ? "Soyez le premier à inscrire votre équipe !" 
                : "Essayez de modifier vos critères de recherche ou sélectionnez un tournoi."}
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Teams;
