import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Building, 
  UserCheck, 
  MapPin, 
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  XCircle,
  MoreVertical,
  Download,
  Filter,
  Search
} from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalAgents: 0,
    totalResponsables: 0,
    totalDirections: 0,
    pendingPositions: 0,
    activeAgents: 0,
    inactiveAgents: 0
  });

  const [recentPositions, setRecentPositions] = useState([]);
  const [directions, setDirections] = useState([]);
  const [loading, setLoading] = useState(true);

  // Données simulées - à remplacer par des appels API réels
  useEffect(() => {
    // Simuler le chargement des données
    setTimeout(() => {
      setStats({
        totalAgents: 156,
        totalResponsables: 12,
        totalDirections: 8,
        pendingPositions: 24,
        activeAgents: 142,
        inactiveAgents: 14
      });

      setRecentPositions([
        {
          id: 1,
          agent: 'Lorent Marcos',
          matricule: '358RTX5RJ',
          direction: 'Direction Commerciale',
          position: 'Chef de Zone',
          type: 'Mission',
          status: 'pending',
          date: '2024-01-15',
          heure: '09:30'
        },
        {
          id: 2,
          agent: 'Sophie Martin',
          matricule: '459TYU8KL',
          direction: 'Direction RH',
          position: 'Responsable Recrutement',
          type: 'Congé',
          status: 'approved',
          date: '2024-01-14',
          heure: '14:15'
        },
        {
          id: 3,
          agent: 'Jean Dupont',
          matricule: '267GHJ4DF',
          direction: 'Direction Technique',
          position: 'Ingénieur DevOps',
          type: 'Télétravail',
          status: 'rejected',
          date: '2024-01-13',
          heure: '11:45'
        },
        {
          id: 4,
          agent: 'Marie Curie',
          matricule: '789XYZ123',
          direction: 'Direction Recherche',
          position: 'Chercheuse Senior',
          type: 'Formation',
          status: 'pending',
          date: '2024-01-12',
          heure: '10:00'
        }
      ]);

      setDirections([
        { id: 1, name: 'Direction Commerciale', responsable: 'Paul Durand', agents: 25 },
        { id: 2, name: 'Direction RH', responsable: 'Sophie Martin', agents: 18 },
        { id: 3, name: 'Direction Technique', responsable: 'Jean Dupont', agents: 42 },
        { id: 4, name: 'Direction Financière', responsable: 'Alice Bernard', agents: 15 },
        { id: 5, name: 'Direction Recherche', responsable: 'Marie Curie', agents: 12 },
        { id: 6, name: 'Direction Marketing', responsable: 'Thomas Leroy', agents: 20 }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  // Fonction pour créer l'admin initial
  const handleSeedAdmin = async () => {
    try {
      // Appel API à implémenter
      // await fetch('/api/auth/seed-admin', { method: 'POST' });
      alert('Admin créé avec succès!');
    } catch (error) {
      alert('Erreur lors de la création de l\'admin');
    }
  };

  const StatCard = ({ title, value, icon: Icon, trend, description, color = 'blue' }) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600',
      red: 'bg-red-100 text-red-600',
      indigo: 'bg-indigo-100 text-indigo-600'
    };

    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{loading ? '...' : value}</p>
            {description && (
              <div className="flex items-center gap-1 mt-2">
                {trend === 'up' ? (
                  <TrendingUp className="w-4 h-4 text-green-500" />
                ) : trend === 'down' ? (
                  <TrendingDown className="w-4 h-4 text-red-500" />
                ) : null}
                <span className={`text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {description}
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

  const QuickActionCard = ({ title, description, icon: Icon, action, color = 'blue' }) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-700 hover:bg-blue-100',
      green: 'bg-green-50 text-green-700 hover:bg-green-100',
      purple: 'bg-purple-50 text-purple-700 hover:bg-purple-100'
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
          <div>
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm mt-1 opacity-80">{description}</p>
          </div>
        </div>
      </button>
    );
  };

  const StatusBadge = ({ status }) => {
    const config = {
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock, label: 'En attente' },
      approved: { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Approuvé' },
      rejected: { color: 'bg-red-100 text-red-800', icon: XCircle, label: 'Rejeté' }
    };

    const { color, icon: Icon, label } = config[status] || config.pending;

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${color}`}>
        <Icon className="w-3 h-3" />
        {label}
      </span>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tableau de Bord Admin</h1>
            <p className="text-gray-600 mt-2">Vue globale du système StaffTrack</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleSeedAdmin}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              Créer Admin Initial
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center gap-2">
              <Download className="w-4 h-4" />
              Exporter
            </button>
          </div>
        </div>

        {/* Statistiques principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <StatCard
            title="Agents Totaux"
            value={stats.totalAgents}
            icon={Users}
            trend="up"
            description="+12 cette semaine"
            color="blue"
          />
          <StatCard
            title="Responsables"
            value={stats.totalResponsables}
            icon={UserCheck}
            trend="up"
            description="+2 cette semaine"
            color="green"
          />
          <StatCard
            title="Directions"
            value={stats.totalDirections}
            icon={Building}
            trend="stable"
            color="purple"
          />
          <StatCard
            title="Positions en Attente"
            value={stats.pendingPositions}
            icon={AlertCircle}
            trend="down"
            description="-5 aujourd'hui"
            color="orange"
          />
          <StatCard
            title="Agents Actifs"
            value={stats.activeAgents}
            icon={Users}
            trend="up"
            description="91% d'activité"
            color="indigo"
          />
          <StatCard
            title="Agents Inactifs"
            value={stats.inactiveAgents}
            icon={Users}
            trend="down"
            description="-2 aujourd'hui"
            color="red"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne gauche : Actions rapides */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Actions Rapides</h2>
              <div className="space-y-3">
                <QuickActionCard
                  title="Gérer les Directions"
                  description="Ajouter, modifier ou supprimer des directions"
                  icon={Building}
                  action={() => window.location.href = '/admin/directions'}
                  color="blue"
                />
                <QuickActionCard
                  title="Assigner Responsables"
                  description="Attribuer un responsable à une direction"
                  icon={UserCheck}
                  action={() => window.location.href = '/admin/assign-responsable'}
                  color="green"
                />
                <QuickActionCard
                  title="Gérer les Utilisateurs"
                  description="Voir et gérer tous les utilisateurs"
                  icon={Users}
                  action={() => window.location.href = '/admin/users'}
                  color="purple"
                />
                <QuickActionCard
                  title="Vue Globale Positions"
                  description="Toutes les positions de tous les agents"
                  icon={MapPin}
                  action={() => window.location.href = '/admin/all-positions'}
                />
              </div>
            </div>

            {/* Directions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Directions</h2>
                <span className="text-sm text-gray-500">{directions.length} au total</span>
              </div>
              <div className="space-y-4">
                {directions.map((direction) => (
                  <div key={direction.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">{direction.name}</h3>
                      <p className="text-sm text-gray-500">
                        {direction.responsable} • {direction.agents} agents
                      </p>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Colonne droite : Dernières positions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Dernières Positions</h2>
                    <p className="text-gray-600 mt-1">Les positions récemment créées ou modifiées</p>
                  </div>
                  <div className="flex gap-3">
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <Filter className="w-5 h-5" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <Search className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Agent
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Direction
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Date & Heure
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
                    {recentPositions.map((position) => (
                      <tr key={position.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-medium text-gray-900">{position.agent}</div>
                            <div className="text-sm text-gray-500">{position.matricule}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{position.direction}</div>
                          <div className="text-sm text-gray-500">{position.position}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full font-medium">
                            {position.type}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{position.date}</div>
                          <div className="text-sm text-gray-500">{position.heure}</div>
                        </td>
                        <td className="px-6 py-4">
                          <StatusBadge status={position.status} />
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-blue-600 hover:text-blue-800 font-medium">
                            Voir détails
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 border-t border-gray-200">
                <button className="w-full py-2 text-center text-blue-600 hover:bg-blue-50 rounded-lg font-medium">
                  Voir toutes les positions
                </button>
              </div>
            </div>

            {/* Statistiques par direction */}
            <div className="mt-6 bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Statistiques par Direction</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {directions.slice(0, 6).map((direction) => (
                  <div key={direction.id} className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-semibold text-gray-900">{direction.name}</h3>
                    <div className="mt-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Agents</span>
                        <span className="font-semibold">{direction.agents}</span>
                      </div>
                      <div className="flex justify-between text-sm mt-1">
                        <span className="text-gray-600">Positions</span>
                        <span className="font-semibold">{Math.floor(direction.agents * 0.8)}</span>
                      </div>
                      <div className="flex justify-between text-sm mt-1">
                        <span className="text-gray-600">En attente</span>
                        <span className="font-semibold text-orange-600">
                          {Math.floor(direction.agents * 0.15)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Graphique (simplifié) */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Activité des Positions</h2>
              <p className="text-gray-600 mt-1">Évolution sur les 30 derniers jours</p>
            </div>
            <select className="border border-gray-300 rounded-lg px-4 py-2">
              <option>30 derniers jours</option>
              <option>7 derniers jours</option>
              <option>Cette année</option>
            </select>
          </div>
          
          {/* Graphique simplifié */}
          <div className="h-64 flex items-end gap-1 pt-8 border-t border-gray-200">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="flex-1 bg-blue-100 hover:bg-blue-200 rounded-t transition-colors"
                style={{
                  height: `${20 + Math.sin(i / 3) * 30 + Math.random() * 20}%`
                }}
                title={`Jour ${i + 1}`}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>J1</span>
            <span>J10</span>
            <span>J20</span>
            <span>J30</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;