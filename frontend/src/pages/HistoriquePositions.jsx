import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter,
  Download,
  Calendar,
  User,
  Building,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  BarChart3,
  FileText,
  MoreVertical,
  ArrowUpDown
} from 'lucide-react';

const HistoriquePositions = () => {
  const [positions, setPositions] = useState([
    {
      id: 1,
      agent: 'Lorent Marcos',
      matricule: '358RTX5RJ',
      direction: 'Direction Commerciale',
      type: 'Mission',
      motif: 'Visite client',
      lieu: 'Godomey',
      dateDebut: '2024-01-15',
      dateFin: '2024-01-15',
      heureDebut: '09:00',
      heureFin: '17:00',
      statut: 'validé',
      responsable: 'Paul Durand',
      dateCreation: '2024-01-14',
      commentaire: 'Visite du client ABC Corp'
    },
    {
      id: 2,
      agent: 'Sophie Martin',
      matricule: '459TYU8KL',
      direction: 'Direction RH',
      type: 'Congé',
      motif: 'Congé annuel',
      lieu: 'Domicile',
      dateDebut: '2024-01-14',
      dateFin: '2024-01-16',
      heureDebut: '08:00',
      heureFin: '18:00',
      statut: 'validé',
      responsable: 'Sophie Martin',
      dateCreation: '2024-01-10',
      commentaire: 'Congé annuel approuvé'
    },
    {
      id: 3,
      agent: 'Jean Dupont',
      matricule: '267GHJ4DF',
      direction: 'Direction Technique',
      type: 'Télétravail',
      motif: 'Travail à distance',
      lieu: 'Domicile',
      dateDebut: '2024-01-13',
      dateFin: '2024-01-13',
      heureDebut: '08:30',
      heureFin: '17:30',
      statut: 'en_attente',
      responsable: 'Jean Dupont',
      dateCreation: '2024-01-12',
      commentaire: 'Télétravail du lundi'
    },
    {
      id: 4,
      agent: 'Marie Curie',
      matricule: '789XYZ123',
      direction: 'Direction Recherche',
      type: 'Formation',
      motif: 'Formation interne',
      lieu: 'Siège social',
      dateDebut: '2024-01-12',
      dateFin: '2024-01-12',
      heureDebut: '10:00',
      heureFin: '16:00',
      statut: 'rejeté',
      responsable: 'Marie Curie',
      dateCreation: '2024-01-11',
      commentaire: 'Formation sur les nouvelles technologies'
    },
    {
      id: 5,
      agent: 'Thomas Leroy',
      matricule: '111ABC222',
      direction: 'Direction Marketing',
      type: 'Mission',
      motif: 'Événement',
      lieu: 'Hôtel du Lac',
      dateDebut: '2024-01-11',
      dateFin: '2024-01-11',
      heureDebut: '18:00',
      heureFin: '22:00',
      statut: 'validé',
      responsable: 'Thomas Leroy',
      dateCreation: '2024-01-10',
      commentaire: 'Lancement produit X'
    },
    {
      id: 6,
      agent: 'Julie Petit',
      matricule: '333DEF444',
      direction: 'Direction Commerciale',
      type: 'Maladie',
      motif: 'Arrêt maladie',
      lieu: 'Domicile',
      dateDebut: '2024-01-10',
      dateFin: '2024-01-12',
      heureDebut: '00:00',
      heureFin: '23:59',
      statut: 'validé',
      responsable: 'Paul Durand',
      dateCreation: '2024-01-09',
      commentaire: 'Certificat médical fourni'
    },
    {
      id: 7,
      agent: 'Marc Dubois',
      matricule: '555GHI666',
      direction: 'Direction Financière',
      type: 'Réunion',
      motif: 'Réunion stratégique',
      lieu: 'Siège social',
      dateDebut: '2024-01-09',
      dateFin: '2024-01-09',
      heureDebut: '14:00',
      heureFin: '17:00',
      statut: 'en_attente',
      responsable: 'Alice Bernard',
      dateCreation: '2024-01-08',
      commentaire: 'Réunion budget Q1'
    },
    {
      id: 8,
      agent: 'Léa Moreau',
      matricule: '777JKL888',
      direction: 'Direction Logistique',
      type: 'Mission',
      motif: 'Audit fournisseur',
      lieu: 'Usine Port-Novo',
      dateDebut: '2024-01-08',
      dateFin: '2024-01-09',
      heureDebut: '07:00',
      heureFin: '19:00',
      statut: 'validé',
      responsable: null,
      dateCreation: '2024-01-07',
      commentaire: 'Audit de contrôle qualité'
    }
  ]);

  const [filteredPositions, setFilteredPositions] = useState(positions);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDirection, setSelectedDirection] = useState('toutes');
  const [selectedType, setSelectedType] = useState('tous');
  const [selectedStatut, setSelectedStatut] = useState('tous');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const directions = [...new Set(positions.map(p => p.direction))];
  const types = [...new Set(positions.map(p => p.type))];
  const statuts = ['validé', 'en_attente', 'rejeté'];

  useEffect(() => {
    let result = positions;

    // Filtre par recherche
    if (searchTerm) {
      result = result.filter(p =>
        p.agent.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.matricule.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.motif.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.lieu.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtre par direction
    if (selectedDirection !== 'toutes') {
      result = result.filter(p => p.direction === selectedDirection);
    }

    // Filtre par type
    if (selectedType !== 'tous') {
      result = result.filter(p => p.type === selectedType);
    }

    // Filtre par statut
    if (selectedStatut !== 'tous') {
      result = result.filter(p => p.statut === selectedStatut);
    }

    // Filtre par date
    if (dateRange.start) {
      result = result.filter(p => p.dateDebut >= dateRange.start);
    }
    if (dateRange.end) {
      result = result.filter(p => p.dateDebut <= dateRange.end);
    }

    setFilteredPositions(result);
    setCurrentPage(1);
  }, [searchTerm, selectedDirection, selectedType, selectedStatut, dateRange]);

  const totalPages = Math.ceil(filteredPositions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPositions = filteredPositions.slice(startIndex, endIndex);

  const handleExport = (format) => {
    // Simuler l'export
    const data = JSON.stringify(filteredPositions, null, 2);
    const blob = new Blob([data], { type: format === 'excel' ? 'application/vnd.ms-excel' : 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `positions_${new Date().toISOString().split('T')[0]}.${format === 'excel' ? 'xlsx' : 'json'}`;
    a.click();
    URL.revokeObjectURL(url);
    alert(`${format === 'excel' ? 'Excel' : 'JSON'} exporté avec succès !`);
  };

  const StatCard = ({ title, value, icon: Icon, color = 'blue', trend, change }) => {
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
            <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
            {change && (
              <div className="flex items-center gap-1 mt-2">
                {trend === 'up' ? (
                  <TrendingUp className="w-4 h-4 text-green-500" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500" />
                )}
                <span className={`text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {change}
                </span>
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
      rejeté: { color: 'bg-red-100 text-red-800', icon: XCircle, label: 'Rejeté' }
    };

    const { color, icon: Icon, label } = config[statut] || config.en_attente;

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${color}`}>
        <Icon className="w-3 h-3" />
        {label}
      </span>
    );
  };

  const TypeBadge = ({ type }) => {
    const colors = {
      Mission: 'bg-blue-100 text-blue-800',
      Congé: 'bg-purple-100 text-purple-800',
      Télétravail: 'bg-green-100 text-green-800',
      Formation: 'bg-orange-100 text-orange-800',
      Maladie: 'bg-red-100 text-red-800',
      Réunion: 'bg-indigo-100 text-indigo-800'
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
        {/* En-tête */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Historique des Positions</h1>
            <p className="text-gray-600 mt-2">Vue globale de toutes les positions des agents</p>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Filtres
                {showFilters && (
                  <span className="h-2 w-2 bg-blue-600 rounded-full"></span>
                )}
              </button>
            </div>
            <div className="relative">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center gap-2">
                <Download className="w-4 h-4" />
                Exporter
              </button>
              <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 hidden">
                <button
                  onClick={() => handleExport('excel')}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Excel (.xlsx)
                </button>
                <button
                  onClick={() => handleExport('json')}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  JSON
                </button>
                <button
                  onClick={() => handleExport('pdf')}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  PDF
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Positions"
            value={positions.length}
            icon={MapPin}
            color="blue"
            trend="up"
            change="+12 ce mois"
          />
          <StatCard
            title="En attente"
            value={positions.filter(p => p.statut === 'en_attente').length}
            icon={AlertCircle}
            color="orange"
            trend="down"
            change="-3 aujourd'hui"
          />
          <StatCard
            title="Validées"
            value={positions.filter(p => p.statut === 'validé').length}
            icon={CheckCircle}
            color="green"
            trend="up"
            change="+8 aujourd'hui"
          />
          <StatCard
            title="Rejetées"
            value={positions.filter(p => p.statut === 'rejeté').length}
            icon={XCircle}
            color="red"
            trend="stable"
            change="0 aujourd'hui"
          />
        </div>

        {/* Filtres avancés */}
        {showFilters && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-900">Filtres avancés</h3>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedDirection('toutes');
                  setSelectedType('tous');
                  setSelectedStatut('tous');
                  setDateRange({ start: '', end: '' });
                }}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Réinitialiser
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Direction
                </label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  value={selectedDirection}
                  onChange={(e) => setSelectedDirection(e.target.value)}
                >
                  <option value="toutes">Toutes les directions</option>
                  {directions.map(dir => (
                    <option key={dir} value={dir}>{dir}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="tous">Tous les types</option>
                  {types.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Statut
                </label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  value={selectedStatut}
                  onChange={(e) => setSelectedStatut(e.target.value)}
                >
                  <option value="tous">Tous les statuts</option>
                  {statuts.map(statut => (
                    <option key={statut} value={statut}>
                      {statut.charAt(0).toUpperCase() + statut.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Période
                </label>
                <div className="flex gap-2">
                  <input
                    type="date"
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
                    value={dateRange.start}
                    onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                    placeholder="Début"
                  />
                  <input
                    type="date"
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
                    value={dateRange.end}
                    onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                    placeholder="Fin"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Barre de recherche */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher par agent, matricule, motif ou lieu..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="text-sm text-gray-500 self-center">
              {filteredPositions.length} position(s) trouvée(s)
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne gauche : Statistiques */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Répartition par type</h2>
              <div className="space-y-3">
                {types.map(type => {
                  const count = positions.filter(p => p.type === type).length;
                  const percentage = Math.round((count / positions.length) * 100);
                  return (
                    <div key={type} className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-700">{type}</span>
                        <span className="text-sm text-gray-900">{count} ({percentage}%)</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Top 5 Directions</h2>
              <div className="space-y-4">
                {directions.slice(0, 5).map(dir => {
                  const count = positions.filter(p => p.direction === dir).length;
                  return (
                    <div key={dir} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Building className="w-5 h-5 text-gray-400" />
                        <div>
                          <h3 className="font-medium text-gray-900">{dir}</h3>
                          <p className="text-sm text-gray-500">{count} positions</p>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Colonne droite : Tableau des positions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Agent
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Type & Lieu
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Période
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Statut
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {currentPositions.map((position) => (
                      <tr key={position.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-medium text-gray-900">{position.agent}</div>
                            <div className="text-sm text-gray-500">{position.matricule}</div>
                            <div className="flex items-center gap-1 mt-1">
                              <Building className="w-3 h-3 text-gray-400" />
                              <span className="text-xs text-gray-500">{position.direction}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <TypeBadge type={position.type} />
                            <div className="text-sm text-gray-900">{position.motif}</div>
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <MapPin className="w-3 h-3" />
                              {position.lieu}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span className="font-medium">{position.dateDebut}</span>
                              {position.dateFin !== position.dateDebut && (
                                <> au {position.dateFin}</>
                              )}
                            </div>
                            <div className="text-gray-500 mt-1">
                              {position.heureDebut} - {position.heureFin}
                            </div>
                            <div className="text-xs text-gray-400 mt-1">
                              Créé le {position.dateCreation}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-2">
                            <StatusBadge statut={position.statut} />
                            <div className="text-xs text-gray-500">
                              {position.responsable ? `Par: ${position.responsable}` : 'Non assigné'}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => alert(`Voir détails: ${position.id}`)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Voir détails"
                            >
                              <Eye size={16} />
                            </button>
                            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                              <MoreVertical size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="px-6 py-4 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-sm text-gray-500">
                    Page {currentPage} sur {totalPages} • {filteredPositions.length} position(s)
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNum = i + 1;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`px-3 py-1 rounded-lg ${currentPage === pageNum ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Résumé */}
            <div className="mt-6 bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Résumé des filtres</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Direction sélectionnée</p>
                  <p className="font-semibold mt-1">
                    {selectedDirection === 'toutes' ? 'Toutes' : selectedDirection}
                  </p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Type sélectionné</p>
                  <p className="font-semibold mt-1">
                    {selectedType === 'tous' ? 'Tous' : selectedType}
                  </p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Statut sélectionné</p>
                  <p className="font-semibold mt-1">
                    {selectedStatut === 'tous' ? 'Tous' : selectedStatut}
                  </p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Période</p>
                  <p className="font-semibold mt-1">
                    {dateRange.start || 'Début'} - {dateRange.end || 'Fin'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoriquePositions;