
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserCog, Trophy, Users, Mail, Lock, User, LogOut } from 'lucide-react';
import Layout from '@/components/Layout';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const Profile = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Fictional data
  const [myTournaments, setMyTournaments] = useState([
    { id: 1, title: "Tournoi de Tennis Municipal", role: "Organisateur", date: "10 Oct 2023", status: "Terminé" },
    { id: 2, title: "League of Legends Championship", role: "Administrateur", date: "15 Fév 2024", status: "À venir" },
    { id: 3, title: "Coupe Inter-Entreprises de Football", role: "Participant", date: "30 Nov 2023", status: "En cours" },
  ]);

  const [myTeams, setMyTeams] = useState([
    { id: 1, name: "Les Invincibles", role: "Capitaine", members: 5, tournaments: 3 },
    { id: 2, name: "Team Alpha", role: "Membre", members: 4, tournaments: 1 },
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été mises à jour avec succès.",
    });
    setIsEditing(false);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas.",
      });
      return;
    }
    toast({
      title: "Mot de passe modifié",
      description: "Votre mot de passe a été modifié avec succès.",
    });
    setFormData(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-1/4">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={`https://ui-avatars.com/api/?name=${user?.username || 'User'}&background=random`} />
                    <AvatarFallback>{user?.username?.charAt(0) || 'U'}</AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h2 className="text-xl font-bold">{user?.username}</h2>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                  </div>
                  <Button variant="outline" className="w-full" onClick={() => setIsEditing(true)}>
                    <UserCog className="mr-2 h-4 w-4" />
                    Modifier le profil
                  </Button>
                  <Button variant="outline" className="w-full" onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Déconnexion
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main content */}
          <div className="flex-1">
            <Tabs defaultValue="tournaments">
              <TabsList className="mb-4">
                <TabsTrigger value="tournaments">
                  <Trophy className="mr-2 h-4 w-4" />
                  Mes Tournois
                </TabsTrigger>
                <TabsTrigger value="teams">
                  <Users className="mr-2 h-4 w-4" />
                  Mes Équipes
                </TabsTrigger>
                <TabsTrigger value="account">
                  <User className="mr-2 h-4 w-4" />
                  Mon Compte
                </TabsTrigger>
              </TabsList>

              {/* Tournaments Tab */}
              <TabsContent value="tournaments">
                <Card>
                  <CardHeader>
                    <CardTitle>Mes Tournois</CardTitle>
                    <CardDescription>Les tournois que vous avez créés ou auxquels vous participez</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {myTournaments.length > 0 ? (
                      <div className="space-y-4">
                        {myTournaments.map(tournament => (
                          <div key={tournament.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                            <div>
                              <h3 className="font-medium">{tournament.title}</h3>
                              <div className="flex items-center text-sm text-muted-foreground mt-1">
                                <span className="mr-4">Rôle: {tournament.role}</span>
                                <span>Date: {tournament.date}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`px-3 py-1 text-xs rounded-full ${
                                tournament.status === 'En cours' 
                                  ? 'bg-green-100 text-green-800' 
                                  : tournament.status === 'À venir' 
                                    ? 'bg-blue-100 text-blue-800' 
                                    : 'bg-gray-100 text-gray-800'
                              }`}>
                                {tournament.status}
                              </span>
                              <Button variant="ghost" asChild>
                                <a href={`/tournaments/${tournament.id}`}>
                                  Voir
                                </a>
                              </Button>
                              {(tournament.role === 'Organisateur' || tournament.role === 'Administrateur') && (
                                <Button variant="outline" asChild>
                                  <a href={`/tournaments/${tournament.id}/manage`}>
                                    Gérer
                                  </a>
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center p-8">
                        <Trophy className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                        <h3 className="mt-4 text-lg font-medium">Aucun tournoi</h3>
                        <p className="mt-2 text-sm text-muted-foreground">Vous n'avez pas encore créé ou participé à des tournois.</p>
                        <Button className="mt-4" asChild>
                          <a href="/tournaments/create">Créer un tournoi</a>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Teams Tab */}
              <TabsContent value="teams">
                <Card>
                  <CardHeader>
                    <CardTitle>Mes Équipes</CardTitle>
                    <CardDescription>Les équipes dont vous êtes membre ou capitaine</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {myTeams.length > 0 ? (
                      <div className="space-y-4">
                        {myTeams.map(team => (
                          <div key={team.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                            <div>
                              <h3 className="font-medium">{team.name}</h3>
                              <div className="flex items-center text-sm text-muted-foreground mt-1">
                                <span className="mr-4">Rôle: {team.role}</span>
                                <span className="mr-4">Membres: {team.members}</span>
                                <span>Tournois: {team.tournaments}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" asChild>
                                <a href={`/teams/${team.id}`}>
                                  Voir
                                </a>
                              </Button>
                              {team.role === 'Capitaine' && (
                                <Button variant="outline" asChild>
                                  <a href={`/teams/${team.id}/manage`}>
                                    Gérer
                                  </a>
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center p-8">
                        <Users className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                        <h3 className="mt-4 text-lg font-medium">Aucune équipe</h3>
                        <p className="mt-2 text-sm text-muted-foreground">Vous n'avez pas encore créé ou rejoint d'équipes.</p>
                        <Button className="mt-4" asChild>
                          <a href="/teams/create">Créer une équipe</a>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Account Tab */}
              <TabsContent value="account">
                <Card>
                  <CardHeader>
                    <CardTitle>Mon Compte</CardTitle>
                    <CardDescription>Gérez vos informations personnelles et votre mot de passe</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Informations personnelles</h3>
                        <div className="grid gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="username">Nom d'utilisateur</Label>
                            <Input 
                              id="username" 
                              name="username" 
                              value={formData.username} 
                              onChange={handleChange}
                              disabled={!isEditing}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="email">Adresse e-mail</Label>
                            <Input 
                              id="email" 
                              name="email" 
                              type="email" 
                              value={formData.email} 
                              onChange={handleChange}
                              disabled={!isEditing}
                            />
                          </div>
                        </div>
                      </div>
                      
                      {isEditing && (
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" type="button" onClick={() => setIsEditing(false)}>
                            Annuler
                          </Button>
                          <Button type="submit">
                            Enregistrer
                          </Button>
                        </div>
                      )}
                    </form>

                    <Separator className="my-6" />
                    
                    <form onSubmit={handlePasswordChange} className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Changer de mot de passe</h3>
                        <div className="grid gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                            <Input 
                              id="currentPassword" 
                              name="currentPassword" 
                              type="password" 
                              value={formData.currentPassword} 
                              onChange={handleChange}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                            <Input 
                              id="newPassword" 
                              name="newPassword" 
                              type="password" 
                              value={formData.newPassword} 
                              onChange={handleChange}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                            <Input 
                              id="confirmPassword" 
                              name="confirmPassword" 
                              type="password" 
                              value={formData.confirmPassword} 
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button type="submit">
                          Changer le mot de passe
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Account Delete Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button 
            variant="destructive" 
            className="fixed bottom-6 right-6 bg-red-500 hover:bg-red-600"
          >
            Supprimer mon compte
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Êtes-vous sûr de vouloir supprimer votre compte ?</DialogTitle>
            <DialogDescription>
              Cette action est irréversible. Toutes vos données personnelles seront supprimées de notre système.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline">Annuler</Button>
            <Button variant="destructive">Supprimer définitivement</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Profile;
