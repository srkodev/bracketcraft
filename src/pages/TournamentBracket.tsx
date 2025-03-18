
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trophy, Crown, ArrowRight, Calendar, Clock, Users } from 'lucide-react';
import Layout from '@/components/Layout';
import { cn } from '@/lib/utils';

const TournamentBracket = () => {
  const { id } = useParams<{ id: string }>();
  const [currentRound, setCurrentRound] = useState('quarterfinals');

  // Données simulées pour un tournoi
  const tournament = {
    id: parseInt(id || '1'),
    name: "Coupe de France E-Sport 2023",
    organizer: "eSport Federation",
    dates: "15 Nov - 20 Déc 2023",
    type: "Élimination Simple",
    status: "En cours"
  };

  // Structure simulée des matchs pour les différentes phases
  const matches = {
    finals: [
      {
        id: 7,
        round: "Finale",
        team1: {
          name: "Team Alpha",
          logo: "https://source.unsplash.com/random/100x100/?alpha",
          score: 3,
          isWinner: true
        },
        team2: {
          name: "Team Omega",
          logo: "https://source.unsplash.com/random/100x100/?omega",
          score: 2,
          isWinner: false
        },
        date: "20 Déc 2023",
        time: "18:00",
        status: "completed"
      }
    ],
    semifinals: [
      {
        id: 5,
        round: "Demi-finale",
        team1: {
          name: "Team Alpha",
          logo: "https://source.unsplash.com/random/100x100/?alpha",
          score: 2,
          isWinner: true
        },
        team2: {
          name: "Team Beta",
          logo: "https://source.unsplash.com/random/100x100/?beta",
          score: 1,
          isWinner: false
        },
        date: "10 Déc 2023",
        time: "15:00",
        status: "completed"
      },
      {
        id: 6,
        round: "Demi-finale",
        team1: {
          name: "Team Omega",
          logo: "https://source.unsplash.com/random/100x100/?omega",
          score: 2,
          isWinner: true
        },
        team2: {
          name: "Les Champions",
          logo: "https://source.unsplash.com/random/100x100/?champion",
          score: 0,
          isWinner: false
        },
        date: "11 Déc 2023",
        time: "16:30",
        status: "completed"
      }
    ],
    quarterfinals: [
      {
        id: 1,
        round: "Quart de finale",
        team1: {
          name: "Team Alpha",
          logo: "https://source.unsplash.com/random/100x100/?alpha",
          score: 2,
          isWinner: true
        },
        team2: {
          name: "Team Delta",
          logo: "https://source.unsplash.com/random/100x100/?delta",
          score: 0,
          isWinner: false
        },
        date: "5 Déc 2023",
        time: "14:00",
        status: "completed"
      },
      {
        id: 2,
        round: "Quart de finale",
        team1: {
          name: "Team Beta",
          logo: "https://source.unsplash.com/random/100x100/?beta",
          score: 2,
          isWinner: true
        },
        team2: {
          name: "Team Gamma",
          logo: "https://source.unsplash.com/random/100x100/?gamma",
          score: 1,
          isWinner: false
        },
        date: "5 Déc 2023",
        time: "16:00",
        status: "completed"
      },
      {
        id: 3,
        round: "Quart de finale",
        team1: {
          name: "Team Omega",
          logo: "https://source.unsplash.com/random/100x100/?omega",
          score: 2,
          isWinner: true
        },
        team2: {
          name: "Les Invincibles",
          logo: "https://source.unsplash.com/random/100x100/?invincible",
          score: 1,
          isWinner: false
        },
        date: "6 Déc 2023",
        time: "14:00",
        status: "completed"
      },
      {
        id: 4,
        round: "Quart de finale",
        team1: {
          name: "Les Champions",
          logo: "https://source.unsplash.com/random/100x100/?champion",
          score: 2,
          isWinner: true
        },
        team2: {
          name: "Team Phoenix",
          logo: "https://source.unsplash.com/random/100x100/?phoenix",
          score: 0,
          isWinner: false
        },
        date: "6 Déc 2023",
        time: "16:00",
        status: "completed"
      }
    ]
  };

  // Rendu d'un match
  const renderMatch = (match: any, roundIndex: number) => (
    <div key={match.id} className="relative">
      <Card className="match-card mb-4 border-l-4 border-tournament-blue">
        <CardContent className="p-4">
          <div className="mb-2 flex justify-between items-center">
            <div className="text-sm font-medium text-gray-500">{match.round}</div>
            <div className="text-xs text-gray-400 flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              {match.date}
            </div>
          </div>

          <div className="space-y-2">
            {/* Équipe 1 */}
            <div className={`flex items-center justify-between p-2 rounded ${
              match.team1.isWinner ? 'bg-green-50 border-l-2 border-tournament-gold' : 'bg-gray-50'
            }`}>
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={match.team1.logo} />
                  <AvatarFallback>{match.team1.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className={`text-sm font-medium ${match.team1.isWinner ? 'font-bold' : ''}`}>
                  {match.team1.name}
                </span>
              </div>
              <span className={`team-score ${match.team1.isWinner ? 'winner' : ''}`}>
                {match.team1.score}
              </span>
            </div>

            {/* Équipe 2 */}
            <div className={`flex items-center justify-between p-2 rounded ${
              match.team2.isWinner ? 'bg-green-50 border-l-2 border-tournament-gold' : 'bg-gray-50'
            }`}>
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={match.team2.logo} />
                  <AvatarFallback>{match.team2.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className={`text-sm font-medium ${match.team2.isWinner ? 'font-bold' : ''}`}>
                  {match.team2.name}
                </span>
              </div>
              <span className={`team-score ${match.team2.isWinner ? 'winner' : ''}`}>
                {match.team2.score}
              </span>
            </div>
          </div>

          {match.status === 'scheduled' && (
            <div className="mt-4 text-xs text-center text-gray-500 flex items-center justify-center">
              <Clock className="h-3 w-3 mr-1" />
              {match.time}
            </div>
          )}
        </CardContent>
      </Card>
      {/* Connecteur pour les matchs (sauf pour la finale) */}
      {roundIndex < 2 && match.team1.isWinner && (
        <div className="connector-right hidden lg:block"></div>
      )}
      {roundIndex < 2 && match.team2.isWinner && (
        <div className="connector-right hidden lg:block"></div>
      )}
    </div>
  );

  // Horizontal bracket render
  const renderHorizontalBracket = () => {
    const rounds = [];
    
    // Add quarterfinals if showing all rounds
    if (currentRound === 'quarterfinals') {
      rounds.push(
        <div key="quarterfinals" className="round-column">
          <h3 className="text-center text-sm font-bold mb-4 text-gray-700 uppercase tracking-wider">Quarts de finale</h3>
          <div className="space-y-8">
            {matches.quarterfinals.map((match, index) => renderMatch(match, 0))}
          </div>
        </div>
      );
    }
    
    // Add semifinals
    if (currentRound === 'quarterfinals' || currentRound === 'semifinals') {
      rounds.push(
        <div key="semifinals" className="round-column">
          <h3 className="text-center text-sm font-bold mb-4 text-gray-700 uppercase tracking-wider">Demi-finales</h3>
          <div className="space-y-12 md:space-y-24 lg:space-y-32">
            {matches.semifinals.map((match, index) => renderMatch(match, 1))}
          </div>
        </div>
      );
    }
    
    // Always add finals
    rounds.push(
      <div key="finals" className="round-column">
        <h3 className="text-center text-sm font-bold mb-4 text-gray-700 uppercase tracking-wider">Finale</h3>
        <div className="space-y-12 md:space-y-24 lg:space-y-48 flex items-center justify-center h-full pt-16 lg:pt-32">
          {matches.finals.map((match, index) => renderMatch(match, 2))}
        </div>
      </div>
    );
    
    return (
      <div className="horizontal-bracket px-4 py-6 overflow-x-auto">
        <div className="flex space-x-6 md:space-x-12 lg:space-x-24 min-w-[800px]">
          {rounds}
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <Trophy className="mr-2 h-6 w-6 text-tournament-blue" />
                {tournament.name}
              </h1>
              <div className="mt-2 flex flex-wrap gap-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Crown className="mr-1 h-4 w-4" />
                  {tournament.organizer}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="mr-1 h-4 w-4" />
                  {tournament.dates}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="mr-1 h-4 w-4" />
                  8 équipes
                </div>
                <div className={`px-2 py-1 text-xs font-medium rounded-full
                  ${tournament.status === 'En cours' ? 'bg-green-100 text-green-800' : 
                    tournament.status === 'À venir' ? 'bg-blue-100 text-blue-800' : 
                    'bg-gray-100 text-gray-800'}
                `}>
                  {tournament.status}
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <Button variant="outline" className="text-tournament-blue border-tournament-blue">
                Voir les détails du tournoi
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="bracket" className="mb-8">
          <TabsList>
            <TabsTrigger value="bracket">Bracket</TabsTrigger>
            <TabsTrigger value="teams">Équipes</TabsTrigger>
            <TabsTrigger value="schedule">Calendrier</TabsTrigger>
          </TabsList>

          <TabsContent value="bracket" className="pt-6">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
              <div className="flex justify-center space-x-4 mb-2">
                <Button 
                  variant={currentRound === 'quarterfinals' ? 'default' : 'outline'} 
                  onClick={() => setCurrentRound('quarterfinals')}
                  className={cn(currentRound === 'quarterfinals' ? 'bg-tournament-blue' : '')}
                >
                  Vue complète
                </Button>
                <Button 
                  variant={currentRound === 'semifinals' ? 'default' : 'outline'}
                  onClick={() => setCurrentRound('semifinals')}
                  className={cn(currentRound === 'semifinals' ? 'bg-tournament-blue' : '')}
                >
                  Demi-finales et Finale
                </Button>
                <Button 
                  variant={currentRound === 'finals' ? 'default' : 'outline'}
                  onClick={() => setCurrentRound('finals')}
                  className={cn(currentRound === 'finals' ? 'bg-tournament-blue' : '')}
                >
                  Finale
                </Button>
              </div>
            </div>

            {renderHorizontalBracket()}
          </TabsContent>

          <TabsContent value="teams">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
              {["Team Alpha", "Team Beta", "Team Gamma", "Team Delta", "Team Omega", "Les Invincibles", "Les Champions", "Team Phoenix"].map((team, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={`https://source.unsplash.com/random/100x100/?${team.toLowerCase().replace(/\s/g, '')}`} />
                        <AvatarFallback>{team.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{team}</div>
                        <div className="text-sm text-gray-500">
                          {index < 4 ? "Éliminé en quarts" : 
                           index < 6 ? "Éliminé en demies" : 
                           index === 6 ? "Finaliste" : "Vainqueur"}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="schedule">
            <div className="space-y-6 pt-6">
              <h3 className="text-lg font-medium">Calendrier des matchs</h3>
              
              <div className="space-y-4">
                {[...matches.quarterfinals, ...matches.semifinals, ...matches.finals]
                  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                  .map((match) => (
                    <Card key={match.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <div className="bg-gray-50 p-4 md:w-48 flex flex-col justify-center">
                            <div className="font-medium">{match.date}</div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <Clock className="mr-1 h-3.5 w-3.5" />
                              {match.time}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">{match.round}</div>
                          </div>
                          
                          <div className="p-4 flex-grow">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <Avatar className="h-8 w-8 mr-2">
                                  <AvatarImage src={match.team1.logo} />
                                  <AvatarFallback>{match.team1.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <span className={match.team1.isWinner ? "font-bold" : ""}>{match.team1.name}</span>
                              </div>
                              <span className={`font-bold ${match.team1.isWinner ? "text-tournament-gold" : ""}`}>
                                {match.status === 'completed' ? match.team1.score : '-'}
                              </span>
                            </div>
                            
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center">
                                <Avatar className="h-8 w-8 mr-2">
                                  <AvatarImage src={match.team2.logo} />
                                  <AvatarFallback>{match.team2.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <span className={match.team2.isWinner ? "font-bold" : ""}>{match.team2.name}</span>
                              </div>
                              <span className={`font-bold ${match.team2.isWinner ? "text-tournament-gold" : ""}`}>
                                {match.status === 'completed' ? match.team2.score : '-'}
                              </span>
                            </div>
                          </div>
                          
                          <div className="bg-gray-50 p-4 md:w-32 flex items-center justify-center">
                            <div className={`text-sm font-medium ${
                              match.status === 'completed' ? 'text-green-600' : 'text-blue-600'
                            }`}>
                              {match.status === 'completed' ? 'Terminé' : 'À venir'}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default TournamentBracket;
