import React, { useState, useEffect } from 'react';
import { 
  Users, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Filter,
  Download,
  Search,
  Eye,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  FileText,
  BarChart3,
  Building,
  Mail,
  Phone,
  MoreVertical,
  Calendar,
  MapPin,
  XCircle,
  UserCheck,
  Printer,
  Menu,
  X,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const DashboardResponsable = () => {
  const [stats, setStats] = useState({
    totalAgents: 0,
    agentsActifs: 0,
    positionsEnAttente: 0,
    positionsValidees: 0,
    positionsRejetees: 0,
    positionsMois: 0
  });

  const [agents, setAgents] = useState([]);
  const [positionsEnAttente, setPositionsEnAttente] = useState([]);
  const [recentPositions, setRecentPositions] = useState([]);
  const [filteredAgents, setFilteredAgents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatut, setSelectedStatut] = useState('tous');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPositions, setSelectedPositions] = useState([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [expandedPosition, setExpandedPosition] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const itemsPerPage = 5;

  const [responsableInfo, setResponsableInfo] = useState({
    nom: 'Paul Durand',
    direction: 'Direction Commerciale',
    email: 'paul.durand@entreprise.com',
    telephone: '+229 01 23 45 67'
  });

  // Données simulées
  useEffect(() => {
    setTimeout(() => {
      setStats({
        totalAgents: 25,
        agentsActifs: 23,
        positionsEnAttente: 8,
        positionsValidees: 142,
        positionsRejetees: 5,
        positionsMois: 48
      });

      const agentsData = [
        { id: 1, nom: 'Lorent Marcos', matricule: '358RTX5RJ', poste: 'Commercial Senior', positions: 15, enAttente: 2, email: 'lorent.marcos@entreprise.com', telephone: '+229 01 23 45 67', statut: 'actif' },
        { id: 2, nom: 'Sophie Martin', matricule: '459TYU8KL', poste: 'Commercial', positions: 12, enAttente: 1, email: 'sophie.martin@entreprise.com', telephone: '+229 02 34 56 78', statut: 'actif' },
        { id: 3, nom: 'Jean Dupont', matricule: '267GHJ4DF', poste: 'Commercial Junior', positions: 8, enAttente: 3, email: 'jean.dupont@entreprise.com', telephone: '+229 03 45 67 89', statut: 'actif' },
        { id: 4, nom: 'Marie Curie', matricule: '789XYZ123', poste: 'Commercial Senior', positions: 18, enAttente: 0, email: 'marie.curie@entreprise.com', telephone: '+229 04 56 78 90', statut: 'inactif' },
        { id: 5, nom: 'Thomas Leroy', matricule: '111ABC222', poste: 'Commercial', positions: 10, enAttente: 1, email: 'thomas.leroy@entreprise.com', telephone: '+229 05 67 89 01', statut: 'actif' }
      ];

      setAgents(agentsData);
      setFilteredAgents(agentsData);

      setPositionsEnAttente([
        {
          id: 1,
          agent: 'Lorent Marcos',
          matricule: '358RTX5RJ',
          type: 'Mission',
          motif: 'Visite client ABC Corp',
          lieu: 'Godomey',
          dateDebut: '2024-01-20',
          dateFin: '2024-01-20',
          heureDebut: '09:00',
          heureFin: '17:00',
          dateCreation: '2024-01-19',
          commentaire: 'Visite pour présentation produits'
        },
        {
          id: 2,
          agent: 'Jean Dupont',
          matricule: '267GHJ4DF',
          type: 'Formation',
          motif: 'Formation outils CRM',
          lieu: 'Siège social',
          dateDebut: '2024-01-19',
          dateFin: '2024-01-19',
          heureDebut: '10:00',
          heureFin: '16:00',
          dateCreation: '2024-01-18',
          commentaire: 'Formation obligatoire'
        },
        {
          id: 3,
          agent: 'Sophie Martin',
          matricule: '459TYU8KL',
          type: 'Télétravail',
          motif: 'Travail à distance',
          lieu: 'Domicile',
          dateDebut: '2024-01-18',
          dateFin: '2024-01-18',
          heureDebut: '08:30',
          heureFin: '17:30',
          dateCreation: '2024-01-17',
          commentaire: 'Télétravail du jeudi'
        }
      ]);

      setRecentPositions([
        {
          id: 5,
          agent: 'Marie Curie',
          type: 'Mission',
          motif: 'Réunion partenaire',
          statut: 'validé',
          date: '2024-01-15',
          heure: '14:00'
        },
        {
          id: 6,
          agent: 'Julie Petit',
          type: 'Maladie',
          motif: 'Arrêt maladie',
          statut: 'validé',
          date: '2024-01-14',
          heure: 'Toute journée'
        },
        {
          id: 7,
          agent: 'Lorent Marcos',
          type: 'Télétravail',
          motif: 'Travail à distance',
          statut: 'rejeté',
          date: '2024-01-12',
          heure: '08:30-17:30'
        }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  // Filtrage des agents
  useEffect(() => {
    let result = agents;

    if (searchTerm) {
      result = result.filter(agent =>
        agent.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.matricule.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.poste.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedStatut !== 'tous') {
      result = result.filter(agent => agent.statut === selectedStatut);
    }

    setFilteredAgents(result);
    setCurrentPage(1);
  }, [searchTerm, selectedStatut, agents]);

  const totalPages = Math.ceil(filteredAgents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAgents = filteredAgents.slice(startIndex, endIndex);

  const handleValidation = (positionId, action) => {
    if (action === 'valider') {
      alert(`Position ${positionId} validée !`);
    } else {
      alert(`Position ${positionId} rejetée !`);
    }
    
    setPositionsEnAttente(prev => prev.filter(p => p.id !== positionId));
  };

  const handleSelectPosition = (id) => {
    if (selectedPositions.includes(id)) {
      setSelectedPositions(selectedPositions.filter(posId => posId !== id));
    } else {
      setSelectedPositions([...selectedPositions, id]);
    }
  };

  const handleValidateSelected = () => {
    if (selectedPositions.length === 0) return;
    alert(`Valider ${selectedPositions.length} position(s)`);
    setSelectedPositions([]);
  };

  const handleRejectSelected = () => {
    if (selectedPositions.length === 0) return;
    alert(`Rejeter ${selectedPositions.length} position(s)`);
    setSelectedPositions([]);
  };

  const exportStatsPDF = () => {
    alert('Pour activer l\'export PDF, installez html2canvas et jspdf:\nnpm install html2canvas jspdf');
  };

  const exportAgentsPDF = () => {
    alert('Pour activer l\'export PDF, installez html2canvas et jspdf:\nnpm install html2canvas jspdf');
  };

  const exportPositionsPDF = () => {
    alert('Pour activer l\'export PDF, installez html2canvas et jspdf:\nnpm install html2canvas jspdf');
  };

  const StatCard = ({ title, value, icon: Icon, color = 'blue', trend, subtitle }) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      orange: 'bg-orange-100 text-orange-600',
      purple: 'bg-purple-100 text-purple-600',
      red: 'bg-red-100 text-red-600'
    };

    return (
      <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs md:text-sm font-medium text-gray-600">{title}</p>
            <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1 md:mt-2">{loading ? '...' : value}</p>
            {subtitle && <p className="text-xs md:text-sm text-gray-500 mt-1">{subtitle}</p>}
            {trend && (
              <div className="flex items-center gap-1 mt-1 md:mt-2">
                {trend.direction === 'up' ? (
                  <TrendingUp className="w-3 h-3 md:w-4 md:h-4 text-green-500" />
                ) : (
                  <TrendingDown className="w-3 h-3 md:w-4 md:h-4 text-red-500" />
                )}
                <span className={`text-xs md:text-sm ${trend.direction === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {trend.value}
                </span>
              </div>
            )}
          </div>
          <div className={`p-2 md:p-3 rounded-lg ${colors[color]}`}>
            <Icon className="w-5 h-5 md:w-6 md:h-6" />
          </div>
        </div>
      </div>
    );
  };

  const StatusBadge = ({ statut }) => {
    const config = {
      validé: { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Validé' },
      rejeté: { color: 'bg-red-100 text-red-800', icon: XCircle, label: 'Rejeté' },
      en_attente: { color: 'bg-yellow-100 text-yellow-800', icon: Clock, label: 'En attente' }
    };

    const { color, icon: Icon, label } = config[statut] || config.en_attente;

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 md:px-3 md:py-1 rounded-full text-xs font-medium ${color}`}>
        <Icon className="w-2.5 h-2.5 md:w-3 md:h-3" />
        {label}
      </span>
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
      <span className={`px-1.5 py-0.5 md:px-2 md:py-1 rounded text-xs font-medium ${colors[type] || 'bg-gray-100 text-gray-800'}`}>
        {type}
      </span>
    );
  };

  const PositionCardMobile = ({ position }) => {
    const isExpanded = expandedPosition === position.id;

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-4">
        <div className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  checked={selectedPositions.includes(position.id)}
                  onChange={() => handleSelectPosition(position.id)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <TypeBadge type={position.type} />
              </div>
              <h3 className="font-medium text-gray-900">{position.motif}</h3>
              <div className="text-sm text-gray-600 mt-1">{position.agent}</div>
              <div className="text-xs text-gray-500 mt-1">{position.matricule}</div>
            </div>
            <button
              onClick={() => setExpandedPosition(isExpanded ? null : position.id)}
              className="p-1 text-gray-500"
            >
              {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            <div className="flex items-center gap-1 text-sm">
              <Calendar className="w-3 h-3 text-gray-400" />
              <span>{position.dateDebut}</span>
              {position.dateFin !== position.dateDebut && (
                <span> - {position.dateFin}</span>
              )}
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Clock className="w-3 h-3 text-gray-400" />
              <span>{position.heureDebut} - {position.heureFin}</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <MapPin className="w-3 h-3 text-gray-400" />
              <span>{position.lieu}</span>
            </div>
          </div>

          {isExpanded && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-600">Créé le</p>
                  <p className="text-sm font-medium">{position.dateCreation}</p>
                </div>
                {position.commentaire && (
                  <div>
                    <p className="text-xs text-gray-600">Commentaire</p>
                    <p className="text-sm">{position.commentaire}</p>
                  </div>
                )}
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => handleValidation(position.id, 'valider')}
                    className="flex-1 px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Valider
                  </button>
                  <button
                    onClick={() => handleValidation(position.id, 'rejeter')}
                    className="flex-1 px-3 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Rejeter
                  </button>
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const AgentCardMobile = ({ agent }) => {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-4">
        <div className="flex items-start">
          <div className="h-12 w-12 flex-shrink-0 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
            <span className="text-blue-600 font-semibold">
              {agent.nom.charAt(0)}
            </span>
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900">{agent.nom}</h3>
                <p className="text-sm text-gray-500">{agent.matricule}</p>
              </div>
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                agent.statut === 'actif'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {agent.statut === 'actif' ? 'Actif' : 'Inactif'}
              </span>
            </div>
            
            <div className="mt-2">
              <p className="text-sm text-gray-900">{agent.poste}</p>
              <div className="flex items-center gap-2 mt-1">
                <Mail className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-500 truncate">{agent.email}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-gray-100">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">{agent.positions}</div>
                <div className="text-xs text-gray-600">Positions</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-orange-600">{agent.enAttente}</div>
                <div className="text-xs text-gray-600">En attente</div>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <button className="flex-1 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                Voir détails
              </button>
              <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg">
                <Phone className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header mobile */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="p-2 lg:hidden"
              >
                {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Responsable</h1>
                <p className="text-xs text-gray-600">{responsableInfo.direction}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={exportStatsPDF}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg lg:hidden"
              >
                <Printer className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {showMobileMenu && (
          <div className="lg:hidden border-t border-gray-200 px-4 py-3 bg-white">
            <div className="space-y-2">
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg">
                Actions rapides
              </button>
              <button className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Exporter PDF
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 md:p-6 max-w-7xl mx-auto">
        {/* En-tête desktop */}
        <div className="hidden lg:block mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Tableau de Bord Responsable</h1>
              <div className="flex flex-wrap items-center gap-3 mt-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <Building className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="font-medium">{responsableInfo.direction}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <UserCheck className="w-4 h-4 md:w-5 md:h-5" />
                  <span>{responsableInfo.nom}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={exportStatsPDF}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span className="hidden md:inline">Exporter PDF</span>
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Actions rapides
              </button>
            </div>
          </div>
        </div>

        {/* Section statistiques */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6 mb-6 md:mb-8">
          <StatCard
            title="Agents"
            value={stats.totalAgents}
            icon={Users}
            color="blue"
            subtitle={`${stats.agentsActifs} actifs`}
            trend={{ direction: 'up', value: '+2' }}
          />
          <StatCard
            title="En attente"
            value={stats.positionsEnAttente}
            icon={Clock}
            color="orange"
            subtitle="À valider"
            trend={{ direction: 'down', value: '-3' }}
          />
          <StatCard
            title="Validées"
            value={stats.positionsValidees}
            icon={CheckCircle}
            color="green"
            subtitle="Ce mois"
            trend={{ direction: 'up', value: '+12' }}
          />
          <StatCard
            title="Rejetées"
            value={stats.positionsRejetees}
            icon={XCircle}
            color="red"
            subtitle="Total"
            trend={{ direction: 'stable', value: '0' }}
          />
        </div>

        {/* Filtres mobiles */}
        <div className="lg:hidden mb-6">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900">Filtres</h2>
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <Filter className="w-4 h-4" />
              </button>
            </div>
            
            {showMobileFilters && (
              <div className="space-y-4">
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Statut
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    value={selectedStatut}
                    onChange={(e) => setSelectedStatut(e.target.value)}
                  >
                    <option value="tous">Tous les statuts</option>
                    <option value="actif">Actif</option>
                    <option value="inactif">Inactif</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6 md:space-y-8 lg:grid lg:grid-cols-2 lg:gap-6 xl:gap-8">
          {/* Positions en attente - Mobile */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 md:p-6 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <h2 className="text-lg md:text-xl font-bold text-gray-900">Positions en attente</h2>
                    <p className="text-sm text-gray-600 mt-1">
                      {positionsEnAttente.length} position(s) à valider
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedPositions.length > 0 && (
                      <div className="flex gap-2">
                        <button
                          onClick={handleValidateSelected}
                          className="px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700"
                        >
                          Valider ({selectedPositions.length})
                        </button>
                        <button
                          onClick={handleRejectSelected}
                          className="px-3 py-1.5 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700"
                        >
                          Rejeter ({selectedPositions.length})
                        </button>
                      </div>
                    )}
                    <button
                      onClick={exportPositionsPDF}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <Download className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Version mobile - Cartes */}
              <div className="lg:hidden p-4">
                {positionsEnAttente.length === 0 ? (
                  <div className="text-center py-8">
                    <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                    <p className="text-gray-900 font-medium">Aucune position en attente</p>
                    <p className="text-gray-600 mt-1">Toutes les positions sont traitées</p>
                  </div>
                ) : (
                  positionsEnAttente.map((position) => (
                    <PositionCardMobile key={position.id} position={position} />
                  ))
                )}
              </div>

              {/* Version desktop - Tableau */}
              <div className="hidden lg:block">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-10">
                          <input
                            type="checkbox"
                            checked={selectedPositions.length === positionsEnAttente.length}
                            onChange={() => {
                              if (selectedPositions.length === positionsEnAttente.length) {
                                setSelectedPositions([]);
                              } else {
                                setSelectedPositions(positionsEnAttente.map(p => p.id));
                              }
                            }}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Agent
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Position
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {positionsEnAttente.map((position) => (
                        <tr key={position.id} className="hover:bg-gray-50">
                          <td className="px-4 py-4">
                            <input
                              type="checkbox"
                              checked={selectedPositions.includes(position.id)}
                              onChange={() => handleSelectPosition(position.id)}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                          </td>
                          <td className="px-4 py-4">
                            <div>
                              <div className="font-medium text-gray-900">{position.agent}</div>
                              <div className="text-sm text-gray-500">{position.matricule}</div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <TypeBadge type={position.type} />
                                <span className="text-xs text-gray-500">
                                  {position.dateDebut}
                                </span>
                              </div>
                              <div className="font-medium text-sm">{position.motif}</div>
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <MapPin className="w-3 h-3" />
                                {position.lieu}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleValidation(position.id, 'valider')}
                                className="px-2 py-1 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700"
                              >
                                Valider
                              </button>
                              <button
                                onClick={() => handleValidation(position.id, 'rejeter')}
                                className="px-2 py-1 bg-red-600 text-white text-xs rounded-lg hover:bg-red-700"
                              >
                                Rejeter
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Dernières validations */}
            <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 mt-4 md:mt-6">
              <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Dernières validations</h2>
              <div className="space-y-3">
                {recentPositions.map((position) => (
                  <div key={position.id} className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <TypeBadge type={position.type} />
                      <StatusBadge statut={position.statut} />
                    </div>
                    <div className="font-medium text-gray-900 text-sm">{position.agent}</div>
                    <div className="text-xs text-gray-600 mt-1">{position.motif}</div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                      <Calendar className="w-3 h-3" />
                      {position.date} • {position.heure}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mes Agents - Mobile */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 md:p-6 border-b border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div>
                    <h2 className="text-lg md:text-xl font-bold text-gray-900">Mes Agents</h2>
                    <p className="text-sm text-gray-600 mt-1">
                      {agents.length} agent(s) dans votre direction
                    </p>
                  </div>
                  <div className="hidden md:flex gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        type="text"
                        placeholder="Rechercher..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <select
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                      value={selectedStatut}
                      onChange={(e) => setSelectedStatut(e.target.value)}
                    >
                      <option value="tous">Tous</option>
                      <option value="actif">Actif</option>
                      <option value="inactif">Inactif</option>
                    </select>
                    <button
                      onClick={exportAgentsPDF}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <Download className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Version mobile - Cartes */}
              <div className="lg:hidden p-4">
                {currentAgents.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-900 font-medium">Aucun agent trouvé</p>
                    <p className="text-gray-600 mt-1">Modifiez vos critères de recherche</p>
                  </div>
                ) : (
                  currentAgents.map((agent) => (
                    <AgentCardMobile key={agent.id} agent={agent} />
                  ))
                )}

                {/* Pagination mobile */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-sm text-gray-600">
                      Page {currentPage} sur {totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Version desktop - Tableau */}
              <div className="hidden lg:block">
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
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {currentAgents.map((agent) => (
                        <tr key={agent.id} className="hover:bg-gray-50">
                          <td className="px-4 py-4">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0 bg-blue-100 rounded-lg flex items-center justify-center">
                                <span className="text-blue-600 font-semibold">
                                  {agent.nom.charAt(0)}
                                </span>
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-gray-900">
                                  {agent.nom}
                                </div>
                                <div className="text-xs text-gray-500">{agent.matricule}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="text-sm text-gray-900">{agent.poste}</div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="space-y-1">
                              <div className="text-sm">
                                <span className="font-medium">{agent.positions}</span>
                                <span className="text-gray-600"> total</span>
                              </div>
                              {agent.enAttente > 0 && (
                                <div className="text-xs">
                                  <span className="font-medium text-orange-600">{agent.enAttente}</span>
                                  <span className="text-gray-600"> en attente</span>
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-2">
                              <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg">
                                <Eye size={14} />
                              </button>
                              <button className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg">
                                <Phone size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination desktop */}
                {totalPages > 1 && (
                  <div className="px-4 py-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        Affichage de <span className="font-medium">{startIndex + 1}</span> à{' '}
                        <span className="font-medium">{Math.min(endIndex, filteredAgents.length)}</span> sur{' '}
                        <span className="font-medium">{filteredAgents.length}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                          className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50"
                        >
                          <ChevronLeft size={16} />
                        </button>
                        <span className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm">
                          {currentPage}
                        </span>
                        <button
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                          disabled={currentPage === totalPages}
                          className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50"
                        >
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Statistiques rapides */}
            <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 mt-4 md:mt-6">
              <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Statistiques</h2>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-xs md:text-sm text-blue-700">Taux validation</div>
                  <div className="text-xl md:text-2xl font-bold text-blue-900 mt-1">
                    {stats.totalAgents > 0 ? Math.round((stats.positionsValidees / stats.positionsMois) * 100) : 0}%
                  </div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="text-xs md:text-sm text-green-700">Agents actifs</div>
                  <div className="text-xl md:text-2xl font-bold text-green-900 mt-1">
                    {stats.agentsActifs}/{stats.totalAgents}
                  </div>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <div className="text-xs md:text-sm text-orange-700">Temps réponse</div>
                  <div className="text-xl md:text-2xl font-bold text-orange-900 mt-1">4h</div>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="text-xs md:text-sm text-purple-700">Positions/mois</div>
                  <div className="text-xl md:text-2xl font-bold text-purple-900 mt-1">{stats.positionsMois}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardResponsable;