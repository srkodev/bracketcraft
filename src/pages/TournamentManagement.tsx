import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trophy, Users, Settings, Calendar, Mail, Link as LinkIcon, CheckCircle, XCircle, UserPlus, UserMinus, Calendar as CalendarIcon, Gift, Shield, MessageSquare, CheckSquare } from 'lucide-react';
import Layout from '@/components/Layout';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

const tournamentData = {
  id: 5,
  title: "Tournoi International de Basketball",
  organizer: "Fédération Internationale de Basketball",
  description: "Un tournoi international réunissant les meilleures équipes de basketball.",
  date: "5 - 20 Déc 2023",
  location: "Paris, France",
  teams: 8,
  maxTeams: 16,
  type: "Élimination Simple",
  status: "À venir",
  isPublic: true,
  requiresValidation: true,
  imageSrc: "https://source.unsplash.com/random/300x200/?basketball"
};

const initialAdmins = [
  { id: 1, name: "Jean Dupont", email: "jean@example.com", role: "Organisateur" },
  { id: 2, name: "Marie Martin", email: "marie@example.com", role: "Administrateur" }
];

const initialTeams = [
  { id: 1, name: "Les Dragons", status: "Confirmé", members: 5 },
  { id: 2, name: "Eagles", status: "En attente", members: 4 },
  { id: 3, name: "Warriors", status: "Confirmé", members: 6 },
  { id: 4, name: "Titans", status: "Refusé", members: 3 }
];

const initialMatches = [
  { 
    id: 1, 
    team1: "Les Dragons", 
    team2: "Eagles", 
    date: "5 Déc 2023", 
    status: "À valider", 
    score1: null, 
    score2: null,
    team1Submission: {
      score1: 3,
      score2: 1,
      submittedBy: "Jean Dupont",
      submittedAt: "5 Déc 2023 18:30",
      comment: "Match terminé sans incidents."
    },
    team2Submission: {
      score1: 3,
      score2: 1,
      submittedBy: "Marie Martin",
      submittedAt: "5 Déc 2023 18:35",
      comment: "Confirmé."
    }
  },
  { 
    id: 2, 
    team1: "Warriors", 
    team2: "Titans", 
    date: "7 Déc 2023", 
    status: "À valider", 
    score1: null, 
    score2: null,
    team1Submission: {
      score1: 2,
      score2: 0,
      submittedBy: "Thomas Bernard",
      submittedAt: "7 Déc 2023 19:45",
      comment: "Victoire nette de Warriors."
    },
    team2Submission: {
      score1: 1,
      score2: 0,
      submittedBy: "Sophie Klein",
      submittedAt: "7 Déc 2023 19:50",
      comment: "Contestation sur le 2ème but."
    }
  },
  { 
    id: 3, 
    team1: "Phoenix", 
    team2: "Cobras", 
    date: "10 Déc 2023", 
    status: "À jouer", 
    score1: null, 
    score2: null,
    team1Submission: null,
    team2Submission: null
  }
];

const TournamentManagement = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [tournament, setTournament] = useState(tournamentData);
  const [admins, setAdmins] = useState(initialAdmins);
  const [teams, setTeams] = useState(initialTeams);
  const [matches, setMatches] = useState(initialMatches);
  
  const [newAdmin, setNewAdmin] = useState({ email: '', role: 'Administrateur' });
  const [inviteLink, setInviteLink] = useState(`https://tournoi.app/invite/${id}`);
  const [isEditingSettings, setIsEditingSettings] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);

  const handleSettingsUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Paramètres mis à jour",
      description: "Les paramètres du tournoi ont été mis à jour avec succès.",
    });
    setIsEditingSettings(false);
  };

  const handleAddAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdmin.email) return;
    
    const newAdminObject = {
      id: admins.length + 1,
      name: newAdmin.email.split('@')[0],
      email: newAdmin.email,
      role: newAdmin.role
    };
    
    setAdmins([...admins, newAdminObject]);
    setNewAdmin({ email: '', role: 'Administrateur' });
    
    toast({
      title: "Administrateur ajouté",
      description: `${newAdminObject.email} a été ajouté comme ${newAdminObject.role}.`,
    });
  };

  const handleRemoveAdmin = (adminId: number) => {
    setAdmins(admins.filter(admin => admin.id !== adminId));
    toast({
      title: "Administrateur supprimé",
      description: "L'administrateur a été supprimé avec succès.",
    });
  };

  const handleTeamStatusUpdate = (teamId: number, newStatus: string) => {
    setTeams(teams.map(team => 
      team.id === teamId ? { ...team, status: newStatus } : team
    ));
    
    toast({
      title: "Statut de l'équipe mis à jour",
      description: `Le statut de l'équipe a été mis à jour à "${newStatus}".`,
    });
  };

  const copyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink);
    toast({
      title: "Lien copié",
      description: "Le lien d'invitation a été copié dans le presse-papiers.",
    });
  };

  const sendInvitationEmail = (email: string) => {
    toast({
      title: "Invitation envoyée",
      description: `Un email d'invitation a été envoyé à ${email}.`,
    });
  };

  const handleValidateResult = (matchId: number, scoreTeam1: number, scoreTeam2: number) => {
    setMatches(matches.map(match => 
      match.id === matchId ? { 
        ...match, 
        score1: scoreTeam1, 
        score2: scoreTeam2, 
        status: "Terminé" 
      } : match
    ));
    
    toast({
      title: "Résultat validé",
      description: `Le résultat du match a été validé et enregistré.`,
    });
  };

  const handleRequestResult = (matchId: number) => {
    toast({
      title: "Demande envoyée",
      description: "Un email a été envoyé aux capitaines des deux équipes pour saisir le résultat.",
    });
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center space-x-4">
              <Trophy className="h-8 w-8 text-tournament-blue" />
              <h1 className="text-3xl font-bold text-gray-900">Gestion du tournoi</h1>
            </div>
            <p className="mt-2 text-gray-600">
              {tournament.title} - {tournament.date}
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Button variant="outline" asChild>
              <Link to={`/tournaments/${id}`}>
                Voir le tournoi
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to={`/tournaments/${id}/bracket`}>
                Voir l'arbre du tournoi
              </Link>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="settings">
          <TabsList className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-2">
            <TabsTrigger value="settings">
              <Settings className="mr-2 h-4 w-4" />
              Paramètres
            </TabsTrigger>
            <TabsTrigger value="teams">
              <Users className="mr-2 h-4 w-4" />
              Équipes
            </TabsTrigger>
            <TabsTrigger value="matches">
              <Trophy className="mr-2 h-4 w-4" />
              Matchs
            </TabsTrigger>
            <TabsTrigger value="admins">
              <Shield className="mr-2 h-4 w-4" />
              Administrateurs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres du tournoi</CardTitle>
                <CardDescription>
                  Modifiez les informations et paramètres de votre tournoi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSettingsUpdate} className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Titre du tournoi</Label>
                        <Input 
                          id="title" 
                          value={tournament.title} 
                          onChange={(e) => setTournament({...tournament, title: e.target.value})}
                          disabled={!isEditingSettings}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="type">Type de tournoi</Label>
                        <Select 
                          disabled={!isEditingSettings}
                          value={tournament.type}
                          onValueChange={(value) => setTournament({...tournament, type: value})}
                        >
                          <SelectTrigger id="type">
                            <SelectValue placeholder="Sélectionner un type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Élimination Simple">Élimination Simple</SelectItem>
                            <SelectItem value="Élimination Double">Élimination Double</SelectItem>
                            <SelectItem value="Championnat">Championnat</SelectItem>
                            <SelectItem value="Phases de groupe + Élimination">Phases de groupe + Élimination</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Input 
                        id="description" 
                        value={tournament.description} 
                        onChange={(e) => setTournament({...tournament, description: e.target.value})}
                        disabled={!isEditingSettings}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="date">Dates du tournoi</Label>
                        <Input 
                          id="date" 
                          value={tournament.date} 
                          onChange={(e) => setTournament({...tournament, date: e.target.value})}
                          disabled={!isEditingSettings}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Lieu</Label>
                        <Input 
                          id="location" 
                          value={tournament.location} 
                          onChange={(e) => setTournament({...tournament, location: e.target.value})}
                          disabled={!isEditingSettings}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="maxTeams">Nombre maximum d'équipes</Label>
                        <Input 
                          id="maxTeams" 
                          type="number"
                          value={tournament.maxTeams} 
                          onChange={(e) => setTournament({...tournament, maxTeams: parseInt(e.target.value)})}
                          disabled={!isEditingSettings}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="status">Statut du tournoi</Label>
                        <Select 
                          disabled={!isEditingSettings}
                          value={tournament.status}
                          onValueChange={(value) => setTournament({...tournament, status: value})}
                        >
                          <SelectTrigger id="status">
                            <SelectValue placeholder="Sélectionner un statut" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="À venir">À venir</SelectItem>
                            <SelectItem value="En cours">En cours</SelectItem>
                            <SelectItem value="Terminé">Terminé</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Options d'inscription</h3>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="isPublic">Tournoi public</Label>
                          <p className="text-sm text-muted-foreground">
                            Si activé, le tournoi sera visible par tous les utilisateurs
                          </p>
                        </div>
                        <Switch 
                          id="isPublic" 
                          checked={tournament.isPublic}
                          onCheckedChange={(checked) => setTournament({...tournament, isPublic: checked})}
                          disabled={!isEditingSettings}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="requiresValidation">Validation des équipes</Label>
                          <p className="text-sm text-muted-foreground">
                            Si activé, les équipes devront être validées par un administrateur
                          </p>
                        </div>
                        <Switch 
                          id="requiresValidation" 
                          checked={tournament.requiresValidation}
                          onCheckedChange={(checked) => setTournament({...tournament, requiresValidation: checked})}
                          disabled={!isEditingSettings}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    {isEditingSettings ? (
                      <>
                        <Button variant="outline" type="button" onClick={() => setIsEditingSettings(false)}>
                          Annuler
                        </Button>
                        <Button type="submit">
                          Enregistrer
                        </Button>
                      </>
                    ) : (
                      <Button type="button" onClick={() => setIsEditingSettings(true)}>
                        Modifier
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="teams">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Équipes</CardTitle>
                    <CardDescription>
                      Gérez les équipes participantes à votre tournoi ({teams.length}/{tournament.maxTeams})
                    </CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Mail className="mr-2 h-4 w-4" />
                        Inviter des équipes
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Inviter des équipes</DialogTitle>
                        <DialogDescription>
                          Invitez des équipes à rejoindre votre tournoi via email ou en partageant un lien.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="inviteEmail">Email de l'équipe</Label>
                          <div className="flex space-x-2">
                            <Input id="inviteEmail" placeholder="equipe@example.com" />
                            <Button type="button" onClick={() => sendInvitationEmail('equipe@example.com')}>
                              Envoyer
                            </Button>
                          </div>
                        </div>
                        <Separator />
                        <div className="space-y-2">
                          <Label>Lien d'invitation</Label>
                          <div className="flex space-x-2">
                            <Input value={inviteLink} readOnly />
                            <Button type="button" variant="outline" onClick={copyInviteLink}>
                              <LinkIcon className="h-4 w-4" />
                            </Button>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Partagez ce lien avec les équipes que vous souhaitez inviter.
                          </p>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => {}}>
                          Fermer
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teams.map(team => (
                    <div key={team.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={`https://ui-avatars.com/api/?name=${team.name}&background=random`} />
                          <AvatarFallback>{team.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{team.name}</h3>
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <span>{team.members} membres</span>
                            <span className="mx-2">•</span>
                            <Badge
                              className={
                                team.status === 'Confirmé' ? 'bg-green-100 text-green-800 hover:bg-green-100' :
                                team.status === 'En attente' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100' :
                                'bg-red-100 text-red-800 hover:bg-red-100'
                              }
                            >
                              {team.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {team.status === 'En attente' && (
                          <>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-green-600 border-green-600 hover:bg-green-50"
                              onClick={() => handleTeamStatusUpdate(team.id, 'Confirmé')}
                            >
                              <CheckCircle className="mr-1 h-4 w-4" />
                              Accepter
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-red-600 border-red-600 hover:bg-red-50"
                              onClick={() => handleTeamStatusUpdate(team.id, 'Refusé')}
                            >
                              <XCircle className="mr-1 h-4 w-4" />
                              Refuser
                            </Button>
                          </>
                        )}
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/teams/${team.id}`}>
                            Voir
                          </Link>
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-red-600 border-red-600 hover:bg-red-50"
                            >
                              <UserMinus className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Retirer l'équipe du tournoi ?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Êtes-vous sûr de vouloir retirer cette équipe du tournoi ? Cette action ne peut pas être annulée.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Annuler</AlertDialogCancel>
                              <AlertDialogAction 
                                className="bg-red-600 hover:bg-red-700"
                                onClick={() => {
                                  setTeams(teams.filter(t => t.id !== team.id));
                                  toast({
                                    title: "Équipe retirée",
                                    description: `L'équipe "${team.name}" a été retirée du tournoi.`,
                                  });
                                }}
                              >
                                Retirer
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  ))}
                  
                  {teams.length === 0 && (
                    <div className="text-center p-8">
                      <Users className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                      <h3 className="mt-4 text-lg font-medium">Aucune équipe inscrite</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Invitez des équipes à participer à votre tournoi.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="matches">
            <Card>
              <CardHeader>
                <CardTitle>Matchs</CardTitle>
                <CardDescription>
                  Gérez les matchs de votre tournoi et validez les résultats soumis par les équipes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {matches.map(match => (
                    <Card key={match.id} className="border-2 hover:border-tournament-blue/30 transition-colors">
                      <CardHeader className="pb-2">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                          <div>
                            <CardTitle className="text-lg flex items-center">
                              <Trophy className="mr-2 h-5 w-5 text-tournament-blue" />
                              Match #{match.id}
                            </CardTitle>
                            <CardDescription>
                              <div className="flex items-center mt-1">
                                <CalendarIcon className="mr-1 h-4 w-4" />
                                {match.date}
                              </div>
                            </CardDescription>
                          </div>
                          <Badge
                            className={
                              match.status === 'Terminé' ? 'bg-green-100 text-green-800 hover:bg-green-100' :
                              match.status === 'En cours' ? 'bg-blue-100 text-blue-800 hover:bg-blue-100' :
                              match.status === 'À valider' ? 'bg-orange-100 text-orange-800 hover:bg-orange-100' :
                              'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
                            }
                          >
                            {match.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="text-center py-4 px-6 rounded-lg bg-gray-50">
                            <Avatar className="h-12 w-12 mx-auto mb-2">
                              <AvatarImage src={`https://ui-avatars.com/api/?name=${match.team1}&background=random`} />
                              <AvatarFallback>{match.team1.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="font-medium text-lg">{match.team1}</div>
                            
                            {match.team1Submission ? (
                              <div className="mt-4">
                                <div className="text-2xl font-bold">
                                  {match.team1Submission.score1} - {match.team1Submission.score2}
                                </div>
                                <div className="mt-2 p-3 bg-white rounded-md text-left">
                                  <div className="text-sm font-medium flex items-center">
                                    <MessageSquare className="mr-1 h-4 w-4 text-gray-400" />
                                    Commentaire:
                                  </div>
                                  <p className="text-sm mt-1">{match.team1Submission.comment}</p>
                                  <div className="text-xs text-gray-500 mt-2">
                                    Soumis par {match.team1Submission.submittedBy} · {match.team1Submission.submittedAt}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="mt-4 text-sm text-gray-500">
                                Aucun résultat soumis
                              </div>
                            )}
                          </div>
                          
                          <div className="text-center py-4 px-6 rounded-lg bg-gray-50">
                            <Avatar className="h-12 w-12 mx-auto mb-2">
                              <AvatarImage src={`https://ui-avatars.com/api/?name=${match.team2}&background=random`} />
                              <AvatarFallback>{match.team2.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="font-medium text-lg">{match.team2}</div>
                            
                            {match.team2Submission ? (
                              <div className="mt-4">
                                <div className="text-2xl font-bold">
                                  {match.team2Submission.score1} - {match.team2Submission.score2}
                                </div>
                                <div className="mt-2 p-3 bg-white rounded-md text-left">
                                  <div className="text-sm font-medium flex items-center">
                                    <MessageSquare className="mr-1 h-4 w-4 text-gray-400" />
                                    Commentaire:
                                  </div>
                                  <p className="text-sm mt-1">{match.team2Submission.comment}</p>
                                  <div className="text-xs text-gray-500 mt-2">
                                    Soumis par {match.team2Submission.submittedBy} · {match.team2Submission.submittedAt}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="mt-4 text-sm text-gray-500">
                                Aucun résultat soumis
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="justify-end gap-2 pt-0">
                        {match.status === 'À jouer' && (
                          <Button variant="outline" size="sm" onClick={() => handleRequestResult(match.id)}>
                            <Mail className="mr-1 h-4 w-4" />
                            Demander résultat
                          </Button>
                        )}
                        
                        {match.status === 'À valider' && match.team1Submission && match.team2Submission && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button className="bg-tournament-blue hover:bg-blue-600">
                                <CheckSquare className="mr-1 h-4 w-4" />
                                Valider le résultat
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                              <DialogHeader>
                                <DialogTitle>Valider le résultat du match</DialogTitle>
                                <DialogDescription>
                                  {match.team1} vs {match.team2} - {match.date}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="py-4">
                                <div className="text-center mb-4">
                                  <h3 className="font-medium">Propositions des équipes</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                  <div className="bg-gray-50 p-3 rounded-md">
                                    <div className="text-sm font-medium">{match.team1}</div>
                                    <div className="text-xl font-bold mt-1">
                                      {match.team1Submission?.score1} - {match.team1Submission?.score2}
                                    </div>
                                  </div>
                                  <div className="bg-gray-50 p-3 rounded-md">
                                    <div className="text-sm font-medium">{match.team2}</div>
                                    <div className="text-xl font-bold mt-1">
                                      {match.team2Submission?.score1} - {match.team2Submission?.score2}
                                    </div>
                                  </div>
                                </div>
                                
                                {match.team1Submission?.score1 !== match.team2Submission?.score1 || 
                                match.team1Submission?.score2 !== match.team2Submission?.score2 ? (
                                  <div className="mb-4 p-3 bg-yellow-50 rounded-md text-yellow-800 text-sm">
                                    <div className="font-medium">Attention</div>
                                    <p>Les résultats soumis par les équipes ne correspondent pas. Veuillez vérifier et saisir le résultat final correct.</p>
                                  </div>
                                ) : (
                                  <div className="mb-4 p-3 bg-green-50 rounded-md text-green-800 text-sm">
                                    <div className="font-medium">Résultats concordants</div>
                                    <p>Les deux équipes ont soumis le même résultat.</p>
                                  </div>
                                )}
                                
                                <div className="grid grid-cols-5 items-center gap-4 py-4 border-t pt-4">
                                  <div className="col-span-2">
                                    <Label htmlFor={`score1-${match.id}`} className="text-center block">
                                      {match.team1}
                                    </Label>
                                    <Input
                                      id={`score1-${match.id}`}
                                      type="number"
                                      min="0"
                                      className="text-center"
                                      placeholder="0"
                                      defaultValue={match.team1Submission?.score1}
                                    />
                                  </div>
                                  <div className="flex justify-center">
                                    <span className="text-xl font-bold">-</span>
                                  </div>
                                  <div className="col-span-2">
                                    <Label htmlFor={`score2-${match.id}`} className="text-center block">
                                      {match.team2}
                                    </Label>
                                    <Input
                                      id={`score2-${match.id}`}
                                      type="number"
                                      min="0"
                                      className="text-center"
                                      placeholder="0"
                                      defaultValue={match.team1Submission?.score2}
                                    />
                                  </div>
                                </div>
                              </div>
                              <DialogFooter className="sm:justify-end">
                                <Button 
                                  variant="outline" 
                                  onClick={() => {}}
                                >
                                  Annuler
                                </Button>
                                <Button
                                  onClick={() => {
                                    const score1 = parseInt(
                                      (document.getElementById(`score1-${match.id}`) as HTMLInputElement).value
                                    );
                                    const score2 = parseInt(
                                      (document.getElementById(`score2-${match.id}`) as HTMLInputElement).value
                                    );
                                    
                                    handleValidateResult(match.id, score1, score2);
                                  }}
                                >
                                  Valider et enregistrer
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        )}
                        
                        {match.status === 'Terminé' && (
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                              <CheckCircle className="mr-1 h-4 w-4" />
                              Résultat final: {match.score1} - {match.score2}
                            </Badge>
                            <Button variant="outline" size="sm">
                              Modifier
                            </Button>
                          </div>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                  
                  {matches.length === 0 && (
                    <div className="text-center p-8">
                      <Trophy className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                      <h3 className="mt-4 text-lg font-medium">Aucun match planifié</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Les matchs apparaîtront ici une fois le tournoi commencé.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="admins">
            <Card>
              <CardHeader>
                <CardTitle>Administrateurs</CardTitle>
                <CardDescription>
                  Gérez les administrateurs de votre tournoi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddAdmin} className="space-y-4 mb-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-grow">
                      <Label htmlFor="adminEmail">Email</Label>
                      <Input 
                        id="adminEmail" 
                        type="email" 
                        placeholder="admin@example.com" 
                        value={newAdmin.email}
                        onChange={(e) => setNewAdmin({...newAdmin, email: e.target.value})}
                      />
                    </div>
                    <div className="w-full md:w-1/3">
                      <Label htmlFor="adminRole">Rôle</Label>
                      <Select 
                        value={newAdmin.role}
                        onValueChange={(value) => setNewAdmin({...newAdmin, role: value})}
                      >
                        <SelectTrigger id="adminRole">
                          <SelectValue placeholder="Rôle" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Administrateur">Administrateur</SelectItem>
                          <SelectItem value="Modérateur">Modérateur</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-end">
                      <Button type="submit" className="w-full md:w-auto">
                        <UserPlus className="mr-2 h-4 w-4" />
                        Ajouter
                      </Button>
                    </div>
                  </div>
                </form>

                <Separator className="my-6" />

                <div className="space-y-4">
                  {admins.map(admin => (
                    <div key={admin.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={`https://ui-avatars.com/api/?name=${admin.name}&background=random`} />
                          <AvatarFallback>{admin.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{admin.name}</h3>
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <span>{admin.email}</span>
                            <span className="mx-2">•</span>
                            <Badge variant="outline">{admin.role}</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {admin.role !== "Organisateur" && (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-red-600 border-red-600 hover:bg-red-50"
                              >
                                <UserMinus className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Retirer l'administrateur ?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Êtes-vous sûr de vouloir retirer cet administrateur du tournoi ? Cette action ne peut pas être annulée.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Annuler</AlertDialogCancel>
                                <AlertDialogAction 
                                  className="bg-red-600 hover:bg-red-700"
                                  onClick={() => handleRemoveAdmin(admin.id)}
                                >
                                  Retirer
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default TournamentManagement;
