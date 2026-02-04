import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Shield,
  Bell,
  Globe,
  Save,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  Camera,
  Key,
  LogOut,
  Upload,
  Trash2,
  AlertCircle
} from 'lucide-react';

const AgentParametre = () => {
  const [activeTab, setActiveTab] = useState('profil');
  const [agentData, setAgentData] = useState({
    nom: 'Lorent Marcos',
    prenom: 'Lorent',
    email: 'lorent.marcos@entreprise.com',
    telephone: '+229 01 23 45 67',
    poste: 'Commercial Senior',
    direction: 'Direction Commerciale',
    matricule: '358RTX5RJ',
    dateEmbauche: '2022-03-15',
    photo: null
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [preferences, setPreferences] = useState({
    notificationsEmail: true,
    notificationsSMS: false,
    notificationsPush: true,
    language: 'fr',
    timezone: 'Africa/Porto-Novo',
    darkMode: false
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState({});

  const tabs = [
    { id: 'profil', label: 'Profil', icon: User },
    { id: 'security', label: 'Sécurité', icon: Lock },
    { id: 'preferences', label: 'Préférences', icon: Bell },
    { id: 'session', label: 'Session', icon: Shield }
  ];

  const handleProfileChange = (field, value) => {
    setAgentData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
    // Effacer les erreurs quand l'utilisateur tape
    if (passwordErrors[field]) {
      setPasswordErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handlePreferencesChange = (field, value) => {
    setPreferences(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validatePassword = () => {
    const errors = {};

    if (!passwordData.currentPassword) {
      errors.currentPassword = 'Le mot de passe actuel est requis';
    }

    if (!passwordData.newPassword) {
      errors.newPassword = 'Le nouveau mot de passe est requis';
    } else if (passwordData.newPassword.length < 8) {
      errors.newPassword = 'Minimum 8 caractères';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(passwordData.newPassword)) {
      errors.newPassword = 'Doit contenir majuscule, minuscule et chiffre';
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUpdateProfile = async () => {
    setIsLoading(true);
    
    // Simuler l'appel API
    setTimeout(() => {
      console.log('Mise à jour profil:', agentData);
      setIsEditing(false);
      setIsLoading(false);
      alert('Profil mis à jour avec succès !');
    }, 1500);
  };

  const handleChangePassword = async () => {
    if (!validatePassword()) {
      return;
    }

    setIsLoading(true);
    
    // Simuler l'appel API
    setTimeout(() => {
      console.log('Changement mot de passe:', { 
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      setIsLoading(false);
      alert('Mot de passe changé avec succès !');
    }, 1500);
  };

  const handleUploadPhoto = (event) => {
    const file = event.target.files[0];
    if (file) {
      // En réalité, vous enverriez le fichier au backend
      const reader = new FileReader();
      reader.onload = (e) => {
        setAgentData(prev => ({
          ...prev,
          photo: e.target.result
        }));
      };
      reader.readAsDataURL(file);
      alert('Photo téléchargée avec succès !');
    }
  };

  const handleDeleteAccount = () => {
    const confirm = window.confirm(
      'Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.'
    );
    
    if (confirm) {
      alert('Fonctionnalité de suppression de compte désactivée pour le moment.');
    }
  };

  const handleLogout = () => {
    // Simuler la déconnexion
    alert('Déconnexion réussie !');
    // window.location.href = '/login';
  };

  const PasswordStrengthIndicator = ({ password }) => {
    if (!password) return null;

    const strength = {
      0: { label: 'Très faible', color: 'bg-red-500', width: '20%' },
      1: { label: 'Faible', color: 'bg-red-400', width: '40%' },
      2: { label: 'Moyen', color: 'bg-yellow-500', width: '60%' },
      3: { label: 'Fort', color: 'bg-green-400', width: '80%' },
      4: { label: 'Très fort', color: 'bg-green-600', width: '100%' }
    };

    const calculateStrength = (pwd) => {
      let score = 0;
      if (pwd.length >= 8) score++;
      if (/[a-z]/.test(pwd)) score++;
      if (/[A-Z]/.test(pwd)) score++;
      if (/[0-9]/.test(pwd)) score++;
      if (/[^A-Za-z0-9]/.test(pwd)) score++;
      return Math.min(score, 4);
    };

    const score = calculateStrength(password);
    const { label, color, width } = strength[score];

    return (
      <div className="mt-2">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600">Force du mot de passe:</span>
          <span className="font-medium">{label}</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full ${color} transition-all duration-300`}
            style={{ width }}
          ></div>
        </div>
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profil':
        return (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Informations du profil</h3>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {isEditing ? 'Annuler' : 'Modifier'}
              </button>
            </div>

            {/* Photo de profil */}
            <div className="flex items-center gap-6 mb-8">
              <div className="relative">
                <div className="h-24 w-24 bg-blue-100 rounded-xl flex items-center justify-center">
                  {agentData.photo ? (
                    <img 
                      src={agentData.photo} 
                      alt="Profile" 
                      className="h-24 w-24 rounded-xl object-cover"
                    />
                  ) : (
                    <span className="text-3xl font-bold text-blue-600">
                      {agentData.nom.charAt(0)}
                    </span>
                  )}
                </div>
                {isEditing && (
                  <label className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700">
                    <Camera className="w-4 h-4" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleUploadPhoto}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900">{agentData.nom}</h4>
                <p className="text-gray-600">{agentData.poste}</p>
                <p className="text-sm text-gray-500">{agentData.matricule}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom
                </label>
                <input
                  type="text"
                  value={agentData.nom}
                  onChange={(e) => handleProfileChange('nom', e.target.value)}
                  disabled={!isEditing}
                  className={`w-full border rounded-lg px-4 py-3 ${
                    isEditing 
                      ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                      : 'border-gray-200 bg-gray-50'
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prénom
                </label>
                <input
                  type="text"
                  value={agentData.prenom}
                  onChange={(e) => handleProfileChange('prenom', e.target.value)}
                  disabled={!isEditing}
                  className={`w-full border rounded-lg px-4 py-3 ${
                    isEditing 
                      ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                      : 'border-gray-200 bg-gray-50'
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={agentData.email}
                  onChange={(e) => handleProfileChange('email', e.target.value)}
                  disabled={!isEditing}
                  className={`w-full border rounded-lg px-4 py-3 ${
                    isEditing 
                      ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                      : 'border-gray-200 bg-gray-50'
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Téléphone
                </label>
                <input
                  type="tel"
                  value={agentData.telephone}
                  onChange={(e) => handleProfileChange('telephone', e.target.value)}
                  disabled={!isEditing}
                  className={`w-full border rounded-lg px-4 py-3 ${
                    isEditing 
                      ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                      : 'border-gray-200 bg-gray-50'
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Poste
                </label>
                <input
                  type="text"
                  value={agentData.poste}
                  disabled
                  className="w-full border border-gray-200 bg-gray-50 rounded-lg px-4 py-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Direction
                </label>
                <input
                  type="text"
                  value={agentData.direction}
                  disabled
                  className="w-full border border-gray-200 bg-gray-50 rounded-lg px-4 py-3"
                />
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Informations complémentaires</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">Matricule</div>
                  <div className="font-medium">{agentData.matricule}</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">Date d'embauche</div>
                  <div className="font-medium">{agentData.dateEmbauche}</div>
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-end gap-3 mt-8">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleUpdateProfile}
                  disabled={isLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      Mise à jour...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Enregistrer les modifications
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            {/* Changement de mot de passe */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <Key className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-900">Changer le mot de passe</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mot de passe actuel
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      value={passwordData.currentPassword}
                      onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                      className={`w-full border rounded-lg px-4 py-3 pr-10 ${
                        passwordErrors.currentPassword 
                          ? 'border-red-300 focus:ring-2 focus:ring-red-500 focus:border-transparent' 
                          : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      }`}
                      placeholder="Entrez votre mot de passe actuel"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                      {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {passwordErrors.currentPassword && (
                    <p className="text-red-500 text-sm mt-1">{passwordErrors.currentPassword}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nouveau mot de passe
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={passwordData.newPassword}
                      onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                      className={`w-full border rounded-lg px-4 py-3 pr-10 ${
                        passwordErrors.newPassword 
                          ? 'border-red-300 focus:ring-2 focus:ring-red-500 focus:border-transparent' 
                          : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      }`}
                      placeholder="Minimum 8 caractères"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                      {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {passwordErrors.newPassword && (
                    <p className="text-red-500 text-sm mt-1">{passwordErrors.newPassword}</p>
                  )}
                  <PasswordStrengthIndicator password={passwordData.newPassword} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirmer le nouveau mot de passe
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={passwordData.confirmPassword}
                      onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                      className={`w-full border rounded-lg px-4 py-3 pr-10 ${
                        passwordErrors.confirmPassword 
                          ? 'border-red-300 focus:ring-2 focus:ring-red-500 focus:border-transparent' 
                          : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      }`}
                      placeholder="Confirmez le nouveau mot de passe"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {passwordErrors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">{passwordErrors.confirmPassword}</p>
                  )}
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-900">Recommandations de sécurité</p>
                      <ul className="text-sm text-blue-700 mt-1 space-y-1">
                        <li>• Utilisez au moins 8 caractères</li>
                        <li>• Combinez lettres majuscules et minuscules</li>
                        <li>• Ajoutez des chiffres et caractères spéciaux</li>
                        <li>• Évitez les mots de passe courants</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleChangePassword}
                  disabled={isLoading}
                  className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      Changement en cours...
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      Changer le mot de passe
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Connexions récentes */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Connexions récentes</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">Chrome • Windows</div>
                    <div className="text-sm text-gray-500">Paris, France • 15 Jan 2024, 14:30</div>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">Safari • iPhone</div>
                    <div className="text-sm text-gray-500">Lyon, France • 14 Jan 2024, 09:15</div>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
              </div>
            </div>
          </div>
        );

      case 'preferences':
        return (
          <div className="space-y-6">
            {/* Notifications */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <Bell className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-900">Préférences de notifications</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Notifications par email</div>
                    <div className="text-sm text-gray-500">Recevoir les notifications par email</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.notificationsEmail}
                      onChange={(e) => handlePreferencesChange('notificationsEmail', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Notifications SMS</div>
                    <div className="text-sm text-gray-500">Recevoir les notifications par SMS</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.notificationsSMS}
                      onChange={(e) => handlePreferencesChange('notificationsSMS', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Notifications push</div>
                    <div className="text-sm text-gray-500">Recevoir les notifications sur l'application</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.notificationsPush}
                      onChange={(e) => handlePreferencesChange('notificationsPush', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Langue et région */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <Globe className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-900">Langue et région</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Langue
                  </label>
                  <select
                    value={preferences.language}
                    onChange={(e) => handlePreferencesChange('language', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="fr">Français</option>
                    <option value="en">English</option>
                    <option value="es">Español</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fuseau horaire
                  </label>
                  <select
                    value={preferences.timezone}
                    onChange={(e) => handlePreferencesChange('timezone', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Africa/Porto-Novo">Porto-Novo (GMT+1)</option>
                    <option value="Europe/Paris">Paris (GMT+1)</option>
                    <option value="America/New_York">New York (GMT-5)</option>
                    <option value="Asia/Tokyo">Tokyo (GMT+9)</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Mode sombre</div>
                    <div className="text-sm text-gray-500">Activer le mode sombre</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.darkMode}
                      onChange={(e) => handlePreferencesChange('darkMode', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case 'session':
        return (
          <div className="space-y-6">
            {/* Déconnexion */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Sessions</h3>
              
              <div className="space-y-4">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <LogOut className="w-5 h-5" />
                  Se déconnecter de tous les appareils
                </button>

                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-yellow-900">Attention</p>
                      <p className="text-sm text-yellow-700 mt-1">
                        La déconnexion fermera toutes vos sessions actives sur tous les appareils.
                        Vous devrez vous reconnecter sur chaque appareil.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Suppression de compte */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-red-200">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-red-600" />
                <h3 className="text-xl font-bold text-gray-900">Zone dangereuse</h3>
              </div>

              <p className="text-gray-600 mb-4">
                La suppression de votre compte est irréversible. Toutes vos données seront perdues.
              </p>

              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Supprimer mon compte
              </button>
            </div>

            {/* Informations légales */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Informations légales</h3>
              
              <div className="space-y-3 text-sm text-gray-600">
                <p>Dernière connexion: 15 Jan 2024, 14:30</p>
                <p>Date de création du compte: 15 Mar 2022</p>
                <p>Version de l'application: 2.1.0</p>
                <p>Adresse IP: 192.168.1.1</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Paramètres du compte</h1>
          <p className="text-gray-600 mt-2">Gérez vos informations personnelles, sécurité et préférences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>

              {/* Indicateur de sécurité */}
              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-900">Sécurité forte</span>
                </div>
                <p className="text-sm text-green-700">
                  Votre compte est bien protégé. Dernière mise à jour il y a 30 jours.
                </p>
              </div>
            </div>
          </div>

          {/* Contenu */}
          <div className="lg:col-span-3">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentParametre;