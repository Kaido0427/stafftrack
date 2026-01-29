import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  UserCheck,
  Users,
  Building,
  Mail,
  Phone,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  Filter,
  Download,
  ArrowUpDown
} from 'lucide-react';

const Responsables = () => {
  const [responsables, setResponsables] = useState([
    {
      id: 1,
      nom: 'Paul Durand',
      email: 'paul.durand@example.com',
      telephone: '+229 01 23 45 67',
      direction: 'Direction Commerciale',
      dateAssignation: '2024-01-10',
      agentsCount: 25,
      positionsEnAttente: 12,
      statut: 'actif',
      matricule: 'DIR001'
    },
    {
      id: 2,
      nom: 'Sophie Martin',
      email: 'sophie.martin@example.com',
      telephone: '+229 02 34 56 78',
      direction: 'Direction RH',
      dateAssignation: '2024-01-12',
      agentsCount: 18,
      positionsEnAttente: 8,
      statut: 'actif',
      matricule: 'DIR002'
    },
    {
      id: 3,
      nom: 'Jean Dupont',
      email: 'jean.dupont@example.com',
      telephone: '+229 03 45 67 89',
      direction: 'Direction Technique',
      dateAssignation: '2024-01-08',
      agentsCount: 42,
      positionsEnAttente: 5,
      statut: 'actif',
      matricule: 'DIR003'
    },
    {
      id: 4,
      nom: 'Alice Bernard',
      email: 'alice.bernard@example.com',
      telephone: '+229 04 56 78 90',
      direction: 'Direction Financière',
      dateAssignation: '2024-01-05',
      agentsCount: 15,
      positionsEnAttente: 3,
      statut: 'inactif',
      matricule: 'DIR004'
    },
    {
      id: 5,
      nom: 'Marie Curie',
      email: 'marie.curie@example.com',
      telephone: '+229 05 67 89 01',
      direction: 'Direction Recherche',
      dateAssignation: '2024-01-15',
      agentsCount: 12,
      positionsEnAttente: 7,
      statut: 'actif',
      matricule: 'DIR005'
    }
  ]);

  const [directions, setDirections] = useState([
    { id: 1, name: 'Direction Commerciale', responsable: 'Paul Durand', agents: 25 },
    { id: 2, name: 'Direction RH', responsable: 'Sophie Martin', agents: 18 },
    { id: 3, name: 'Direction Technique', responsable: 'Jean Dupont', agents: 42 },
    { id: 4, name: 'Direction Financière', responsable: 'Alice Bernard', agents: 15 },
    { id: 5, name: 'Direction Recherche', responsable: 'Marie Curie', agents: 12 },
    { id: 6, name: 'Direction Marketing', responsable: null, agents: 20 },
    { id: 7, name: 'Direction Logistique', responsable: null, agents: 30 }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatut, setSelectedStatut] = useState('tous');
  const [selectedDirection, setSelectedDirection] = useState('toutes');
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [selectedDirectionAssign, setSelectedDirectionAssign] = useState(null);
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState('');

  useEffect(() => {
    // Simuler le chargement des agents pour assignation
    setAgents([
      { id: 1, nom: 'Thomas Leroy', matricule: 'AG001', direction: 'Direction Marketing' },
      { id: 2, nom: 'Julie Petit', matricule: 'AG002', direction: 'Direction Marketing' },
      { id: 3, nom: 'Marc Dubois', matricule: 'AG003', direction: 'Direction Marketing' },
      { id: 4, nom: 'Léa Moreau', matricule: 'AG004', direction: 'Direction Logistique' },
      { id: 5, nom: 'Pierre Martin', matricule: 'AG005', direction: 'Direction Logistique' }
    ]);
  }, []);

  const filteredResponsables = responsables.filter(responsable => {
    const matchesSearch = 
      responsable.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      responsable.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      responsable.matricule.toLowerCase().includes(searchTerm.toLowerCase()) ||
      responsable.direction.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatut = selectedStatut === 'tous' || responsable.statut === selectedStatut;
    const matchesDirection = selectedDirection === 'toutes' || responsable.direction === selectedDirection;
    
    return matchesSearch && matchesStatut && matchesDirection;
  });

  const directionsSansResponsable = directions.filter(dir => !dir.responsable);

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir retirer ce responsable ?')) {
      // Mettre à jour la direction pour supprimer le responsable
      const responsable = responsables.find(r => r.id === id);
      setDirections(directions.map(dir => 
        dir.responsable === responsable.nom ? { ...dir, responsable: null } : dir
      ));
      
      // Supprimer le responsable de la liste
      setResponsables(responsables.filter(r => r.id !== id));
    }
  };

  const handleToggleStatut = (id) => {
    setResponsables(responsables.map(responsable => 
      responsable.id === id 
        ? { ...responsable, statut: responsable.statut === 'actif' ? 'inactif' : 'actif' }
        : responsable
    ));
  };

  const handleOpenAssignDialog = (directionId) => {
    const direction = directions.find(dir => dir.id === directionId);
    setSelectedDirectionAssign(direction);
    setIsAssignDialogOpen(true);
  };

  const handleAssignResponsable = () => {
    if (!selectedAgent) {
      alert('Veuillez sélectionner un agent');
      return;
    }

    const agent = agents.find(a => a.id === parseInt(selectedAgent));
    
    // Créer un nouveau responsable
    const newResponsable = {
      id: responsables.length + 1,
      nom: agent.nom,
      email: `${agent.nom.toLowerCase().replace(' ', '.')}@example.com`,
      telephone: '+229 00 00 00 00',
      direction: selectedDirectionAssign.name,
      dateAssignation: new Date().toISOString().split('T')[0],
      agentsCount: selectedDirectionAssign.agents,
      positionsEnAttente: 0,
      statut: 'actif',
      matricule: `DIR${(responsables.length + 1).toString().padStart(3, '0')}`
    };

    // Ajouter le nouveau responsable
    setResponsables([...responsables, newResponsable]);
    
    // Mettre à jour la direction
    setDirections(directions.map(dir => 
      dir.id === selectedDirectionAssign.id 
        ? { ...dir, responsable: agent.nom }
        : dir
    ));

    // Fermer le dialogue
    setIsAssignDialogOpen(false);
    setSelectedDirectionAssign(null);
    setSelectedAgent('');
    alert('Responsable assigné avec succès !');
  };

  const handleExportData = () => {
    // Simuler l'export des données
    const data = JSON.stringify(filteredResponsables, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'responsables.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const StatCard = ({ title, value, icon: Icon, color = 'blue', description }) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600'
    };

    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
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
    if (statut === 'actif') {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
          <CheckCircle className="w-3 h-3" />
          Actif
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
        <XCircle className="w-3 h-3" />
        Inactif
      </span>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestion des Responsables</h1>
            <p className="text-gray-600 mt-2">Assigner et gérer les responsables par direction</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleExportData}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Exporter
            </button>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Responsables"
            value={responsables.length}
            icon={UserCheck}
            color="blue"
            description={`${responsables.filter(r => r.statut === 'actif').length} actifs`}
          />
          <StatCard
            title="Agents sous gestion"
            value={responsables.reduce((acc, r) => acc + r.agentsCount, 0)}
            icon={Users}
            color="green"
            description="Tous les responsables confondus"
          />
          <StatCard
            title="Directions couvertes"
            value={directions.filter(d => d.responsable).length}
            icon={Building}
            color="purple"
            description={`${directionsSansResponsable.length} sans responsable`}
          />
          <StatCard
            title="Positions en attente"
            value={responsables.reduce((acc, r) => acc + r.positionsEnAttente, 0)}
            icon={UserCheck}
            color="orange"
            description="En attente de validation"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne gauche : Directions sans responsable */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Directions sans responsable</h2>
                <span className="text-sm text-gray-500">{directionsSansResponsable.length}</span>
              </div>
              
              {directionsSansResponsable.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <UserCheck className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                  <p>Toutes les directions ont un responsable</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {directionsSansResponsable.map((direction) => (
                    <div key={direction.id} className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900">{direction.name}</h3>
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-sm text-gray-600">
                          {direction.agents} agents
                        </span>
                        <button
                          onClick={() => handleOpenAssignDialog(direction.id)}
                          className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Assigner
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Statistiques rapides</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Moyenne agents/rep.</span>
                  <span className="font-semibold">
                    {Math.round(responsables.reduce((acc, r) => acc + r.agentsCount, 0) / responsables.length)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Max positions en attente</span>
                  <span className="font-semibold text-orange-600">
                    {Math.max(...responsables.map(r => r.positionsEnAttente))}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Min positions en attente</span>
                  <span className="font-semibold text-green-600">
                    {Math.min(...responsables.map(r => r.positionsEnAttente))}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Assignations ce mois</span>
                  <span className="font-semibold">3</span>
                </div>
              </div>
            </div>
          </div>

          {/* Colonne droite : Liste des responsables */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* Barre de filtres */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Rechercher un responsable..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-3">
                    <select
                      className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={selectedStatut}
                      onChange={(e) => setSelectedStatut(e.target.value)}
                    >
                      <option value="tous">Tous les statuts</option>
                      <option value="actif">Actif</option>
                      <option value="inactif">Inactif</option>
                    </select>
                    <select
                      className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={selectedDirection}
                      onChange={(e) => setSelectedDirection(e.target.value)}
                    >
                      <option value="toutes">Toutes les directions</option>
                      {[...new Set(directions.map(d => d.name))].map((dir) => (
                        <option key={dir} value={dir}>{dir}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Tableau */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        <button className="flex items-center gap-1">
                          Responsable
                          <ArrowUpDown className="w-3 h-3" />
                        </button>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Direction
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Statistiques
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
                    {filteredResponsables.map((responsable) => (
                      <tr key={responsable.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 bg-blue-100 rounded-lg flex items-center justify-center">
                              <span className="text-blue-600 font-semibold">
                                {responsable.nom.charAt(0)}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {responsable.nom}
                              </div>
                              <div className="text-sm text-gray-500">{responsable.matricule}</div>
                              <div className="flex items-center gap-2 mt-1">
                                <Mail className="w-3 h-3 text-gray-400" />
                                <span className="text-xs text-gray-500">{responsable.email}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{responsable.direction}</div>
                          <div className="text-xs text-gray-500">
                            Assigné le {responsable.dateAssignation}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="text-sm">
                              <span className="font-medium">{responsable.agentsCount}</span>
                              <span className="text-gray-600"> agents</span>
                            </div>
                            <div className="text-sm">
                              <span className={`font-medium ${responsable.positionsEnAttente > 0 ? 'text-orange-600' : 'text-gray-900'}`}>
                                {responsable.positionsEnAttente}
                              </span>
                              <span className="text-gray-600"> en attente</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-2">
                            <StatusBadge statut={responsable.statut} />
                            <button
                              onClick={() => handleToggleStatut(responsable.id)}
                              className="text-xs text-blue-600 hover:text-blue-800"
                            >
                              {responsable.statut === 'actif' ? 'Désactiver' : 'Activer'}
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => alert(`Modifier ${responsable.nom}`)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Modifier"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(responsable.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Retirer"
                            >
                              <Trash2 size={16} />
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
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Affichage de <span className="font-medium">1</span> à{' '}
                    <span className="font-medium">{filteredResponsables.length}</span> sur{' '}
                    <span className="font-medium">{responsables.length}</span> responsables
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50">
                      <ChevronLeft size={20} />
                    </button>
                    <span className="px-3 py-1 bg-blue-600 text-white rounded-lg">1</span>
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal d'assignation */}
      {isAssignDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Assigner un responsable
              </h3>
              <p className="text-gray-600 mb-6">
                Sélectionnez un agent pour devenir responsable de la direction :
                <strong> {selectedDirectionAssign?.name}</strong>
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sélectionner un agent
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={selectedAgent}
                    onChange={(e) => setSelectedAgent(e.target.value)}
                  >
                    <option value="">Choisir un agent</option>
                    {agents
                      .filter(agent => agent.direction === selectedDirectionAssign?.name)
                      .map(agent => (
                        <option key={agent.id} value={agent.id}>
                          {agent.nom} ({agent.matricule})
                        </option>
                      ))}
                  </select>
                  {selectedDirectionAssign && 
                    agents.filter(a => a.direction === selectedDirectionAssign.name).length === 0 && (
                      <p className="text-sm text-orange-600 mt-2">
                        Aucun agent trouvé dans cette direction
                      </p>
                    )
                  }
                </div>

                {selectedAgent && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Nouveau responsable</h4>
                    <p className="text-sm text-blue-700">
                      L'agent sélectionné deviendra responsable de{' '}
                      {selectedDirectionAssign?.agents} agents dans la direction{' '}
                      {selectedDirectionAssign?.name}
                    </p>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end gap-3 mt-8">
                <button
                  type="button"
                  onClick={() => {
                    setIsAssignDialogOpen(false);
                    setSelectedDirectionAssign(null);
                    setSelectedAgent('');
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleAssignResponsable}
                  disabled={!selectedAgent}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Assigner
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Responsables;