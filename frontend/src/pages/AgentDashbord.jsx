import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Plus, 
  Calendar,
  TrendingUp,
  Download,
  Filter,
  User,
  Home,
  Briefcase,
  Building,
  Phone,
  Mail,
  Edit,
  Bell,
  ChevronRight,
  FileText,
  BarChart3
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AgentDashbord = () => {
  const [agentData, setAgentData] = useState({
    nom: 'Lorent Marcos',
    matricule: '358RTX5RJ',
    poste: 'Commercial Senior',
    direction: 'Direction Commerciale',
    responsable: 'Paul Durand',
    email: 'lorent.marcos@entreprise.com',
    telephone: '+229 01 23 45 67',
    dateEmbauche: '2022-03-15'
  });

  const [stats, setStats] = useState({
    positionsTotal: 0,
    positionsValidees: 0,
    positionsEnAttente: 0,
    positionsRejetees: 0,
    positionsMois: 0,
    tauxValidation: 0
  });

  const [recentPositions, setRecentPositions] = useState([]);
  const [todayPosition, setTodayPosition] = useState(null);
  const [upcomingPositions, setUpcomingPositions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Données simulées
  useEffect(() => {
    setTimeout(() => {
      setStats({
        positionsTotal: 48,
        positionsValidees: 42,
        positionsEnAttente: 3,
        positionsRejetees: 3,
        positionsMois: 8,
        tauxValidation: 87.5
      });

      setRecentPositions([
        {
          id: 1,
          type: 'Mission',
          motif: 'Visite client ABC Corp',
          lieu: 'Godomey',
          dateDebut: '2024-01-15',
          dateFin: '2024-01-15',
          statut: 'validé',
          responsable: 'Paul Durand',
          dateCreation: '2024-01-14'
        },
        {
          id: 2,
          type: 'Télétravail',
          motif: 'Travail à distance',
          lieu: 'Domicile',
          dateDebut: '2024-01-12',
          dateFin: '2024-01-12',
          statut: 'validé',
          responsable: 'Paul Durand',
          dateCreation: '2024-01-11'
        },
        {
          id: 3,
          type: 'Formation',
          motif: 'Formation produits nouveaux',
          lieu: 'Siège social',
          dateDebut: '2024-01-10',
          dateFin: '2024-01-10',
          statut: 'en_attente',
          responsable: 'Paul Durand',
          dateCreation: '2024-01-09'
        },
        {
          id: 4,
          type: 'Congé',
          motif: 'Congé annuel',
          lieu: 'Domicile',
          dateDebut: '2024-01-08',
          dateFin: '2024-01-10',
          statut: 'validé',
          responsable: 'Paul Durand',
          dateCreation: '2024-01-07'
        }
      ]);

      setTodayPosition({
        type: 'Mission',
        motif: 'Réunion équipe commerciale',
        lieu: 'Siège social - Salle A',
        heureDebut: '14:00',
        heureFin: '16:00',
        statut: 'en_cours'
      });

      setUpcomingPositions([
        {
          id: 5,
          date: 'Demain',
          type: 'Télétravail',
          motif: 'Travail à distance',
          heure: 'Toute la journée'
        },
        {
          id: 6,
          date: '18 Jan',
          type: 'Mission',
          motif: 'Présentation client',
          heure: '10:00 - 12:00'
        },
        {
          id: 7,
          date: '22 Jan',
          type: 'Formation',
          motif: 'Outils CRM',
          heure: '09:00 - 17:00'
        }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const StatCard = ({ title, value, icon: Icon, color = 'blue', subtitle, trend }) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      orange: 'bg-orange-100 text-orange-600',
      purple: 'bg-purple-100 text-purple-600',
      red: 'bg-red-100 text-red-600'
    };

    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
            {subtitle && (
              <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
            )}
            {trend && (
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600">{trend}</span>
              </div>
            )}
          </div>
          <div className={`p-3 rounded-lg ${colors[color]}`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </div>
    );
  };

  const StatusBadge = ({ statut }) => {
    const config = {
      validé: { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Validé' },
      en_attente: { color: 'bg-yellow-100 text-yellow-800', icon: Clock, label: 'En attente' },
      rejeté: { color: 'bg-red-100 text-red-800', icon: AlertCircle, label: 'Rejeté' },
      en_cours: { color: 'bg-blue-100 text-blue-800', icon: Clock, label: 'En cours' }
    };

    const { color, icon: Icon, label } = config[statut] || config.en_attente;

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${color}`}>
        <Icon className="w-3 h-3" />
        {label}
      </span>
    );
  };

  const QuickAction = ({ title, description, icon: Icon, action, color = 'blue' }) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-700 hover:bg-blue-100',
      green: 'bg-green-50 text-green-700 hover:bg-green-100',
      purple: 'bg-purple-50 text-purple-700 hover:bg-purple-100',
      orange: 'bg-orange-50 text-orange-700 hover:bg-orange-100'
    };

    return (
      <button
        onClick={action}
        className={`${colors[color]} p-4 rounded-xl text-left transition-colors w-full`}
      >
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${colors[color].replace('50', '100').replace(' hover:bg', '')}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm mt-1 opacity-80">{description}</p>
          </div>
          <ChevronRight className="w-5 h-5 opacity-50" />
        </div>
      </button>
    );
  };

  const TypeBadge = ({ type }) => {
    const colors = {
      Mission: 'bg-blue-100 text-blue-800',
      Télétravail: 'bg-green-100 text-green-800',
      Formation: 'bg-orange-100 text-orange-800',
      Congé: 'bg-purple-100 text-purple-800',
      Réunion: 'bg-indigo-100 text-indigo-800',
      Maladie: 'bg-red-100 text-red-800'
    };

    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${colors[type] || 'bg-gray-100 text-gray-800'}`}>
        {type}
      </span>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* En-tête avec bienvenue */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Bonjour, {agentData.nom} 👋</h1>
              <p className="text-gray-600 mt-2">Voici votre tableau de bord personnel</p>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Building className="w-4 h-4" />
                  {agentData.direction}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Briefcase className="w-4 h-4" />
                  {agentData.poste}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User className="w-4 h-4" />
                  {agentData.responsable}
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="p-2 hover:bg-white rounded-lg transition-colors relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Nouvelle Position
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne gauche : Profil et actions rapides */}
          <div className="lg:col-span-1">
            {/* Carte profil */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 bg-blue-100 rounded-xl flex items-center justify-center">
                    <span className="text-2xl font-bold text-blue-600">
                      {agentData.nom.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{agentData.nom}</h2>
                    <p className="text-gray-600">{agentData.poste}</p>
                    <p className="text-sm text-gray-500 mt-1">{agentData.matricule}</p>
                  </div>
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Edit className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Building className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Direction</p>
                    <p className="font-medium">{agentData.direction}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Responsable</p>
                    <p className="font-medium">{agentData.responsable}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{agentData.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Téléphone</p>
                    <p className="font-medium">{agentData.telephone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Date d'embauche</p>
                    <p className="font-medium">{agentData.dateEmbauche}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions rapides */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Actions rapides</h2>
              <div className="space-y-3">
                <QuickAction
                  title="Nouvelle position"
                  description="Déclarer une mission, congé, télétravail..."
                  icon={Plus}
                  action={() => alert('Créer nouvelle position')}
                  color="blue"
                />
                <QuickAction
                  title="Mes positions"
                  description="Voir mon historique complet"
                  icon={FileText}
                  action={() => alert('Voir mes positions')}
                  color="green"
                />
                <QuickAction
                  title="Statistiques"
                  description="Mes indicateurs personnels"
                  icon={BarChart3}
                  action={() => alert('Voir statistiques')}
                  color="purple"
                />
                <QuickAction
                  title="Modifier profil"
                  description="Mettre à jour mes informations"
                  icon={Edit}
                  action={() => alert('Modifier profil')}
                  color="orange"
                />
              </div>
            </div>
          </div>

          {/* Colonne centrale : Statistiques et aujourd'hui */}
          <div className="lg:col-span-2">
            {/* Statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <StatCard
                title="Total Positions"
                value={stats.positionsTotal}
                icon={MapPin}
                color="blue"
                subtitle="Depuis le début"
              />
              <StatCard
                title="Validées"
                value={stats.positionsValidees}
                icon={CheckCircle}
                color="green"
                subtitle={`${stats.tauxValidation}% de taux`}
              />
              <StatCard
                title="En attente"
                value={stats.positionsEnAttente}
                icon={Clock}
                color="orange"
                subtitle="En cours de validation"
              />
            </div>

            {/* Position du jour */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Aujourd'hui</h2>
                <span className="text-sm text-gray-500">
                  {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                </span>
              </div>

              {todayPosition ? (
                <div className="bg-blue-50 rounded-xl p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <TypeBadge type={todayPosition.type} />
                        <StatusBadge statut={todayPosition.statut} />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{todayPosition.motif}</h3>
                      <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-700">{todayPosition.lieu}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-700">
                            {todayPosition.heureDebut} - {todayPosition.heureFin}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                      Modifier
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-xl">
                  <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-900">Aucune position aujourd'hui</h3>
                  <p className="text-gray-600 mt-1 mb-4">Vous n'avez pas déclaré de position pour aujourd'hui</p>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Déclarer une position
                  </button>
                </div>
              )}
            </div>

            {/* Positions à venir et récentes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Positions à venir */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">À venir</h2>
                  <span className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                    Tout voir
                  </span>
                </div>
                <div className="space-y-4">
                  {upcomingPositions.map((position) => (
                    <div key={position.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <TypeBadge type={position.type} />
                            <span className="text-sm font-medium text-gray-900">{position.date}</span>
                          </div>
                          <h3 className="font-medium text-gray-900">{position.motif}</h3>
                          <div className="flex items-center gap-1 mt-2 text-sm text-gray-500">
                            <Clock className="w-3 h-3" />
                            {position.heure}
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Positions récentes */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Positions récentes</h2>
                  <span className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                    Voir historique
                  </span>
                </div>
                <div className="space-y-4">
                  {recentPositions.map((position) => (
                    <div key={position.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <TypeBadge type={position.type} />
                        <StatusBadge statut={position.statut} />
                      </div>
                      <h3 className="font-medium text-gray-900 mb-2">{position.motif}</h3>
                      <div className="flex justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {position.lieu}
                        </div>
                        <div>
                          {position.dateDebut}
                          {position.dateFin !== position.dateDebut && ` - ${position.dateFin}`}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Graphique d'activité simplifié */}
            <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Mon activité</h2>
                  <p className="text-gray-600 mt-1">Positions des 30 derniers jours</p>
                </div>
                <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm">
                  <option>30 derniers jours</option>
                  <option>Ce mois</option>
                  <option>3 derniers mois</option>
                </select>
              </div>
              <div className="h-48 flex items-end gap-1">
                {Array.from({ length: 30 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-blue-100 hover:bg-blue-200 rounded-t transition-colors"
                    style={{
                      height: `${Math.max(20, Math.sin(i / 3) * 40 + Math.random() * 30)}%`
                    }}
                    title={`Jour ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDashbord;