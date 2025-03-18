
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Upload, Users, X, ArrowLeft } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Layout from '@/components/Layout';

// Liste de tournois fictifs
const TOURNAMENTS = [
  { id: 1, name: "Coupe de France E-Sport 2023" },
  { id: 2, name: "League of Legends Championship" },
  { id: 3, name: "Tournoi de Tennis Municipal" },
  { id: 4, name: "Coupe Inter-Entreprises de Football" },
];

const CreateTeam = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tournamentId = searchParams.get('tournamentId') ? Number(searchParams.get('tournamentId')) : null;
  
  const [teamName, setTeamName] = useState('');
  const [teamDescription, setTeamDescription] = useState('');
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentTournament, setCurrentTournament] = useState<{id: number, name: string} | null>(null);

  useEffect(() => {
    if (tournamentId) {
      const tournament = TOURNAMENTS.find(t => t.id === tournamentId);
      if (tournament) {
        setCurrentTournament(tournament);
      } else {
        setError("Le tournoi spécifié n'existe pas.");
      }
    } else {
      setError("Veuillez sélectionner un tournoi pour inscrire une équipe.");
    }
  }, [tournamentId]);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = function(event) {
        setLogoPreview(event.target?.result as string);
      };
      
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!tournamentId) {
      setError('Un tournoi doit être sélectionné pour inscrire une équipe.');
      return;
    }
    
    if (!teamName) {
      setError('Le nom de l\'équipe est requis.');
      return;
    }
    
    setIsLoading(true);
    
    // Simulons l'inscription d'une équipe à un tournoi
    setTimeout(() => {
      setIsLoading(false);
      console.log('Team created for tournament:', {
        teamName,
        teamDescription,
        logoPreview,
        tournamentId
      });
      navigate(`/teams?tournamentId=${tournamentId}`);
    }, 1500);
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {currentTournament 
              ? `Inscrire une équipe au ${currentTournament.name}` 
              : "Inscrire une équipe"}
          </h1>
          <p className="mt-2 text-gray-600">
            {currentTournament 
              ? `Complétez le formulaire pour inscrire votre équipe à ce tournoi.` 
              : "Veuillez sélectionner un tournoi pour inscrire une équipe."}
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              {error}
              {!tournamentId && (
                <div className="mt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => navigate('/tournaments')}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Voir les tournois
                  </Button>
                </div>
              )}
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          {tournamentId && (
            <>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Informations de l'équipe</CardTitle>
                  <CardDescription>
                    Détails de l'équipe à inscrire au tournoi
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col sm:flex-row gap-6 items-start">
                    <div className="sm:w-1/3 flex flex-col items-center justify-center">
                      <div className="w-32 h-32 mb-4 relative">
                        <Avatar className="w-full h-full rounded-lg border-2 border-gray-200">
                          <AvatarImage src={logoPreview || ''} />
                          <AvatarFallback className="text-3xl">
                            {teamName ? teamName.substring(0, 2).toUpperCase() : 'EQ'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-200 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100">
                          <Upload className="h-8 w-8 text-white" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="logo" className="cursor-pointer">
                          <span className="bg-gray-100 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors">
                            Télécharger un logo
                          </span>
                          <Input
                            id="logo"
                            type="file"
                            accept="image/*"
                            className="sr-only"
                            onChange={handleLogoChange}
                          />
                        </Label>
                        <p className="text-xs text-gray-500 mt-2 text-center">
                          Format recommandé: PNG, JPG<br />
                          300x300px ou plus
                        </p>
                      </div>
                    </div>

                    <div className="sm:w-2/3 space-y-4 flex-1">
                      <div className="space-y-2">
                        <Label htmlFor="teamName">Nom de l'équipe</Label>
                        <Input
                          id="teamName"
                          placeholder="Ex: Les Invincibles"
                          value={teamName}
                          onChange={(e) => setTeamName(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="teamDescription">Description (optionnel)</Label>
                        <Textarea
                          id="teamDescription"
                          placeholder="Décrivez votre équipe..."
                          rows={4}
                          value={teamDescription}
                          onChange={(e) => setTeamDescription(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Membres de l'équipe</CardTitle>
                  <CardDescription>
                    Vous pourrez ajouter des membres après avoir inscrit l'équipe
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
                    <Users className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">Pas encore de membres</h3>
                    <p className="mt-1 text-gray-500">
                      Créez d'abord votre équipe, puis vous pourrez ajouter des joueurs.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => navigate(`/teams?tournamentId=${tournamentId}`)}
                  disabled={isLoading}
                >
                  <X className="mr-2 h-4 w-4" />
                  Annuler
                </Button>
                <Button 
                  type="submit" 
                  className="bg-tournament-blue hover:bg-blue-600"
                  disabled={isLoading}
                >
                  <Users className="mr-2 h-4 w-4" />
                  {isLoading ? 'Inscription en cours...' : 'Inscrire l\'équipe'}
                </Button>
              </div>
            </>
          )}
        </form>
      </div>
    </Layout>
  );
};

export default CreateTeam;
