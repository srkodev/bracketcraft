import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  UserPlus, 
  UserMinus, 
  ListChecks, 
  Calendar, 
  Mail, 
  Trash, 
  Clock, 
  User,
  ShieldCheck,
  Crown
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Layout from '@/components/Layout';
import { useToast } from '@/hooks/use-toast';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from '@/context/AuthContext';

interface TeamMember {
  id: number;
  name: string;
  avatar: string;
  role: 'leader' | 'member';
  joinedAt: string;
}

interface MatchResult {
  teamScore: number;
  opponentScore: number;
  submitted: boolean;
  verified: boolean;
}

interface Match {
  id: number;
  tournamentId: number;
  tournamentName: string;
  opponentId: number;
  opponentName: string;
  opponentLogo: string;
  date: string;
  location: string;
  result?: MatchResult;
  status: 'upcoming' | 'ongoing' | 'completed';
}

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

const TEAM_DATA: Record<string, Team> = {
  "1": {
    id: 1,
    name: "Les Invincibles",
    leader: "Martin Dupont",
    leaderAvatar: "https://randomuser.me/api/portraits/men/1.jpg",
    members: 6,
    wins: 5,
    tournamentId: 1,
    logo: "https://source.unsplash.com/random/100x100/?logo"
  },
  "2": {
    id: 2,
    name: "Team Phoenix",
    leader: "Sophie Martin",
    leaderAvatar: "https://randomuser.me/api/portraits/women/1.jpg",
    members: 4,
    wins: 3,
    tournamentId: 1,
    logo: "https://source.unsplash.com/random/100x100/?phoenix"
  }
};

const TEAM_MEMBERS: Record<string, TeamMember[]> = {
  "1": [
    { id: 1, name: "Martin Dupont", avatar: "https://randomuser.me/api/portraits/men/1.jpg", role: "leader", joinedAt: "2023-01-15" },
    { id: 2, name: "Lucie Bernard", avatar: "https://randomuser.me/api/portraits/women/4.jpg", role: "member", joinedAt: "2023-01-20" },
    { id: 3, name: "Antoine Petit", avatar: "https://randomuser.me/api/portraits/men/5.jpg", role: "member", joinedAt: "2023-01-25" },
    { id: 4, name: "Emma Dubois", avatar: "https://randomuser.me/api/portraits/women/6.jpg", role: "member", joinedAt: "2023-01-30" },
    { id: 5, name: "Thomas Leroy", avatar: "https://randomuser.me/api/portraits/men/7.jpg", role: "member", joinedAt: "2023-02-05" },
    { id: 6, name: "Julie Moreau", avatar: "https://randomuser.me/api/portraits/women/8.jpg", role: "member", joinedAt: "2023-02-10" }
  ],
  "2": [
    { id: 7, name: "Sophie Martin", avatar: "https://randomuser.me/api/portraits/women/1.jpg", role: "leader", joinedAt: "2023-01-15" },
    { id: 8, name: "Paul Roux", avatar: "https://randomuser.me/api/portraits/men/9.jpg", role: "member", joinedAt: "2023-01-20" },
    { id: 9, name: "Marie Fournier", avatar: "https://randomuser.me/api/portraits/women/10.jpg", role: "member", joinedAt: "2023-01-25" },
    { id: 10, name: "David Simon", avatar: "https://randomuser.me/api/portraits/men/11.jpg", role: "member", joinedAt: "2023-01-30" }
  ]
};

const TEAM_MATCHES: Record<string, Match[]> = {
  "1": [
    {
      id: 1,
      tournamentId: 1,
      tournamentName: "Coupe de France E-Sport 2023",
      opponentId: 2,
      opponentName: "Team Phoenix",
      opponentLogo: "https://source.unsplash.com/random/100x100/?phoenix",
      date: "2023-06-15T14:00:00",
      location: "Salle E-sport Paris",
      status: "ongoing",
      result: {
        teamScore: 0,
        opponentScore: 0,
        submitted: false,
        verified: false
      }
    },
    {
      id: 2,
      tournamentId: 1,
      tournamentName: "Coupe de France E-Sport 2023",
      opponentId: 3,
      opponentName: "Les Stratèges",
      opponentLogo: "https://source.unsplash.com/random/100x100/?strategy",
      date: "2023-06-22T16:00:00",
      location: "Salle E-sport Lyon",
      status: "upcoming"
    },
    {
      id: 3,
      tournamentId: 1,
      tournamentName: "Coupe de France E-Sport 2023",
      opponentId: 4,
      opponentName: "Équipe Alpha",
      opponentLogo: "https://source.unsplash.com/random/100x100/?alpha",
      date: "2023-06-08T15:00:00",
      location: "Salle E-sport Marseille",
      status: "completed",
      result: {
        teamScore: 3,
        opponentScore: 1,
        submitted: true,
        verified: true
      }
    }
  ],
  "2": [
    {
      id: 1,
      tournamentId: 1,
      tournamentName: "Coupe de France E-Sport 2023",
      opponentId: 1,
      opponentName: "Les Invincibles",
      opponentLogo: "https://source.unsplash.com/random/100x100/?logo",
      date: "2023-06-15T14:00:00",
      location: "Salle E-sport Paris",
      status: "ongoing"
    }
  ]
};

