import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter,
  Download,
  CheckCircle,
  XCircle,
  Eye,
  Clock,
  Calendar,
  MapPin,
  User,
  FileText,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  CheckSquare,
  Square,
  MoreVertical,
  Printer,
  Send,
  MessageSquare,
  ExternalLink,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Menu,
  X
} from 'lucide-react';

const ValidationPositions = () => {
  const [positions, setPositions] = useState([]);
  const [filteredPositions, setFilteredPositions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('tous');
  const [selectedDateRange, setSelectedDateRange] = useState({ start: '', end: '' });
  const [selectedAgent, setSelectedAgent] = useState('tous');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPositions, setSelectedPositions] = useState([]);
  const [expandedPosition, setExpandedPosition] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [validationMode, setValidationMode] = useState('individuel'); // 'individuel' ou 'groupe'
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [positionToReject, setPositionToReject] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    validees: 0,
    rejetees: 0,
    enAttente: 0,
    tauxValidation: 0
  });

  const itemsPerPage = 10;

  // Données simulées
  useEffect(() => {
    setTimeout(() => {
      const positionsData = [
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
          dateSoumission: '2024-01-19 14:30',
          commentaire: 'Visite pour présentation des nouveaux produits et discussion contrat annuel.',
          justificatif: 'facture_abc.pdf',
          statut: 'en_attente',
          urgent: true,
          historique: []
        },
        {
          id: 2,
          agent: 'Sophie Martin',
          matricule: '459TYU8KL',
          type: 'Télétravail',
          motif: 'Travail à distance',
          lieu: 'Domicile',
          dateDebut: '2024-01-22',
          dateFin: '2024-01-22',
          heureDebut: '08:30',
          heureFin: '17:30',
          dateCreation: '2024-01-21',
          dateSoumission: '2024-01-21 09:15',
          commentaire: 'Télétravail du lundi pour terminer le rapport mensuel.',
          justificatif: null,
          statut: 'en_attente',
          urgent: false,
          historique: []
        },
        {
          id: 3,
          agent: 'Jean Dupont',
          matricule: '267GHJ4DF',
          type: 'Formation',
          motif: 'Formation outils CRM avancés',
          lieu: 'Siège social - Salle B',
          dateDebut: '2024-01-23',
          dateFin: '2024-01-23',
          heureDebut: '09:00',
          heureFin: '17:00',
          dateCreation: '2024-01-20',
          dateSoumission: '2024-01-20 16:45',
          commentaire: 'Formation obligatoire pour l\'utilisation du nouveau CRM.',
          justificatif: 'convocation_formation.pdf',
          statut: 'en_attente',
          urgent: true,
          historique: []
        },
        {
          id: 4,
          agent: 'Marie Curie',
          matricule: '789XYZ123',
          type: 'Congé',
          motif: 'Congé annuel',
          lieu: 'Domicile',
          dateDebut: '2024-01-25',
          dateFin: '2024-01-27',
          heureDebut: '00:00',
          heureFin: '23:59',
          dateCreation: '2024-01-22',
          dateSoumission: '2024-01-22 11:20',
          commentaire: '3 jours de congés pour raison familiale.',
          justificatif: null,
          statut: 'en_attente',
          urgent: false,
          historique: []
        },
        {
          id: 5,
          agent: 'Thomas Leroy',
          matricule: '111ABC222',
          type: 'Mission',
          motif: 'Réunion partenaire stratégique',
          lieu: 'Hôtel du Lac',
          dateDebut: '2024-01-24',
          dateFin: '2024-01-24',
          heureDebut: '14:00',
          heureFin: '18:00',
          dateCreation: '2024-01-23',
          dateSoumission: '2024-01-23 10:05',
          commentaire: 'Réunion importante pour le partenariat avec TechCorp.',
          justificatif: 'invitation_reunion.pdf',
          statut: 'en_attente',
          urgent: true,
          historique: []
        },
        {
          id: 6,
          agent: 'Julie Petit',
          matricule: '333DEF444',
          type: 'Maladie',
          motif: 'Arrêt maladie',
          lieu: 'Domicile',
          dateDebut: '2024-01-21',
          dateFin: '2024-01-21',
          heureDebut: '00:00',
          heureFin: '23:59',
          dateCreation: '2024-01-21',
          dateSoumission: '2024-01-21 07:30',
          commentaire: 'Certificat médical fourni.',
          justificatif: 'certificat_medical.pdf',
          statut: 'en_attente',
          urgent: false,
          historique: []
        },
        {
          id: 7,
          agent: 'Marc Dubois',
          matricule: '555GHI666',
          type: 'Réunion',
          motif: 'Présentation trimestrielle',
          lieu: 'Siège social - Auditorium',
          dateDebut: '2024-01-26',
          dateFin: '2024-01-26',
          heureDebut: '10:00',
          heureFin: '12:00',
          dateCreation: '2024-01-25',
          dateSoumission: '2024-01-25 15:40',
          commentaire: 'Présentation des résultats du dernier trimestre à toute l\'équipe.',
          justificatif: null,
          statut: 'en_attente',
          urgent: false,
          historique: []
        },
        {
          id: 8,
          agent: 'Léa Moreau',
          matricule: '777JKL888',
          type: 'Formation',
          motif: 'Atelier leadership',
          lieu: 'Centre de formation',
          dateDebut: '2024-01-29',
          dateFin: '2024-01-30',
          heureDebut: '09:00',
          heureFin: '17:00',
          dateCreation: '2024-01-28',
          dateSoumission: '2024-01-28 13:25',
          commentaire: 'Formation de 2 jours sur le développement du leadership.',
          justificatif: 'inscription_formation.pdf',
          statut: 'en_attente',
          urgent: false,
          historique: []
        }
      ];

      setPositions(positionsData);
      setFilteredPositions(positionsData);
      
      // Calcul des statistiques
      const total = positionsData.length;
      const enAttente = positionsData.filter(p => p.statut === 'en_attente').length;
      const validees = positionsData.filter(p => p.statut === 'validé').length;
      const rejetees = positionsData.filter(p => p.statut === 'rejeté').length;
      
      setStats({
        total,
        validees,
        rejetees,
        enAttente,
        tauxValidation: total > 0 ? Math.round((validees / total) * 100) : 0
      });
      
      setLoading(false);
    }, 1000);
  }, []);

  const types = ['tous', ...new Set(positions.map(p => p.type))];
  const agents = ['tous', ...new Set(positions.map(p => p.agent))];

  // Filtrage des positions
  useEffect(() => {
    let result = positions.filter(p => p.statut === 'en_attente');

    if (searchTerm) {
      result = result.filter(position =>
        position.agent.toLowerCase().includes(searchTerm.toLowerCase()) ||
        position.motif.toLowerCase().includes(searchTerm.toLowerCase()) ||
        position.matricule.toLowerCase().includes(searchTerm.toLowerCase()) ||
        position.commentaire?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType !== 'tous') {
      result = result.filter(position => position.type === selectedType);
    }

    if (selectedAgent !== 'tous') {
      result = result.filter(position => position.agent === selectedAgent);
    }

    if (selectedDateRange.start) {
      result = result.filter(position => position.dateDebut >= selectedDateRange.start);
    }

    if (selectedDateRange.end) {
      result = result.filter(position => position.dateDebut <= selectedDateRange.end);
    }

    setFilteredPositions(result);
    setCurrentPage(1);
  }, [searchTerm, selectedType, selectedAgent, selectedDateRange, positions]);

  const totalPages = Math.ceil(filteredPositions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPositions = filteredPositions.slice(startIndex, endIndex);

  const handleSelectAll = () => {
    if (selectedPositions.length === currentPositions.length) {
      setSelectedPositions([]);
    } else {
      setSelectedPositions(currentPositions.map(p => p.id));
    }
  };

  const handleSelectPosition = (id) => {
    if (selectedPositions.includes(id)) {
      setSelectedPositions(selectedPositions.filter(posId => posId !== id));
    } else {
      setSelectedPositions([...selectedPositions, id]);
    }
  };

  const handleValidate = (positionId, batch = false) => {
    if (batch) {
      alert(`${selectedPositions.length} position(s) validée(s) avec succès !`);
      // API: POST /responsable/positions/validate-batch
      setSelectedPositions([]);
    } else {
      alert(`Position validée avec succès !`);
      // API: PUT /responsable/positions/${positionId}/validate
    }
    
    // Mettre à jour la liste
    setPositions(prev => prev.filter(p => 
      batch ? !selectedPositions.includes(p.id) : p.id !== positionId
    ));
  };

  const handleReject = (positionId, reason) => {
    if (!reason.trim()) {
      alert('Veuillez fournir un motif de rejet');
      return;
    }

    alert(`Position rejetée avec le motif: ${reason}`);
    // API: PUT /responsable/positions/${positionId}/reject
    
    setPositions(prev => prev.filter(p => p.id !== positionId));
    setShowRejectionModal(false);
    setRejectionReason('');
    setPositionToReject(null);
  };

  const openRejectionModal = (positionId) => {
    setPositionToReject(positionId);
    setShowRejectionModal(true);
  };

  const handleRejectSelected = () => {
    if (selectedPositions.length === 0) return;
    setValidationMode('groupe');
    setShowRejectionModal(true);
  };

  const exportPositionsPDF = () => {
    alert('Pour activer l\'export PDF, installez html2canvas et jspdf:\nnpm install html2canvas jspdf');
  };

  const StatCard = ({ title, value, icon: Icon, color = 'blue', trend, subtitle }) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      orange: 'bg-orange-100 text-orange-600',
      red: 'bg-red-100 text-red-600'
    };

    return (
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs md:text-sm font-medium text-gray-600">{title}</p>
            <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">{loading ? '...' : value}</p>
            {subtitle && <p className="text-xs md:text-sm text-gray-500 mt-1">{subtitle}</p>}
            {trend && (
              <div className="flex items-center gap-1 mt-1">
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

  const UrgentBadge = () => (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-800 rounded-full text-xs">
      <AlertCircle className="w-3 h-3" />
      Urgent
    </span>
  );

  const PositionCardMobile = ({ position }) => {
    const isExpanded = expandedPosition === position.id;
    const isSelected = selectedPositions.includes(position.id);

    return (
      <div className={`bg-white rounded-xl shadow-sm border ${isSelected ? 'border-blue-500' : 'border-gray-200'} overflow-hidden mb-4`}>
        <div className="p-4">
          {/* En-tête */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleSelectPosition(position.id)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <div className="flex items-center gap-2">
                  <TypeBadge type={position.type} />
                  {position.urgent && <UrgentBadge />}
                </div>
              </div>
              <h3 className="font-bold text-gray-900">{position.motif}</h3>
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

          {/* Informations de base */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span>{position.dateDebut} {position.dateFin !== position.dateDebut && `au ${position.dateFin}`}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-gray-400" />
              <span>{position.heureDebut} - {position.heureFin}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span>{position.lieu}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-gray-400" />
              <span>Soumis le {position.dateSoumission}</span>
            </div>
          </div>

          {/* Actions rapides */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => handleValidate(position.id)}
              className="flex-1 px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
            >
              <CheckCircle className="w-4 h-4 inline mr-1" />
              Valider
            </button>
            <button
              onClick={() => openRejectionModal(position.id)}
              className="flex-1 px-3 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
            >
              <XCircle className="w-4 h-4 inline mr-1" />
              Rejeter
            </button>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Section dépliante */}
        {isExpanded && (
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            {/* Commentaire */}
            {position.commentaire && (
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2 text-sm flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Commentaire
                </h4>
                <p className="text-sm text-gray-700 bg-white p-3 rounded-lg">
                  {position.commentaire}
                </p>
              </div>
            )}

            {/* Justificatif */}
            {position.justificatif && (
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2 text-sm flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Justificatif
                </h4>
                <div className="bg-white p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{position.justificatif}</span>
                    <button className="text-blue-600 hover:text-blue-800 text-sm">
                      Télécharger
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Informations supplémentaires */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2 text-sm">Date création</h4>
                <p className="text-sm text-gray-700">{position.dateCreation}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2 text-sm">Durée</h4>
                <p className="text-sm text-gray-700">
                  {position.dateDebut === position.dateFin ? '1 jour' : 'Plusieurs jours'}
                </p>
              </div>
            </div>
          </div>
        )}
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
              <h1 className="text-lg font-bold text-gray-900">Validation</h1>
              <p className="text-xs text-gray-600">{filteredPositions.length} position(s) en attente</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <Filter className="w-5 h-5" />
              </button>
              {selectedPositions.length > 0 && (
                <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full">
                  {selectedPositions.length}
                </span>
              )}
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
                    placeholder="Agent, motif..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                  >
                    {types.map(type => (
                      <option key={type} value={type}>
                        {type === 'tous' ? 'Tous' : type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Agent
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    value={selectedAgent}
                    onChange={(e) => setSelectedAgent(e.target.value)}
                  >
                    {agents.map(agent => (
                      <option key={agent} value={agent}>
                        {agent === 'tous' ? 'Tous' : agent}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Début
                  </label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    value={selectedDateRange.start}
                    onChange={(e) => setSelectedDateRange({...selectedDateRange, start: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fin
                  </label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    value={selectedDateRange.end}
                    onChange={(e) => setSelectedDateRange({...selectedDateRange, end: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedType('tous');
                    setSelectedAgent('tous');
                    setSelectedDateRange({ start: '', end: '' });
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
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Validation des Positions</h1>
              <p className="text-gray-600 mt-2">
                {filteredPositions.length} position(s) en attente de validation
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={exportPositionsPDF}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                Exporter
              </button>
              {selectedPositions.length > 0 && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleValidate(null, true)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Valider ({selectedPositions.length})
                  </button>
                  <button
                    onClick={handleRejectSelected}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center gap-2"
                  >
                    <XCircle className="w-4 h-4" />
                    Rejeter ({selectedPositions.length})
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
          <StatCard
            title="En attente"
            value={stats.enAttente}
            icon={Clock}
            color="orange"
            subtitle="À traiter"
            trend={{ direction: 'down', value: '-3 cette semaine' }}
          />
          <StatCard
            title="Validées"
            value={stats.validees}
            icon={CheckCircle}
            color="green"
            subtitle="Ce mois"
            trend={{ direction: 'up', value: '+12' }}
          />
          <StatCard
            title="Rejetées"
            value={stats.rejetees}
            icon={XCircle}
            color="red"
            subtitle="Total"
            trend={{ direction: 'stable', value: '0 cette semaine' }}
          />
          <StatCard
            title="Taux validation"
            value={`${stats.tauxValidation}%`}
            icon={BarChart3}
            color="blue"
            subtitle="Moyenne"
            trend={{ direction: 'up', value: '+5%' }}
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
                  placeholder="Rechercher par agent, motif, matricule ou commentaire..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-3">
                <select
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="tous">Tous les types</option>
                  {types.filter(t => t !== 'tous').map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <select
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={selectedAgent}
                  onChange={(e) => setSelectedAgent(e.target.value)}
                >
                  <option value="tous">Tous les agents</option>
                  {agents.filter(a => a !== 'tous').map(agent => (
                    <option key={agent} value={agent}>{agent}</option>
                  ))}
                </select>
                <input
                  type="date"
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Date début"
                  value={selectedDateRange.start}
                  onChange={(e) => setSelectedDateRange({...selectedDateRange, start: e.target.value})}
                />
                <input
                  type="date"
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Date fin"
                  value={selectedDateRange.end}
                  onChange={(e) => setSelectedDateRange({...selectedDateRange, end: e.target.value})}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mode de validation mobile */}
        {selectedPositions.length > 0 && (
          <div className="lg:hidden mb-4">
            <div className="bg-blue-50 p-4 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-bold text-blue-900">{selectedPositions.length} position(s) sélectionnée(s)</h3>
                  <p className="text-sm text-blue-700">Actions groupées disponibles</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleValidate(null, true)}
                  className="px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700"
                >
                  <CheckCircle className="w-4 h-4 inline mr-1" />
                  Valider tout
                </button>
                <button
                  onClick={handleRejectSelected}
                  className="px-3 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700"
                >
                  <XCircle className="w-4 h-4 inline mr-1" />
                  Rejeter tout
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Liste des positions */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Positions à valider</h2>
              <p className="text-sm text-gray-600">{filteredPositions.length} résultat(s)</p>
            </div>
            <div className="text-sm text-gray-500 hidden md:block">
              Page {currentPage} sur {totalPages}
            </div>
          </div>

          {/* Version mobile - Cartes */}
          <div className="lg:hidden">
            {currentPositions.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                <p className="text-gray-900 font-medium">Aucune position en attente</p>
                <p className="text-gray-600 mt-1">Toutes les positions sont traitées</p>
              </div>
            ) : (
              currentPositions.map((position) => (
                <PositionCardMobile key={position.id} position={position} />
              ))
            )}
          </div>

          {/* Version desktop - Tableau */}
          <div className="hidden lg:block">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-10">
                        <input
                          type="checkbox"
                          checked={selectedPositions.length === currentPositions.length}
                          onChange={handleSelectAll}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Agent & Position
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Période
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Soumission
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {currentPositions.map((position) => (
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
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <TypeBadge type={position.type} />
                              {position.urgent && <UrgentBadge />}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{position.motif}</div>
                              <div className="text-sm text-gray-600">{position.agent}</div>
                              <div className="text-xs text-gray-500">{position.matricule}</div>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <MapPin className="w-3 h-3" />
                              {position.lieu}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-gray-400" />
                              <span className="text-sm">
                                {position.dateDebut}
                                {position.dateFin !== position.dateDebut && ` au ${position.dateFin}`}
                              </span>
                            </div>
                            <div className="text-sm text-gray-600">
                              {position.heureDebut} - {position.heureFin}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm text-gray-900">{position.dateSoumission}</div>
                          <div className="text-xs text-gray-500">Créé le {position.dateCreation}</div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleValidate(position.id)}
                              className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700"
                            >
                              Valider
                            </button>
                            <button
                              onClick={() => openRejectionModal(position.id)}
                              className="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700"
                            >
                              Rejeter
                            </button>
                            <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg">
                              <Eye className="w-4 h-4" />
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
        </div>

        {/* Pagination */}
        {filteredPositions.length > 0 && totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-500">
              Affichage de <span className="font-medium">{startIndex + 1}</span> à{' '}
              <span className="font-medium">{Math.min(endIndex, filteredPositions.length)}</span> sur{' '}
              <span className="font-medium">{filteredPositions.length}</span> positions
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
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

      {/* Modal de rejet */}
      {showRejectionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {validationMode === 'groupe' ? 'Rejeter les positions sélectionnées' : 'Rejeter la position'}
              </h3>
              <p className="text-gray-600 mb-6">
                {validationMode === 'groupe' 
                  ? `Veuillez indiquer le motif de rejet pour les ${selectedPositions.length} positions sélectionnées.`
                  : 'Veuillez indiquer le motif de rejet pour cette position.'}
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Motif de rejet
                  </label>
                  <textarea
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    rows="4"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ex: Dates incohérentes, justificatif manquant, motif non valide..."
                  />
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-yellow-900">Attention</p>
                      <p className="text-sm text-yellow-700 mt-1">
                        Le motif de rejet sera envoyé à l'agent concerné.
                        Soyez précis et professionnel dans votre justification.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-8">
                <button
                  type="button"
                  onClick={() => {
                    setShowRejectionModal(false);
                    setRejectionReason('');
                    setPositionToReject(null);
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  onClick={() => handleReject(positionToReject, rejectionReason)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Confirmer le rejet
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ValidationPositions;