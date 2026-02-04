import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter,
  Plus,
  Download,
  Calendar,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  FileText,
  BarChart3,
  MoreVertical,
  RefreshCw,
  CheckSquare,
  Square
} from 'lucide-react';

const MesPositions = () => {
  const [positions, setPositions] = useState([
    {
      id: 1,
      type: 'Mission',
      motif: 'Visite client ABC Corp',
      lieu: 'Godomey',
      dateDebut: '2024-01-15',
      dateFin: '2024-01-15',
      heureDebut: '09:00',
      heureFin: '17:00',
      statut: 'validé',
      responsable: 'Paul Durand',
      dateCreation: '2024-01-14',
      commentaire: 'Visite du client ABC Corp pour présentation des nouveaux produits',
      peutModifier: false,
      peutSupprimer: false
    },
    {
      id: 2,
      type: 'Télétravail',
      motif: 'Travail à distance',
      lieu: 'Domicile',
      dateDebut: '2024-01-12',
      dateFin: '2024-01-12',
      heureDebut: '08:30',
      heureFin: '17:30',
      statut: 'validé',
      responsable: 'Paul Durand',
      dateCreation: '2024-01-11',
      commentaire: 'Télétravail du vendredi',
      peutModifier: false,
      peutSupprimer: false
    },
    {
      id: 3,
      type: 'Formation',
      motif: 'Formation produits nouveaux',
      lieu: 'Siège social - Salle B',
      dateDebut: '2024-01-10',
      dateFin: '2024-01-10',
      heureDebut: '09:00',
      heureFin: '17:00',
      statut: 'en_attente',
      responsable: 'Paul Durand',
      dateCreation: '2024-01-09',
      commentaire: 'Formation sur la nouvelle gamme de produits',
      peutModifier: true,
      peutSupprimer: true
    },
    {
      id: 4,
      type: 'Congé',
      motif: 'Congé annuel',
      lieu: 'Domicile',
      dateDebut: '2024-01-08',
      dateFin: '2024-01-10',
      heureDebut: '00:00',
      heureFin: '23:59',
      statut: 'validé',
      responsable: 'Paul Durand',
      dateCreation: '2024-01-07',
      commentaire: '3 jours de congés annuels',
      peutModifier: false,
      peutSupprimer: false
    },
    {
      id: 5,
      type: 'Mission',
      motif: 'Réunion équipe commerciale',
      lieu: 'Siège social - Salle A',
      dateDebut: '2024-01-05',
      dateFin: '2024-01-05',
      heureDebut: '14:00',
      heureFin: '16:00',
      statut: 'validé',
      responsable: 'Paul Durand',
      dateCreation: '2024-01-04',
      commentaire: 'Réunion mensuelle de l\'équipe commerciale',
      peutModifier: false,
      peutSupprimer: false
    },
    {
      id: 6,
      type: 'Maladie',
      motif: 'Arrêt maladie',
      lieu: 'Domicile',
      dateDebut: '2024-01-03',
      dateFin: '2024-01-03',
      heureDebut: '00:00',
      heureFin: '23:59',
      statut: 'rejeté',
      responsable: 'Paul Durand',
      dateCreation: '2024-01-02',
      commentaire: 'Certificat médical non fourni à temps',
      peutModifier: true,
      peutSupprimer: true
    },
    {
      id: 7,
      type: 'Réunion',
      motif: 'Présentation résultats',
      lieu: 'Siège social - Auditorium',
      dateDebut: '2024-01-02',
      dateFin: '2024-01-02',
      heureDebut: '10:00',
      heureFin: '12:00',
      statut: 'validé',
      responsable: 'Paul Durand',
      dateCreation: '2023-12-28',
      commentaire: 'Présentation des résultats trimestriels',
      peutModifier: false,
      peutSupprimer: false
    }
  ]);

  const [filteredPositions, setFilteredPositions] = useState(positions);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('tous');
  const [selectedStatut, setSelectedStatut] = useState('tous');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPositions, setSelectedPositions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const types = ['tous', ...new Set(positions.map(p => p.type))];
  const statuts = ['tous', 'validé', 'en_attente', 'rejeté'];

  useEffect(() => {
    let result = positions;

    // Filtre par recherche
    if (searchTerm) {
      result = result.filter(p =>
        p.motif.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.lieu.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.commentaire.toLowerCase().includes(searchTerm.toLowerCase())
      );
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
  }, [searchTerm, selectedType, selectedStatut, dateRange]);

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

  const handleDeleteSelected = () => {
    if (selectedPositions.length === 0) return;
    
    const confirmDelete = window.confirm(
      `Êtes-vous sûr de vouloir supprimer ${selectedPositions.length} position(s) ?`
    );
    
    if (confirmDelete) {
      // Ne supprimer que les positions qui peuvent être supprimées
      const positionsToDelete = positions.filter(p => 
        selectedPositions.includes(p.id) && p.peutSupprimer
      );
      
      if (positionsToDelete.length < selectedPositions.length) {
        alert('Certaines positions ne peuvent pas être supprimées (déjà validées)');
      }
      
      setPositions(positions.filter(p => !selectedPositions.includes(p.id)));
      setSelectedPositions([]);
    }
  };

  const handleExport = () => {
    const dataToExport = selectedPositions.length > 0 
      ? positions.filter(p => selectedPositions.includes(p.id))
      : filteredPositions;
    
    const data = JSON.stringify(dataToExport, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mes_positions_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleEdit = (position) => {
    if (!position.peutModifier) {
      alert('Cette position ne peut plus être modifiée (déjà validée)');
      return;
    }
    alert(`Modifier la position: ${position.motif}`);
    // Redirection vers le formulaire d'édition
  };

  const handleDelete = (position) => {
    if (!position.peutSupprimer) {
      alert('Cette position ne peut plus être supprimée (déjà validée)');
      return;
    }
    
    if (window.confirm(`Supprimer la position: ${position.motif} ?`)) {
      setPositions(positions.filter(p => p.id !== position.id));
    }
  };

  const StatCard = ({ title, value, icon: Icon, color = 'blue', description }) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      orange: 'bg-orange-100 text-orange-600',
      red: 'bg-red-100 text-red-600',
      purple: 'bg-purple-100 text-purple-600'
    };

    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
            {description && (
              <p className="text-sm text-gray-500 mt-1">{description}</p>
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

  const getStats = () => {
    const total = positions.length;
    const validees = positions.filter(p => p.statut === 'validé').length;
    const enAttente = positions.filter(p => p.statut === 'en_attente').length;
    const rejetees = positions.filter(p => p.statut === 'rejeté').length;
    const tauxValidation = total > 0 ? Math.round((validees / total) * 100) : 0;

    return { total, validees, enAttente, rejetees, tauxValidation };
  };

  const stats = getStats();

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mes Positions</h1>
            <p className="text-gray-600 mt-2">Historique complet de toutes mes positions</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => window.location.href = '/agent/positions/nouvelle'}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Nouvelle Position
            </button>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total"
            value={stats.total}
            icon={FileText}
            color="blue"
            description="Toutes positions"
          />
          <StatCard
            title="Validées"
            value={stats.validees}
            icon={CheckCircle}
            color="green"
            description={`${stats.tauxValidation}% de taux`}
          />
          <StatCard
            title="En attente"
            value={stats.enAttente}
            icon={Clock}
            color="orange"
            description="En cours de validation"
          />
          <StatCard
            title="Rejetées"
            value={stats.rejetees}
            icon={XCircle}
            color="red"
            description="À corriger"
          />
        </div>

        {/* Barre d'actions et filtres */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher par motif, lieu ou commentaire..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Filtres
              </button>
              {selectedPositions.length > 0 && (
                <>
                  <button
                    onClick={handleDeleteSelected}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Supprimer ({selectedPositions.length})
                  </button>
                </>
              )}
              <button
                onClick={handleExport}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Exporter
              </button>
            </div>
          </div>

          {/* Filtres avancés */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                  >
                    {types.map(type => (
                      <option key={type} value={type}>
                        {type === 'tous' ? 'Tous les types' : type}
                      </option>
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
                    {statuts.map(statut => (
                      <option key={statut} value={statut}>
                        {statut === 'tous' ? 'Tous les statuts' : statut}
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
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => {
                    setSelectedType('tous');
                    setSelectedStatut('tous');
                    setDateRange({ start: '', end: '' });
                  }}
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  Réinitialiser les filtres
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne gauche : Répartition */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Répartition par type</h2>
              <div className="space-y-3">
                {types.filter(t => t !== 'tous').map(type => {
                  const count = positions.filter(p => p.type === type).length;
                  const percentage = positions.length > 0 ? Math.round((count / positions.length) * 100) : 0;
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
              <h2 className="text-xl font-bold text-gray-900 mb-4">Actions rapides</h2>
              <div className="space-y-3">
                <button
                  onClick={() => setSelectedStatut('en_attente')}
                  className="w-full text-left p-3 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5" />
                    <div>
                      <p className="font-medium">Voir en attente</p>
                      <p className="text-sm">{stats.enAttente} position(s)</p>
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => setSelectedStatut('rejeté')}
                  className="w-full text-left p-3 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5" />
                    <div>
                      <p className="font-medium">Voir rejetées</p>
                      <p className="text-sm">{stats.rejetees} position(s)</p>
                    </div>
                  </div>
                </button>
                <button
                  onClick={handleExport}
                  className="w-full text-left p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Download className="w-5 h-5" />
                    <div>
                      <p className="font-medium">Exporter tout</p>
                      <p className="text-sm">{positions.length} position(s)</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Colonne droite : Liste des positions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-10">
                        <button
                          onClick={handleSelectAll}
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                          {selectedPositions.length === currentPositions.length ? (
                            <CheckSquare className="w-4 h-4 text-blue-600" />
                          ) : (
                            <Square className="w-4 h-4 text-gray-400" />
                          )}
                        </button>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Position
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
                    {currentPositions.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="px-6 py-12 text-center">
                          <div className="text-gray-500">
                            <FileText className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                            <p className="text-lg font-medium text-gray-900">Aucune position trouvée</p>
                            <p className="mt-1">Essayez de modifier vos filtres de recherche</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      currentPositions.map((position) => (
                        <tr key={position.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <input
                              type="checkbox"
                              checked={selectedPositions.includes(position.id)}
                              onChange={() => handleSelectPosition(position.id)}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <TypeBadge type={position.type} />
                                <span className="text-xs text-gray-500">
                                  Créé le {position.dateCreation}
                                </span>
                              </div>
                              <h3 className="font-medium text-gray-900">{position.motif}</h3>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <MapPin className="w-3 h-3" />
                                {position.lieu}
                              </div>
                              {position.commentaire && (
                                <p className="text-sm text-gray-500 truncate max-w-xs">
                                  {position.commentaire}
                                </p>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm">
                              <div className="font-medium">{position.dateDebut}</div>
                              {position.dateFin !== position.dateDebut && (
                                <div className="text-gray-500">au {position.dateFin}</div>
                              )}
                              <div className="text-gray-500 mt-1">
                                {position.heureDebut} - {position.heureFin}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-2">
                              <StatusBadge statut={position.statut} />
                              <div className="text-xs text-gray-500">
                                {position.responsable}
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
                              {position.peutModifier && (
                                <button
                                  onClick={() => handleEdit(position)}
                                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                  title="Modifier"
                                >
                                  <Edit size={16} />
                                </button>
                              )}
                              {position.peutSupprimer && (
                                <button
                                  onClick={() => handleDelete(position)}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Supprimer"
                                >
                                  <Trash2 size={16} />
                                </button>
                              )}
                              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                <MoreVertical size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="px-6 py-4 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-sm text-gray-500">
                    {selectedPositions.length > 0 ? (
                      <span>{selectedPositions.length} position(s) sélectionnée(s)</span>
                    ) : (
                      <span>
                        Page {currentPage} sur {totalPages} • {filteredPositions.length} position(s)
                      </span>
                    )}
                  </div>
                  {totalPages > 1 && (
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
                  )}
                </div>
              </div>
            </div>

            {/* Résumé des filtres */}
            <div className="mt-6 bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Résumé</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Filtre type</p>
                  <p className="font-semibold mt-1">
                    {selectedType === 'tous' ? 'Tous' : selectedType}
                  </p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Filtre statut</p>
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
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Résultats</p>
                  <p className="font-semibold mt-1">{filteredPositions.length} position(s)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MesPositions;