const TeamDetail = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const mockTeamId = "1";
  
  const [team, setTeam] = useState<Team | null>(null);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [inviteEmail, setInviteEmail] = useState('');
  const [matchResults, setMatchResults] = useState<{[key: number]: {teamScore: number, opponentScore: number}}>({}); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState<TeamMember | null>(null);

  useEffect(() => {
    const teamData = TEAM_DATA[mockTeamId];
    
    if (teamData) {
      setTeam(teamData);

      const teamMembers = TEAM_MEMBERS[mockTeamId] || [];
      setMembers(teamMembers);

      const teamMatches = TEAM_MATCHES[mockTeamId] || [];
      setMatches(teamMatches);

      const initialResults: {[key: number]: {teamScore: number, opponentScore: number}} = {};
      teamMatches
        .filter(match => match.status === 'ongoing')
        .forEach(match => {
          initialResults[match.id] = {
            teamScore: match.result?.teamScore || 0,
            opponentScore: match.result?.opponentScore || 0
          };
        });
      setMatchResults(initialResults);
    }
  }, []);

  const handleInviteMember = () => {
    if (!inviteEmail) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer une adresse email valide",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Invitation envoyée",
      description: `Une invitation a été envoyée à ${inviteEmail}`,
    });
    setInviteEmail('');
  };

  const handleRemoveMember = (member: TeamMember) => {
    setMemberToRemove(member);
    setRemoveDialogOpen(true);
  };

  const confirmRemoveMember = () => {
    if (!memberToRemove) return;

    const updatedMembers = members.filter(m => m.id !== memberToRemove.id);
    setMembers(updatedMembers);
    
    toast({
      title: "Membre supprimé",
      description: `${memberToRemove.name} a été retiré de l'équipe`,
    });
    
    setRemoveDialogOpen(false);
    setMemberToRemove(null);
  };

  const handleMatchResultChange = (matchId: number, field: 'teamScore' | 'opponentScore', value: number) => {
    setMatchResults(prev => ({
      ...prev,
      [matchId]: {
        ...prev[matchId],
        [field]: value
      }
    }));
  };

  const submitMatchResult = (matchId: number) => {
    setIsSubmitting(true);
    
    setTimeout(() => {
      const result = matchResults[matchId];
      
      const updatedMatches = matches.map(match => {
        if (match.id === matchId) {
          return {
            ...match,
            result: {
              teamScore: result.teamScore,
              opponentScore: result.opponentScore,
              submitted: true,
              verified: false
            }
          };
        }
        return match;
      });
      
      setMatches(updatedMatches);
      setIsSubmitting(false);
      
      toast({
        title: "Résultat soumis",
        description: "Le résultat du match a été soumis avec succès",
      });
    }, 1000);
  };

  if (!team) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold">Chargement des données d'équipe...</h1>
        </div>
      </Layout>
    );
  }

  const upcomingMatches = matches.filter(match => match.status === 'upcoming');
  const ongoingMatches = matches.filter(match => match.status === 'ongoing');
  const completedMatches = matches.filter(match => match.status === 'completed');

  upcomingMatches.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const isLeader = user && user.username === team.leader;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-gray-200">
              <AvatarImage src={team.logo} alt={team.name} />
              <AvatarFallback>{team.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {team.name}
              </h1>
              <div className="flex items-center mt-1 text-gray-600">
                <Crown className="mr-2 h-4 w-4 text-tournament-gold" />
                <span>{team.leader}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 md:mt-0 flex gap-2">
            <Button className="bg-tournament-blue hover:bg-blue-600">
              Éditer l'équipe
            </Button>
          </div>
        </div>

        <Tabs defaultValue="members" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="members" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Membres</span>
            </TabsTrigger>
            <TabsTrigger value="currentMatch" className="flex items-center gap-2">
              <ListChecks className="h-4 w-4" />
              <span>Match en cours</span>
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Calendrier</span>
            </TabsTrigger>
            <TabsTrigger value="results" className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              <span>Résultats</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="members">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des membres</CardTitle>
                <CardDescription>
                  Invitez de nouveaux membres ou gérez les membres existants de votre équipe.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4">Inviter un nouveau membre</h3>
                  <div className="flex gap-2">
                    <Input
                      type="email"
                      placeholder="Adresse email"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      className="flex-grow"
                    />
                    <Button onClick={handleInviteMember} className="bg-tournament-blue hover:bg-blue-600">
                      <Mail className="mr-2 h-4 w-4" />
                      Inviter
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Membres de l'équipe ({members.length})</h3>
                  <div className="space-y-4">
                    {members.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{member.name}</div>
                            <div className="text-sm text-gray-500 flex items-center gap-1">
                              {member.role === 'leader' ? (
                                <>
                                  <Crown className="h-3 w-3 text-tournament-gold" />
                                  <span>Chef d'équipe</span>
                                </>
                              ) : (
                                <span>Membre</span>
                              )}
                            </div>
                          </div>
                        </div>
                        {isLeader && member.role !== 'leader' && (
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleRemoveMember(member)}
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="currentMatch">
            <Card>
              <CardHeader>
                <CardTitle>Match en cours</CardTitle>
                <CardDescription>
                  Proposez le résultat du match actuellement en cours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {ongoingMatches.length > 0 ? (
                  <div className="space-y-6">
                    {ongoingMatches.map((match) => (
                      <div key={match.id} className="p-6 bg-white border rounded-lg shadow-sm">
                        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                          <div className="mb-4 md:mb-0">
                            <h3 className="text-lg font-semibold">{match.tournamentName}</h3>
                            <div className="flex items-center text-gray-500 mt-1">
                              <Clock className="mr-2 h-4 w-4" />
                              {new Date(match.date).toLocaleDateString('fr-FR', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </div>
                          </div>
                          <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                            En cours
                          </div>
                        </div>
                        
                        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
                          <div className="flex flex-col items-center text-center">
                            <Avatar className="h-16 w-16 mb-2">
                              <AvatarImage src={team.logo} alt={team.name} />
                              <AvatarFallback>{team.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="font-medium">{team.name}</div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col items-center">
                              <label className="text-sm text-gray-500 mb-1">Votre score</label>
                              <Input
                                type="number"
                                min="0"
                                className="w-16 text-center text-lg font-bold"
                                value={matchResults[match.id]?.teamScore || 0}
                                onChange={(e) => handleMatchResultChange(match.id, 'teamScore', parseInt(e.target.value) || 0)}
                              />
                            </div>
                            <span className="text-gray-400 text-xl font-light">-</span>
                            <div className="flex flex-col items-center">
                              <label className="text-sm text-gray-500 mb-1">Score adversaire</label>
                              <Input
                                type="number"
                                min="0"
                                className="w-16 text-center text-lg font-bold"
                                value={matchResults[match.id]?.opponentScore || 0}
                                onChange={(e) => handleMatchResultChange(match.id, 'opponentScore', parseInt(e.target.value) || 0)}
                              />
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-center text-center">
                            <Avatar className="h-16 w-16 mb-2">
                              <AvatarImage src={match.opponentLogo} alt={match.opponentName} />
                              <AvatarFallback>{match.opponentName.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="font-medium">{match.opponentName}</div>
                          </div>
                        </div>

                        {match.result?.submitted ? (
                          <div className="bg-blue-50 text-blue-700 p-4 rounded-md flex items-center">
                            <ShieldCheck className="h-5 w-5 mr-2" />
                            <span>Résultat soumis ({match.result.teamScore} - {match.result.opponentScore}). En attente de vérification.</span>
                          </div>
                        ) : (
                          <div className="flex justify-center">
                            <Button 
                              className="bg-tournament-blue hover:bg-blue-600"
                              onClick={() => submitMatchResult(match.id)}
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? "Soumission en cours..." : "Soumettre le résultat"}
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <ListChecks className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">Aucun match en cours</h3>
                    <p className="mt-1 text-gray-500">
                      Il n'y a actuellement aucun match en cours pour votre équipe.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle>Calendrier des matchs</CardTitle>
                <CardDescription>
                  Consultez les prochains matchs de votre équipe.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {upcomingMatches.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingMatches.map((match) => (
                      <div key={match.id} className="p-4 border rounded-lg flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-4">
                          <div className="hidden md:block">
                            <div className="bg-gray-100 rounded-md p-2 w-14 h-14 flex flex-col items-center justify-center">
                              <div className="text-sm font-bold">
                                {new Date(match.date).toLocaleDateString('fr-FR', { day: 'numeric' })}
                              </div>
                              <div className="text-xs text-gray-500">
                                {new Date(match.date).toLocaleDateString('fr-FR', { month: 'short' })}
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="font-medium">{match.tournamentName}</div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <Clock className="mr-1 h-3.5 w-3.5" />
                              {new Date(match.date).toLocaleTimeString('fr-FR', { 
                                hour: '2-digit', 
                                minute: '2-digit'
                              })}
                            </div>
                            <div className="text-sm text-gray-500 mt-1">{match.location}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col items-center text-center">
                            <Avatar className="h-10 w-10 mb-1">
                              <AvatarImage src={team.logo} alt={team.name} />
                              <AvatarFallback>{team.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="text-sm font-medium">{team.name}</div>
                          </div>
                          
                          <span className="text-sm text-gray-400 font-medium">VS</span>
                          
                          <div className="flex flex-col items-center text-center">
                            <Avatar className="h-10 w-10 mb-1">
                              <AvatarImage src={match.opponentLogo} alt={match.opponentName} />
                              <AvatarFallback>{match.opponentName.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="text-sm font-medium">{match.opponentName}</div>
                          </div>
                        </div>
                        
                        <div className="md:text-right">
                          <div className="text-sm md:mb-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full inline-block">
                            À venir
                          </div>
                          <div className="text-xs text-gray-500 hidden md:block">
                            {new Date(match.date).toLocaleDateString('fr-FR', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">Aucun match à venir</h3>
                    <p className="mt-1 text-gray-500">
                      Il n'y a actuellement aucun match planifié pour votre équipe.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results">
            <Card>
              <CardHeader>
                <CardTitle>Résultats des matchs</CardTitle>
                <CardDescription>
                  Consultez les résultats des matchs terminés.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {completedMatches.length > 0 ? (
                  <div className="space-y-4">
                    {completedMatches.map((match) => (
                      <div key={match.id} className="p-4 border rounded-lg flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-4">
                          <div className="hidden md:block">
                            <div className="bg-gray-100 rounded-md p-2 w-14 h-14 flex flex-col items-center justify-center">
                              <div className="text-sm font-bold">
                                {new Date(match.date).toLocaleDateString('fr-FR', { day: 'numeric' })}
                              </div>
                              <div className="text-xs text-gray-500">
                                {new Date(match.date).toLocaleDateString('fr-FR', { month: 'short' })}
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="font-medium">{match.tournamentName}</div>
                            <div className="text-sm text-gray-500 mt-1">{match.location}</div>
                            {match.result?.verified && (
                              <div className="text-xs flex items-center text-green-600 mt-1">
                                <ShieldCheck className="mr-1 h-3 w-3" />
                                Résultat vérifié
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="flex flex-col items-center text-center">
                            <Avatar className="h-10 w-10 mb-1">
                              <AvatarImage src={team.logo} alt={team.name} />
                              <AvatarFallback>{team.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="text-sm font-medium">{team.name}</div>
                          </div>
                          
                          <div className="text-lg font-bold">
                            {match.result?.teamScore} - {match.result?.opponentScore}
                          </div>
                          
                          <div className="flex flex-col items-center text-center">
                            <Avatar className="h-10 w-10 mb-1">
                              <AvatarImage src={match.opponentLogo} alt={match.opponentName} />
                              <AvatarFallback>{match.opponentName.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="text-sm font-medium">{match.opponentName}</div>
                          </div>
                        </div>
                        
                        <div className="md:text-right">
                          <div className="text-sm md:mb-1 bg-green-100 text-green-800 px-2 py-1 rounded-full inline-block">
                            Terminé
                          </div>
                          <div className="text-xs text-gray-500 hidden md:block">
                            {new Date(match.date).toLocaleDateString('fr-FR', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <ShieldCheck className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">Aucun match terminé</h3>
                    <p className="mt-1 text-gray-500">
                      Votre équipe n'a pas encore participé à des matchs terminés.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Dialog open={removeDialogOpen} onOpenChange={setRemoveDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmer la suppression</DialogTitle>
              <DialogDescription>
                Êtes-vous sûr de vouloir retirer {memberToRemove?.name} de l'équipe ? Cette action ne peut pas être annulée.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setRemoveDialogOpen(false)}>
                Annuler
              </Button>
              <Button 
                variant="destructive" 
                onClick={confirmRemoveMember}
              >
                <Trash className="mr-2 h-4 w-4" />
                Supprimer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default TeamDetail;
