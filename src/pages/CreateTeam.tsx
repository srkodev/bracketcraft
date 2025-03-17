
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Upload, Users, X } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Layout from '@/components/Layout';

const CreateTeam = () => {
  const navigate = useNavigate();
  const [teamName, setTeamName] = useState('');
  const [teamDescription, setTeamDescription] = useState('');
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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
    
    if (!teamName) {
      setError('Le nom de l\'équipe est requis.');
      return;
    }
    
    setIsLoading(true);
    
    // Simulons la création d'une équipe
    setTimeout(() => {
      setIsLoading(false);
      console.log('Team created:', { teamName, teamDescription, logoPreview });
      navigate('/teams/1'); // Redirigeons vers la page de la nouvelle équipe
    }, 1500);
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Créer une équipe</h1>
          <p className="mt-2 text-gray-600">
            Définissez les détails de votre nouvelle équipe et invitez des membres.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Informations de l'équipe</CardTitle>
              <CardDescription>
                Détails principaux de votre équipe
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="sm:w-1/3 flex flex-col items-center justify-center">
                  <div className="w-32 h-32 mb-4 relative">
                    <Avatar className="w-full h-full rounded-lg border-2 border-gray-200">
                      <AvatarImage src={logoPreview || ''} />
                      <AvatarFallback className="text-3xl">
                        {teamName ? teamName.substring(0, 2).toUpperCase() : 'TE'}
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
              <CardTitle>Inviter des membres</CardTitle>
              <CardDescription>
                Vous pourrez inviter des joueurs une fois l'équipe créée
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
                <Users className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">Pas encore de membres</h3>
                <p className="mt-1 text-gray-500">
                  Créez d'abord votre équipe, puis vous pourrez inviter des joueurs à la rejoindre.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => navigate('/teams')}
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
              {isLoading ? 'Création en cours...' : 'Créer l\'équipe'}
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateTeam;
