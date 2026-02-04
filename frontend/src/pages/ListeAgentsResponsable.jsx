import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter,
  Download,
  Eye,
  Phone,
  Mail,
  Calendar,
  MapPin,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  User,
  Building,
  Briefcase,
  CheckCircle,
  Clock,
  XCircle,
  BarChart3,
  Printer,
  Plus,
  MessageSquare,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const ListeAgentsResponsable = () => {
  const [agents, setAgents] = useState([]);
  const [filteredAgents, setFilteredAgents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPoste, setSelectedPoste] = useState('tous');
  const [selectedStatut, setSelectedStatut] = useState('tous');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [expandedAgent, setExpandedAgent] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' ou 'list'
  const itemsPerPage = 12;
  
  const [responsableInfo, setResponsableInfo] = useState({
    nom: 'Paul Durand',
    direction: 'Direction Commerciale',
    totalAgents: 0
  });

  // Données simulées
  useEffect(() => {
    setTimeout(() => {
      const agentsData = [
        {
          id: 1,
          nom: 'Lorent Marcos',
          matricule: '358RTX5RJ',
          poste: 'Commercial Senior',
          email: 'lorent.marcos@entreprise.com',
          telephone: '+229 01 23 45 67',
          dateEmbauche: '2022-03-15',
          statut: 'actif',
          positionsTotal: 45,
          positionsValidees: 42,
          positionsEnAttente: 2,
          positionsRejetees: 1,
          dernierePosition: {
            type: 'Mission',
            motif: 'Visite client',
            date: '2024-01-15',
            statut: 'validé'
          },
          performance: 95,
          notes: 'Excellent agent, très performant'
        },
        {
          id: 2,
          nom: 'Sophie Martin',
          matricule: '459TYU8KL',
          poste: 'Commercial',
          email: 'sophie.martin@entreprise.com',
          telephone: '+229 02 34 56 78',
          dateEmbauche: '2021-07-22',
          statut: 'actif',
          positionsTotal: 32,
          positionsValidees: 30,
          positionsEnAttente: 1,
          positionsRejetees: 1,
          dernierePosition: {
            type: 'Télétravail',
            motif: 'Travail à distance',
            date: '2024-01-14',
            statut: 'validé'
          },
          performance: 88,
          notes: 'Très bonne communication'
        },
        {
          id: 3,
          nom: 'Jean Dupont',
          matricule: '267GHJ4DF',
          poste: 'Commercial Junior',
          email: 'jean.dupont@entreprise.com',
          telephone: '+229 03 45 67 89',
          dateEmbauche: '2023-01-10',
          statut: 'actif',
          positionsTotal: 18,
          positionsValidees: 16,
          positionsEnAttente: 2,
          positionsRejetees: 0,
          dernierePosition: {
            type: 'Formation',
            motif: 'Outils CRM',
            date: '2024-01-13',
            statut: 'en_attente'
          },
          performance: 75,
          notes: 'En progression constante'
        },
        {
          id: 4,
          nom: 'Marie Curie',
          matricule: '789XYZ123',
          poste: 'Commercial Senior',
          email: 'marie.curie@entreprise.com',
          telephone: '+229 04 56 78 90',
          dateEmbauche: '2020-11-05',
          statut: 'inactif',
          positionsTotal: 52,
          positionsValidees: 50,
          positionsEnAttente: 0,
          positionsRejetees: 2,
          dernierePosition: {
            type: 'Congé',
            motif: 'Congé annuel',
            date: '2024-01-10',
            statut: 'validé'
          },
          performance: 92,
          notes: 'Actuellement en congé'
        },
        {
          id: 5,
          nom: 'Thomas Leroy',
          matricule: '111ABC222',
          poste: 'Commercial',
          email: 'thomas.leroy@entreprise.com',
          telephone: '+229 05 67 89 01',
          dateEmbauche: '2022-09-18',
          statut: 'actif',
          positionsTotal: 28,
          positionsValidees: 26,
          positionsEnAttente: 1,
          positionsRejetees: 1,
          dernierePosition: {
            type: 'Mission',
            motif: 'Réunion partenaire',
            date: '2024-01-12',
            statut: 'rejeté'
          },
          performance: 82,
          notes: 'Besoin de suivi régulier'
        },
        {
          id: 6,
          nom: 'Julie Petit',
          matricule: '333DEF444',
          poste: 'Commercial Junior',
          email: 'julie.petit@entreprise.com',
          telephone: '+229 06 78 90 12',
          dateEmbauche: '2023-03-25',
          statut: 'actif',
          positionsTotal: 15,
          positionsValidees: 14,
          positionsEnAttente: 0,
          positionsRejetees: 1,
          dernierePosition: {
            type: 'Maladie',
            motif: 'Arrêt maladie',
            date: '2024-01-11',
            statut: 'validé'
          },
          performance: 70,
          notes: 'Nouvel agent, formation en cours'
        },
        {
          id: 7,
          nom: 'Marc Dubois',
          matricule: '555GHI666',
          poste: 'Commercial Senior',
          email: 'marc.dubois@entreprise.com',
          telephone: '+229 07 89 01 23',
          dateEmbauche: '2021-05-30',
          statut: 'actif',
          positionsTotal: 38,
          positionsValidees: 36,
          positionsEnAttente: 1,
          positionsRejetees: 1,
          dernierePosition: {
            type: 'Réunion',
            motif: 'Présentation résultats',
            date: '2024-01-09',
            statut: 'validé'
          },
          performance: 90,
          notes: 'Très bon relationnel client'
        },
        {
          id: 8,
          nom: 'Léa Moreau',
          matricule: '777JKL888',
          poste: 'Commercial',
          email: 'lea.moreau@entreprise.com',
          telephone: '+229 08 90 12 34',
          dateEmbauche: '2022-12-01',
          statut: 'actif',
          positionsTotal: 25,
          positionsValidees: 23,
          positionsEnAttente: 2,
          positionsRejetees: 0,
          dernierePosition: {
            type: 'Formation',
            motif: 'Négociation',
            date: '2024-01-08',
            statut: 'en_attente'
          },
          performance: 85,
          notes: 'Très motivée et proactive'
        }
      ];

      setAgents(agentsData);
      setFilteredAgents(agentsData);
      setResponsableInfo(prev => ({
        ...prev,
        totalAgents: agentsData.length
      }));
      setLoading(false);
    }, 1000);
  }, []);

  const postes = ['tous', ...new Set(agents.map(a => a.poste))];
  const statuts = ['tous', 'actif', 'inactif'];

  // Filtrage des agents
  useEffect(() => {
    let result = agents;

    if (searchTerm) {
      result = result.filter(agent =>
        agent.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.matricule.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedPoste !== 'tous') {
      result = result.filter(agent => agent.poste === selectedPoste);
    }

    if (selectedStatut !== 'tous') {
      result = result.filter(agent => agent.statut === selectedStatut);
    }

    setFilteredAgents(result);
    setCurrentPage(1);
  }, [searchTerm, selectedPoste, selectedStatut, agents]);

  const totalPages = Math.ceil(filteredAgents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAgents = filteredAgents.slice(startIndex, endIndex);

  const getStats = () => {
    const total = filteredAgents.length;
    const actifs = filteredAgents.filter(a => a.statut === 'actif').length;
    const inactifs = filteredAgents.filter(a => a.statut === 'inactif').length;
    const totalPositions = filteredAgents.reduce((sum, agent) => sum + agent.positionsTotal, 0);
    const positionsEnAttente = filteredAgents.reduce((sum, agent) => sum + agent.positionsEnAttente, 0);

    return { total, actifs, inactifs, totalPositions, positionsEnAttente };
  };

  const stats = getStats();

  const StatusBadge = ({ statut }) => {
    if (statut === 'validé') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs">
          <CheckCircle className="w-3 h-3" />
          Validé
        </span>
      );
    } else if (statut === 'en_attente') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full text-xs">
          <Clock className="w-3 h-3" />
          En attente
        </span>
      );
    } else if (statut === 'rejeté') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-800 rounded-full text-xs">
          <XCircle className="w-3 h-3" />
          Rejeté
        </span>
      );
    }
    return null;
  };

  const PerformanceIndicator = ({ performance }) => {
    let color = 'bg-red-500';
    let textColor = 'text-red-700';
    
    if (performance >= 90) {
      color = 'bg-green-500';
      textColor = 'text-green-700';
    } else if (performance >= 75) {
      color = 'bg-blue-500';
      textColor = 'text-blue-700';
    } else if (performance >= 60) {
      color = 'bg-yellow-500';
      textColor = 'text-yellow-700';
    }

    return (
      <div className="flex items-center gap-2">
        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full ${color} rounded-full`}
            style={{ width: `${performance}%` }}
          ></div>
        </div>
        <span className={`text-xs font-medium ${textColor}`}>{performance}%</span>
      </div>
    );
  };

  const AgentCard = ({ agent }) => {
    const isExpanded = expandedAgent === agent.id;

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
        {/* En-tête de la carte */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 font-bold text-lg">
                  {agent.nom.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{agent.nom}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                    agent.statut === 'actif' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {agent.statut === 'actif' ? 'Actif' : 'Inactif'}
                  </span>
                  <span className="text-xs text-gray-500">{agent.matricule}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setExpandedAgent(isExpanded ? null : agent.id)}
              className="p-1 text-gray-400 hover:text-gray-600"
            >
              {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          </div>

          {/* Informations principales */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Briefcase className="w-4 h-4 text-gray-400" />
              <span className="text-gray-700">{agent.poste}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-gray-700">Embauché le {agent.dateEmbauche}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <BarChart3 className="w-4 h-4 text-gray-400" />
              <span className="text-gray-700">{agent.positionsTotal} positions</span>
            </div>
          </div>

          {/* Performance */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Performance</span>
              <span>{agent.performance}%</span>
            </div>
            <PerformanceIndicator performance={agent.performance} />
          </div>

          {/* Actions rapides */}
          <div className="flex gap-2 mt-4">
            <button className="flex-1 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
              Voir profil
            </button>
            <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg">
              <Phone className="w-4 h-4" />
            </button>
            <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg">
              <Mail className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Section dépliante avec détails */}
        {isExpanded && (
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Statistiques */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2 text-sm">Statistiques positions</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total</span>
                    <span className="font-medium">{agent.positionsTotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Validées</span>
                    <span className="font-medium text-green-600">{agent.positionsValidees}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">En attente</span>
                    <span className="font-medium text-yellow-600">{agent.positionsEnAttente}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Rejetées</span>
                    <span className="font-medium text-red-600">{agent.positionsRejetees}</span>
                  </div>
                </div>
              </div>

              {/* Dernière position */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2 text-sm">Dernière position</h4>
                <div className="space-y-2">
                  <div className="text-sm text-gray-700">{agent.dernierePosition.motif}</div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">{agent.dernierePosition.type}</span>
                    <StatusBadge statut={agent.dernierePosition.statut} />
                  </div>
                  <div className="text-xs text-gray-500">
                    {agent.dernierePosition.date}
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            {agent.notes && (
              <div className="mt-4 pt-4 border-t border-gray-300">
                <h4 className="font-medium text-gray-900 mb-2 text-sm">Notes</h4>
                <p className="text-sm text-gray-700">{agent.notes}</p>
              </div>
            )}

            {/* Actions avancées */}
            <div className="flex gap-2 mt-4 pt-4 border-t border-gray-300">
              <button className="flex-1 px-3 py-1.5 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50">
                Positions
              </button>
              <button className="flex-1 px-3 py-1.5 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50">
                Statistiques
              </button>
              <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const AgentRow = ({ agent }) => {
    return (
      <tr className="border-b border-gray-200 hover:bg-gray-50">
        <td className="px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 font-bold">
                {agent.nom.charAt(0)}
              </span>
            </div>
            <div>
              <div className="font-medium text-gray-900">{agent.nom}</div>
              <div className="text-sm text-gray-500">{agent.matricule}</div>
            </div>
          </div>
        </td>
        <td className="px-4 py-3">
          <div className="text-sm text-gray-900">{agent.poste}</div>
          <div className="text-xs text-gray-500">Depuis {agent.dateEmbauche}</div>
        </td>
        <td className="px-4 py-3">
          <div className="flex flex-col gap-1">
            <div className="text-sm">
              <span className="font-medium">{agent.positionsTotal}</span>
              <span className="text-gray-600"> positions</span>
            </div>
            <div className="text-xs">
              <span className={`font-medium ${agent.positionsEnAttente > 0 ? 'text-yellow-600' : 'text-gray-600'}`}>
                {agent.positionsEnAttente}
              </span>
              <span className="text-gray-600"> en attente</span>
            </div>
          </div>
        </td>
        <td className="px-4 py-3">
          <PerformanceIndicator performance={agent.performance} />
        </td>
        <td className="px-4 py-3">
          <div className="flex items-center gap-2">
            <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg">
              <Eye className="w-4 h-4" />
            </button>
            <button className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg">
              <Phone className="w-4 h-4" />
            </button>
            <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </td>
      </tr>
    );
  };

  const exportAgentsPDF = () => {
    alert('Pour activer l\'export PDF, installez html2canvas et jspdf:\nnpm install html2canvas jspdf');
  };

  const StatCard = ({ title, value, icon: Icon, color = 'blue', subtitle }) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      orange: 'bg-orange-100 text-orange-600',
      purple: 'bg-purple-100 text-purple-600'
    };

    return (
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs md:text-sm font-medium text-gray-600">{title}</p>
            <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">{value}</p>
            {subtitle && <p className="text-xs md:text-sm text-gray-500 mt-1">{subtitle}</p>}
          </div>
          <div className={`p-2 md:p-3 rounded-lg ${colors[color]}`}>
            <Icon className="w-5 h-5 md:w-6 md:h-6" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header mobile */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50 lg:hidden">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold text-gray-900">Mes Agents</h1>
              <p className="text-xs text-gray-600">{responsableInfo.direction}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <Filter className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile filters */}
        {showMobileFilters && (
          <div className="border-t border-gray-200 px-4 py-3 bg-white">
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rechercher
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="Nom, matricule..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Poste
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    value={selectedPoste}
                    onChange={(e) => setSelectedPoste(e.target.value)}
                  >
                    {postes.map(poste => (
                      <option key={poste} value={poste}>
                        {poste === 'tous' ? 'Tous' : poste}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Statut
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    value={selectedStatut}
                    onChange={(e) => setSelectedStatut(e.target.value)}
                  >
                    {statuts.map(statut => (
                      <option key={statut} value={statut}>
                        {statut === 'tous' ? 'Tous' : statut}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedPoste('tous');
                    setSelectedStatut('tous');
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  Réinitialiser
                </button>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
                >
                  Appliquer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 md:p-6 max-w-7xl mx-auto">
        {/* En-tête desktop */}
        <div className="hidden lg:block mb-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Liste des Agents</h1>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <Building className="w-5 h-5" />
                  <span className="font-medium">{responsableInfo.direction}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <User className="w-5 h-5" />
                  <span>Responsable: {responsableInfo.nom}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={exportAgentsPDF}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                Exporter PDF
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Nouvel agent
              </button>
            </div>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
          <StatCard
            title="Total Agents"
            value={stats.total}
            icon={User}
            color="blue"
            subtitle={`${stats.actifs} actifs`}
          />
          <StatCard
            title="Positions totales"
            value={stats.totalPositions}
            icon={BarChart3}
            color="green"
            subtitle="Tous agents confondus"
          />
          <StatCard
            title="En attente"
            value={stats.positionsEnAttente}
            icon={Clock}
            color="orange"
            subtitle="À valider"
          />
          <StatCard
            title="Performance moyenne"
            value={`${Math.round(filteredAgents.reduce((acc, a) => acc + a.performance, 0) / Math.max(filteredAgents.length, 1))}%`}
            icon={CheckCircle}
            color="purple"
            subtitle="Moyenne équipe"
          />
        </div>

        {/* Filtres desktop */}
        <div className="hidden lg:block mb-6">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Rechercher un agent par nom, matricule ou email..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-3">
                <select
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={selectedPoste}
                  onChange={(e) => setSelectedPoste(e.target.value)}
                >
                  <option value="tous">Tous les postes</option>
                  {postes.filter(p => p !== 'tous').map(poste => (
                    <option key={poste} value={poste}>{poste}</option>
                  ))}
                </select>
                <select
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={selectedStatut}
                  onChange={(e) => setSelectedStatut(e.target.value)}
                >
                  <option value="tous">Tous les statuts</option>
                  <option value="actif">Actif</option>
                  <option value="inactif">Inactif</option>
                </select>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  Grille
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  Liste
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Résultats */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Résultats</h2>
              <p className="text-sm text-gray-600">{filteredAgents.length} agent(s) trouvé(s)</p>
            </div>
            <div className="text-sm text-gray-500 hidden md:block">
              Page {currentPage} sur {totalPages}
            </div>
          </div>

          {/* Vue Grille (Mobile par défaut) */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {currentAgents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          )}

          {/* Vue Liste (Desktop) */}
          {viewMode === 'list' && (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Agent
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Poste
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Positions
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Performance
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentAgents.map((agent) => (
                      <AgentRow key={agent.id} agent={agent} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Aucun résultat */}
          {filteredAgents.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm">
              <User className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-900 font-medium">Aucun agent trouvé</p>
              <p className="text-gray-600 mt-1">Essayez de modifier vos critères de recherche</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedPoste('tous');
                  setSelectedStatut('tous');
                }}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredAgents.length > 0 && totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-500">
              Affichage de <span className="font-medium">{startIndex + 1}</span> à{' '}
              <span className="font-medium">{Math.min(endIndex, filteredAgents.length)}</span> sur{' '}
              <span className="font-medium">{filteredAgents.length}</span> agents
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              {/* Pages numérotées */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-1 rounded-lg text-sm ${
                      currentPage === pageNum
                        ? 'bg-blue-600 text-white'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListeAgentsResponsable;