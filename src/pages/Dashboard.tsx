
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Users, Calendar, Clock, ChevronRight, ArrowUpRight, X, Check, Crown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import Layout from '@/components/Layout';

// Données fictives pour le tableau de bord
const upcomingMatches = [
  {
    id: 1,
    tournament: "Championnat de League of Legends",
    opponent: "Team Phoenix",
    date: "15 Nov 2023",
    time: "14:00",
    status: "scheduled"
  },
  {
    id: 2,
    tournament: "Coupe Inter-Entreprises",
    opponent: "Les Champions",
    date: "18 Nov 2023",
    time: "16:30",
    status: "scheduled"
  }
];

const recentResults = [
  {
    id: 1,
    tournament: "Tournoi Municipal",
    opponent: "Équipe Alpha",
    result: "Victoire",
    score: "3-2",
    date: "10 Nov 2023"
  },
  {
    id: 2,
    tournament: "Coupe de France E-Sport",
    opponent: "Team Omega",
    result: "Défaite",
    score: "1-3",
    date: "5 Nov 2023"
  },
  {
    id: 3,
    tournament: "Ligue Amateur",
    opponent: "Les Stratèges",
    result: "Victoire",
    score: "2-0",
    date: "1 Nov 2023"
  }
];

const myTournaments = [
  {
    id: 1,
    name: "Coupe Inter-Entreprises",
    type: "Simple Élimination",
    progress: 75,
    teams: 12,
    status: "En cours"
  },
  {
    id: 2,
    name: "Tournoi d'Hiver",
    type: "Double Élimination",
    progress: 0,
    teams: 16,
    status: "À venir"
  }
];

const pendingInvitations = [
  {
    id: 1,
    teamName: "Les Invincibles",
    leader: "Martin Dupont",
    leaderAvatar: "https://randomuser.me/api/portraits/men/1.jpg",
    date: "12 Nov 2023"
  },
  {
    id: 2,
    teamName: "Team Omega",
    leader: "Marie Dubois",
    leaderAvatar: "https://randomuser.me/api/portraits/women/3.jpg",
    date: "8 Nov 2023"
  }
];

