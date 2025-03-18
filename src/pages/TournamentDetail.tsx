import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, User, Calendar, MapPin, Users, Clock, Shield, Info, MessageSquare, Share2, Settings, FileText, Gift } from 'lucide-react';
import Layout from '@/components/Layout';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const TournamentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Fake tournament data
  const tournament = {
    id: parseInt(id as string) || 5,
    title: "Tournoi International de Basketball",
    organizer: "Fédération Internationale de Basketball",
    description: "Un tournoi international réunissant les meilleures équipes de basketball. Vivez l'expérience d'un tournoi professionnel avec des équipes venant du monde entier. Prix pour les vainqueurs et une ambiance exceptionnelle garantie !",
    date: "5 - 20 Déc 2023",
    registrationDeadline: "30 Nov 2023",
    location: "Paris, France",
    teams: 8,
    maxTeams: 16,
    teamSize: "5-8 joueurs",
    type: "Élimination Simple",
    status: "À venir",
    prize: "10 000 €",
    rules: "Règles officielles de la FIBA",
    isPublic: true,
    imageSrc: "https://source.unsplash.com/random/300x200/?basketball",
    createdBy: {
      id: "1",
      name: "Jean Dupont",
      email: "jean@example.com"
    }
  };
  
  // Fake teams data
  const teams = [
    { id: 1, name: "Les Dragons", members: 5, image: "https://ui-avatars.com/api/?name=Dragons&background=random" },
    { id: 2, name: "Eagles", members: 4, image: "https://ui-avatars.com/api/?name=Eagles&background=random" },
    { id: 3, name: "Warriors", members: 6, image: "https://ui-avatars.com/api/?name=Warriors&background=random" },
    { id: 4, name: "Titans", members: 5, image: "https://ui-avatars.com/api/?name=Titans&background=random" },
  ];
  
  // Fake matches data
  const matches = [
    {
      id: 1,
      round: "Quarts de finale",
      team1: "Les Dragons",
      team2: "Eagles",
      date: "5 Déc 2023",
      time: "14:00",
      status: "À venir",
      score: null
    },
    {
      id: 2,
      round: "Quarts de finale",
      team1: "Warriors",
      team2: "Titans",
      date: "5 Déc 2023",
      time: "16:00",
      status: "À venir",
      score: null
    }
  ];
  
  // Check if user is tournament admin
  const isAdmin = user && (user.id === tournament.createdBy.id);
  
  // Check if registration is still open
  const isRegistrationOpen = new Date() < new Date("2023-12-01");
  
  // Handle team registration
  const handleRegisterTeam = () => {
    toast({
      title: "Inscription enregistrée",
      description: "Votre équipe a été inscrite au tournoi avec succès.",
    });
  };
  
  // Handle share tournament
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Lien copié",
      description: "Le lien du tournoi a été copié dans le presse-papiers.",
    });
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Tournament Header with banner image */}
        <div className="relative mb-8 rounded-xl overflow-hidden">
          <div className="h-64 w-full">
            <img 
              src={tournament.imageSrc} 
              alt={tournament.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Trophy className="h-6 w-6 text-yellow-400" />
                  <Badge className="bg-tournament-blue text-white">{tournament.type}</Badge>
                  <Badge className={
                    tournament.status === 'En cours' 
                      ? 'bg-green-500 text-white' 
                      : tournament.status === 'À venir' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-500 text-white'
                  }>
                    {tournament.status}
                  </Badge>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{tournament.title}</h1>
                <p className="text-white/80">Organisé par {tournament.organizer}</p>
              </div>
              <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
                {isAdmin && (
                  <Button asChild>
                    <Link to={`/tournaments/${id}/manage`}>
                      <Settings className="mr-2 h-4 w-4" />
                      Gérer
                    </Link>
                  </Button>
                )}
                <Button variant="outline" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border-white/20">
                  <Link to={`/tournaments/${id}/bracket`}>
                    <Trophy className="mr-2 h-4 w-4" />
                    Arbre du tournoi
                  </Link>
                </Button>
                <Button variant="outline" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border-white/20" onClick={handleShare}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Partager
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Tournament body with tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left column - Tournament info */}
          <div className="md:col-span-2">
            <Tabs defaultValue="info">
              <TabsList className="mb-6">
                <TabsTrigger value="info">
                  <Info className="mr-2 h-4 w-4" />
                  Informations
                </TabsTrigger>
                <TabsTrigger value="teams">
                  <Users className="mr-2 h-4 w-4" />
                  Équipes
                </TabsTrigger>
                <TabsTrigger value="matches">
                  <Trophy className="mr-2 h-4 w-4" />
                  Matchs
                </TabsTrigger>
                <TabsTrigger value="rules">
                  <FileText className="mr-2 h-4 w-4" />
                  Règlement
                </TabsTrigger>
              </TabsList>

              {/* Info Tab */}
              <TabsContent value="info">
                <Card>
                  <CardHeader>
                    <CardTitle>À propos du tournoi</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-gray-700">{tournament.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <Calendar className="h-5 w-5 text-tournament-blue mt-0.5" />
                          <div>
                            <h4 className="font-medium">Dates</h4>
                            <p className="text-gray-600">{tournament.date}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <MapPin className="h-5 w-5 text-tournament-blue mt-0.5" />
                          <div>
                            <h4 className="font-medium">Lieu</h4>
                            <p className="text-gray-600">{tournament.location}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <Users className="h-5 w-5 text-tournament-blue mt-0.5" />
                          <div>
                            <h4 className="font-medium">Équipes</h4>
                            <p className="text-gray-600">{tournament.teams}/{tournament.maxTeams} équipes</p>
                            <p className="text-gray-600">{tournament.teamSize} par équipe</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <Trophy className="h-5 w-5 text-tournament-blue mt-0.5" />
                          <div>
                            <h4 className="font-medium">Format</h4>
                            <p className="text-gray-600">{tournament.type}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <Gift className="h-5 w-5 text-tournament-blue mt-0.5" />
                          <div>
                            <h4 className="font-medium">Prix</h4>
                            <p className="text-gray-600">{tournament.prize}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <Clock className="h-5 w-5 text-tournament-blue mt-0.5" />
                          <div>
                            <h4 className="font-medium">Inscriptions</h4>
                            <p className="text-gray-600">Jusqu'au {tournament.registrationDeadline}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-start space-x-3">
                      <Shield className="h-5 w-5 text-tournament-blue mt-0.5" />
                      <div>
                        <h4 className="font-medium">Organisateur</h4>
                        <div className="flex items-center mt-2">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src={`https://ui-avatars.com/api/?name=${tournament.createdBy.name}&background=random`} />
                            <AvatarFallback>{tournament.createdBy.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-gray-900">{tournament.createdBy.name}</p>
                            <p className="text-sm text-gray-500">{tournament.createdBy.email}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Teams Tab */}
              <TabsContent value="teams">
                <Card>
                  <CardHeader>
                    <CardTitle>Équipes participantes</CardTitle>
                    <CardDescription>{teams.length}/{tournament.maxTeams} équipes inscrites</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {teams.map(team => (
                        <div key={team.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={team.image} />
                            <AvatarFallback>{team.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h4 className="font-medium">{team.name}</h4>
                            <p className="text-sm text-muted-foreground">{team.members} membres</p>
                          </div>
                          <Button variant="ghost" size="sm" asChild>
                            <Link to={`/teams/${team.id}`}>
                              Voir
                            </Link>
                          </Button>
                        </div>
                      ))}
                      
                      {teams.length === 0 && (
                        <div className="col-span-2 text-center p-8">
                          <Users className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                          <h3 className="mt-4 text-lg font-medium">Aucune équipe inscrite</h3>
                          <p className="mt-2 text-sm text-muted-foreground">
                            Soyez la première équipe à vous inscrire !
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Matches Tab */}
              <TabsContent value="matches">
                <Card>
                  <CardHeader>
                    <CardTitle>Programme des matchs</CardTitle>
                    <CardDescription>
                      Consultez les matchs prévus et les résultats
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {matches.length > 0 ? (
                        matches.map(match => (
                          <div key={match.id} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start mb-4">
                              <Badge variant="outline">{match.round}</Badge>
                              <div className="text-sm text-muted-foreground">
                                {match.date} • {match.time}
                              </div>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                              <div className="flex flex-col items-center text-center">
                                <Avatar className="h-16 w-16 mb-2">
                                  <AvatarImage src={`https://ui-avatars.com/api/?name=${match.team1}&background=random`} />
                                  <AvatarFallback>{match.team1.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="font-medium">{match.team1}</span>
                              </div>
                              
                              <div className="flex flex-col items-center">
                                {match.status === 'Terminé' ? (
                                  <div className="text-4xl font-bold">
                                    {match.score.team1} - {match.score.team2}
                                  </div>
                                ) : (
                                  <div className="text-4xl font-bold text-muted-foreground">VS</div>
                                )}
                                <Badge
                                  className={
                                    match.status === 'Terminé' ? 'bg-green-100 text-green-800 hover:bg-green-100 mt-2' :
                                    match.status === 'En cours' ? 'bg-blue-100 text-blue-800 hover:bg-blue-100 mt-2' :
                                    'bg-yellow-100 text-yellow-800 hover:bg-yellow-100 mt-2'
                                  }
                                >
                                  {match.status}
                                </Badge>
                              </div>
                              
                              <div className="flex flex-col items-center text-center">
                                <Avatar className="h-16 w-16 mb-2">
                                  <AvatarImage src={`https://ui-avatars.com/api/?name=${match.team2}&background=random`} />
                                  <AvatarFallback>{match.team2.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="font-medium">{match.team2}</span>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center p-8">
                          <Trophy className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                          <h3 className="mt-4 text-lg font-medium">Aucun match programmé</h3>
                          <p className="mt-2 text-sm text-muted-foreground">
                            Les matchs seront affichés ici une fois le tournoi commencé.
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Rules Tab */}
              <TabsContent value="rules">
                <Card>
                  <CardHeader>
                    <CardTitle>Règlement du tournoi</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>
                      Le tournoi suivra les {tournament.rules}. Voici quelques points importants :
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium">Format de compétition</h3>
                        <p className="text-gray-700">
                          Le tournoi se déroule en format {tournament.type}. Chaque match doit déterminer un vainqueur.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium">Équipes</h3>
                        <p className="text-gray-700">
                          Chaque équipe doit être composée de {tournament.teamSize}. Tous les joueurs doivent être inscrits avant le début du tournoi.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium">Matchs</h3>
                        <p className="text-gray-700">
                          Les matchs se déroulent en 4 quarts-temps de 10 minutes chacun. En cas d'égalité, des prolongations de 5 minutes seront jouées jusqu'à détermination d'un vainqueur.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium">Arbitrage</h3>
                        <p className="text-gray-700">
                          Tous les matchs seront arbitrés par des arbitres officiels. Les décisions des arbitres sont finales.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium">Prix</h3>
                        <p className="text-gray-700">
                          Le vainqueur du tournoi recevra {tournament.prize}. Des récompenses additionnelles seront décernées aux finalistes et demi-finalistes.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium">Code de conduite</h3>
                        <p className="text-gray-700">
                          Tous les participants doivent faire preuve de fair-play et de respect envers les autres équipes, les arbitres et les organisateurs. Tout comportement antisportif pourra entraîner la disqualification.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right column - Registration and info cards */}
          <div className="space-y-6">
            {/* Registration card */}
            <Card>
              <CardHeader>
                <CardTitle>Inscription</CardTitle>
                <CardDescription>
                  {isRegistrationOpen 
                    ? `Inscriptions ouvertes jusqu'au ${tournament.registrationDeadline}` 
                    : "Les inscriptions sont terminées"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Places disponibles :</span>
                    <span className="font-medium">{tournament.maxTeams - tournament.teams}/{tournament.maxTeams}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-tournament-blue h-2.5 rounded-full" 
                      style={{ width: `${(tournament.teams / tournament.maxTeams) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                {isRegistrationOpen ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full">Inscrire mon équipe</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Inscrire mon équipe</DialogTitle>
                        <DialogDescription>
                          Sélectionnez l'équipe que vous souhaitez inscrire à ce tournoi.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <div className="space-y-4">
                          {/* Fake team selection */}
                          {[
                            { id: 1, name: "Les Invincibles", members: 5 },
                            { id: 2, name: "Team Alpha", members: 4 },
                          ].map(team => (
                            <div key={team.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
                              <div className="flex items-center space-x-4">
                                <Avatar className="h-10 w-10">
                                  <AvatarImage src={`https://ui-avatars.com/api/?name=${team.name}&background=random`} />
                                  <AvatarFallback>{team.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <h4 className="font-medium">{team.name}</h4>
                                  <p className="text-sm text-muted-foreground">{team.members} membres</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline">Annuler</Button>
                        <Button onClick={handleRegisterTeam}>Confirmer l'inscription</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                ) : (
                  <Button className="w-full" disabled>Inscriptions terminées</Button>
                )}
              </CardFooter>
            </Card>

            {/* Quick info card */}
            <Card>
              <CardHeader>
                <CardTitle>Informations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Dates</span>
                    </div>
                    <span className="font-medium">{tournament.date}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Lieu</span>
                    </div>
                    <span className="font-medium">{tournament.location}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Trophy className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Format</span>
                    </div>
                    <span className="font-medium">{tournament.type}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Gift className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Prix</span>
                    </div>
                    <span className="font-medium">{tournament.prize}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact organizer card */}
            <Card>
              <CardHeader>
                <CardTitle>Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={`https://ui-avatars.com/api/?name=${tournament.createdBy.name}&background=random`} />
                    <AvatarFallback>{tournament.createdBy.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{tournament.createdBy.name}</h4>
                    <p className="text-sm text-muted-foreground">Organisateur</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Contacter
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TournamentDetail;
