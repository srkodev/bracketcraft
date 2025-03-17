
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertTriangle, Calendar, Info, Trophy, X } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { DateRange } from 'react-day-picker';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import Layout from '@/components/Layout';

const CreateTournament = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'single',
    teamsCount: '8',
    registrationType: 'open',
  });
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 7))
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!formData.name) {
      setError('Le nom du tournoi est requis.');
      return;
    }
    
    if (!date?.from || !date?.to) {
      setError('Les dates du tournoi sont requises.');
      return;
    }
    
    setIsLoading(true);
    
    // Simulons la création d'un tournoi
    setTimeout(() => {
      setIsLoading(false);
      console.log('Tournament created:', { ...formData, date });
      navigate('/tournaments/1/bracket'); // Redirigeons vers le bracket du nouveau tournoi
    }, 1500);
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Créer un tournoi</h1>
          <p className="mt-2 text-gray-600">
            Définissez les détails de votre tournoi et commencez à l'organiser.
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
              <CardTitle>Informations générales</CardTitle>
              <CardDescription>
                Détails principaux de votre tournoi
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom du tournoi</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Ex: Championnat de League of Legends 2023"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Décrivez votre tournoi..."
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label>Dates du tournoi</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {date?.from ? (
                        date.to ? (
                          <>
                            {format(date.from, 'LLL dd, y', { locale: fr })} -{' '}
                            {format(date.to, 'LLL dd, y', { locale: fr })}
                          </>
                        ) : (
                          format(date.from, 'LLL dd, y', { locale: fr })
                        )
                      ) : (
                        <span>Sélectionnez une période</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      initialFocus
                      mode="range"
                      defaultMonth={date?.from}
                      selected={date}
                      onSelect={setDate}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Format du tournoi</CardTitle>
              <CardDescription>
                Configuration du type et de la taille du tournoi
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Type de tournoi</Label>
                <RadioGroup defaultValue={formData.type} onValueChange={(value) => handleSelectChange('type', value)}>
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="single" id="single" />
                      <Label htmlFor="single" className="font-normal cursor-pointer">
                        Élimination simple
                      </Label>
                      <Info className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="double" id="double" />
                      <Label htmlFor="double" className="font-normal cursor-pointer">
                        Élimination double
                      </Label>
                      <Info className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="teamsCount">Nombre d'équipes</Label>
                <Select value={formData.teamsCount} onValueChange={(value) => handleSelectChange('teamsCount', value)}>
                  <SelectTrigger id="teamsCount">
                    <SelectValue placeholder="Sélectionnez le nombre d'équipes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="4">4 équipes</SelectItem>
                    <SelectItem value="8">8 équipes</SelectItem>
                    <SelectItem value="16">16 équipes</SelectItem>
                    <SelectItem value="32">32 équipes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Paramètres d'inscription</CardTitle>
              <CardDescription>
                Définissez comment les équipes peuvent s'inscrire à votre tournoi
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Type d'inscription</Label>
                <RadioGroup 
                  defaultValue={formData.registrationType} 
                  onValueChange={(value) => handleSelectChange('registrationType', value)}
                >
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="open" id="open" />
                      <Label htmlFor="open" className="font-normal cursor-pointer">
                        Inscription ouverte (toute équipe peut s'inscrire)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="approval" id="approval" />
                      <Label htmlFor="approval" className="font-normal cursor-pointer">
                        Sur approbation (vous validez les inscriptions)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="invite" id="invite" />
                      <Label htmlFor="invite" className="font-normal cursor-pointer">
                        Sur invitation uniquement
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => navigate('/tournaments')}
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
              <Trophy className="mr-2 h-4 w-4" />
              {isLoading ? 'Création en cours...' : 'Créer le tournoi'}
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateTournament;