const Dashboard = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="mt-2 text-gray-600">
            Bienvenue Jean Dupont, voici un aperçu de vos activités.
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-gray-100">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="tournaments">Mes tournois</TabsTrigger>
            <TabsTrigger value="teams">Mes équipes</TabsTrigger>
            <TabsTrigger value="invitations">Invitations</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Prochains matchs */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Prochains matchs</CardTitle>
                  <CardDescription>Vos matchs à venir</CardDescription>
                </CardHeader>
                <CardContent>
                  {upcomingMatches.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingMatches.map((match) => (
                        <div key={match.id} className="flex items-center justify-between bg-gray-50 rounded-md p-3">
                          <div>
                            <div className="font-medium">{match.tournament}</div>
                            <div className="text-sm text-gray-500">vs {match.opponent}</div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center text-sm text-gray-500">
                              <Calendar className="mr-1 h-3.5 w-3.5" />
                              {match.date}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock className="mr-1 h-3.5 w-3.5" />
                              {match.time}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-gray-500">
                      Aucun match à venir.
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Link to="/calendar" className="text-tournament-blue hover:underline text-sm flex items-center">
                    Voir tous les matchs
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardFooter>
              </Card>

              {/* Résultats récents */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Résultats récents</CardTitle>
                  <CardDescription>Vos derniers matchs</CardDescription>
                </CardHeader>
                <CardContent>
                  {recentResults.length > 0 ? (
                    <div className="space-y-4">
                      {recentResults.map((result) => (
                        <div key={result.id} className="flex items-center justify-between bg-gray-50 rounded-md p-3">
                          <div>
                            <div className="font-medium">{result.tournament}</div>
                            <div className="text-sm text-gray-500">vs {result.opponent}</div>
                          </div>
                          <div className="text-right">
                            <div className={`font-medium ${
                              result.result === 'Victoire' ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {result.score}
                            </div>
                            <div className="text-sm text-gray-500">{result.date}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-gray-500">
                      Aucun résultat récent.
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Link to="/results" className="text-tournament-blue hover:underline text-sm flex items-center">
                    Voir tous les résultats
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardFooter>
              </Card>
            </div>

            {/* Statistiques rapides */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Tournois</p>
                      <p className="text-2xl font-bold">5</p>
                    </div>
                    <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center">
                      <Trophy className="h-6 w-6 text-tournament-blue" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Équipes</p>
                      <p className="text-2xl font-bold">2</p>
                    </div>
                    <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-tournament-blue" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Matchs joués</p>
                      <p className="text-2xl font-bold">18</p>
                    </div>
                    <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-tournament-blue" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Victoires</p>
                      <p className="text-2xl font-bold">12</p>
                    </div>
                    <div className="h-12 w-12 bg-green-50 rounded-full flex items-center justify-center">
                      <Trophy className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tournaments" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Mes tournois</h2>
              <Link to="/tournaments/create">
                <Button className="bg-tournament-blue hover:bg-blue-600">
                  Créer un tournoi
                </Button>
              </Link>
            </div>

            {myTournaments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {myTournaments.map((tournament) => (
                  <Card key={tournament.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{tournament.name}</CardTitle>
                          <CardDescription>{tournament.type}</CardDescription>
                        </div>
                        <div className={`px-2 py-1 text-xs font-medium rounded-full
                          ${tournament.status === 'En cours' ? 'bg-green-100 text-green-800' : 
                            tournament.status === 'À venir' ? 'bg-blue-100 text-blue-800' : 
                            'bg-gray-100 text-gray-800'}
                        `}>
                          {tournament.status}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progression</span>
                          <span>{tournament.progress}%</span>
                        </div>
                        <Progress value={tournament.progress} className="h-2" />
                        <div className="flex items-center text-sm text-gray-500">
                          <Users className="mr-2 h-4 w-4" />
                          <span>{tournament.teams} équipes participantes</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Link to={`/tournaments/${tournament.id}`}>
                        <Button variant="outline">Gérer</Button>
                      </Link>
                      <Link to={`/tournaments/${tournament.id}/bracket`}>
                        <Button variant="ghost" className="text-tournament-blue">
                          Voir le bracket
                          <ArrowUpRight className="ml-1 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Trophy className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-lg font-medium text-gray-900">Aucun tournoi</h3>
                  <p className="mt-1 text-gray-500">Vous n'avez pas encore créé ou rejoint de tournoi.</p>
                  <div className="mt-6">
                    <Link to="/tournaments/create">
                      <Button className="bg-tournament-blue hover:bg-blue-600">
                        Créer votre premier tournoi
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="teams">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Mes équipes</h2>
              <Link to="/teams/create">
                <Button className="bg-tournament-blue hover:bg-blue-600">
                  Créer une équipe
                </Button>
              </Link>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-14 w-14 border-2 border-tournament-blue">
                      <AvatarImage src="https://source.unsplash.com/random/100x100/?logo" />
                      <AvatarFallback>TE</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>Team Elite</CardTitle>
                      <CardDescription>Vous êtes le chef de cette équipe</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-md text-center">
                      <div className="text-2xl font-bold">5</div>
                      <div className="text-sm text-gray-500">Membres</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md text-center">
                      <div className="text-2xl font-bold">8</div>
                      <div className="text-sm text-gray-500">Tournois</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md text-center">
                      <div className="text-2xl font-bold text-tournament-gold">4</div>
                      <div className="text-sm text-gray-500">Victoires</div>
                    </div>
                  </div>

                  <h4 className="font-medium mb-3">Membres de l'équipe</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src="https://randomuser.me/api/portraits/men/10.jpg" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-sm">Jean Dupont (Vous)</div>
                          <div className="text-xs text-tournament-gold flex items-center">
                            <Crown className="h-3 w-3 mr-1" />
                            Chef d'équipe
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {[...Array(4)].map((_, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src={`https://randomuser.me/api/portraits/${index % 2 ? 'women' : 'men'}/${index + 15}.jpg`} />
                            <AvatarFallback>?</AvatarFallback>
                          </Avatar>
                          <div className="font-medium text-sm">
                            {["Sophie Martin", "Lucas Bernard", "Camille Rousseau", "Julien Petit"][index]}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Link to="/teams/1">
                    <Button className="bg-tournament-blue hover:bg-blue-600">
                      Gérer l'équipe
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="invitations" className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Invitations en attente</h2>
            
            {pendingInvitations.length > 0 ? (
              <div className="space-y-4">
                {pendingInvitations.map((invitation) => (
                  <Card key={invitation.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Avatar className="h-12 w-12 mr-4">
                            <AvatarImage src="https://source.unsplash.com/random/100x100/?team" />
                            <AvatarFallback>{invitation.teamName.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{invitation.teamName}</div>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <Avatar className="h-4 w-4 mr-1">
                                <AvatarImage src={invitation.leaderAvatar} />
                                <AvatarFallback>?</AvatarFallback>
                              </Avatar>
                              Invitation de {invitation.leader}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Button variant="outline" size="sm" className="mr-2 text-red-600 border-red-200 hover:bg-red-50">
                            <X className="mr-1 h-4 w-4" />
                            Refuser
                          </Button>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <Check className="mr-1 h-4 w-4" />
                            Accepter
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Users className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-lg font-medium text-gray-900">Aucune invitation</h3>
                  <p className="mt-1 text-gray-500">Vous n'avez pas d'invitations en attente.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Dashboard;
