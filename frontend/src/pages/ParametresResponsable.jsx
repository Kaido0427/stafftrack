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
  AlertCircle,
  Building,
  Users,
  Clock,
  Download,
  Printer,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  FileText,
  BarChart3,
  MessageSquare,
  Calendar
} from 'lucide-react';

const ParametresResponsable = () => {
  const [activeTab, setActiveTab] = useState('profil');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [responsableData, setResponsableData] = useState({
    nom: 'Paul Durand',
    email: 'paul.durand@entreprise.com',
    telephone: '+229 01 23 45 67',
    direction: 'Direction Commerciale',
    dateNomination: '2022-05-15',
    photo: null,
    signature: null
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
    notificationsUrgentes: true,
    language: 'fr',
    timezone: 'Africa/Porto-Novo',
    darkMode: false,
    autoValidation: false,
    delaiValidation: '48',
    signatureNumerique: false
  });

  const [teamSettings, setTeamSettings] = useState({
    delaiDeclaration: '48',
    heureDebut: '08:00',
    heureFin: '18:00',
    joursTravail: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'],
    notificationRetard: true,
    rappelValidation: true
  });

  const [passwordErrors, setPasswordErrors] = useState({});

  const tabs = [
    { id: 'profil', label: 'Profil', icon: User },
    { id: 'security', label: 'Sécurité', icon: Lock },
    { id: 'preferences', label: 'Préférences', icon: Bell },
    { id: 'team', label: 'Équipe', icon: Users },
    { id: 'export', label: 'Export', icon: Download },
    { id: 'session', label: 'Session', icon: Shield }
  ];

  const handleProfileChange = (field, value) => {
    setResponsableData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
    
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

  const handleTeamSettingsChange = (field, value) => {
    setTeamSettings(prev => ({
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
    
    setTimeout(() => {
      console.log('Mise à jour profil:', responsableData);
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
    
    setTimeout(() => {
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
      const reader = new FileReader();
      reader.onload = (e) => {
        setResponsableData(prev => ({
          ...prev,
          photo: e.target.result
        }));
      };
      reader.readAsDataURL(file);
      alert('Photo téléchargée avec succès !');
    }
  };

  const handleUploadSignature = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setResponsableData(prev => ({
          ...prev,
          signature: e.target.result
        }));
      };
      reader.readAsDataURL(file);
      alert('Signature téléchargée avec succès !');
    }
  };

  const handleExportData = (type) => {
    alert(`Export ${type} démarré !`);
  };

  const handleLogout = () => {
    alert('Déconnexion réussie !');
  };

  const handleDeleteAccount = () => {
    const confirm = window.confirm(
      'Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.'
    );
    
    if (confirm) {
      alert('Fonctionnalité de suppression de compte désactivée pour le moment.');
    }
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
          <div className="space-y-6">
            {/* Photo et informations de base */}
            <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="h-16 w-16 md:h-24 md:w-24 bg-blue-100 rounded-xl flex items-center justify-center">
                      {responsableData.photo ? (
                        <img 
                          src={responsableData.photo} 
                          alt="Profile" 
                          className="h-16 w-16 md:h-24 md:w-24 rounded-xl object-cover"
                        />
                      ) : (
                        <span className="text-2xl md:text-3xl font-bold text-blue-600">
                          {responsableData.nom.charAt(0)}
                        </span>
                      )}
                    </div>
                    {isEditing && (
                      <label className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-1.5 md:p-2 rounded-full cursor-pointer hover:bg-blue-700">
                        <Camera className="w-3 h-3 md:w-4 md:h-4" />
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
                    <h3 className="text-lg md:text-xl font-bold text-gray-900">{responsableData.nom}</h3>
                    <p className="text-gray-600">Responsable</p>
                    <p className="text-sm text-gray-500">{responsableData.direction}</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base"
                >
                  {isEditing ? 'Annuler' : 'Modifier'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    value={responsableData.nom}
                    onChange={(e) => handleProfileChange('nom', e.target.value)}
                    disabled={!isEditing}
                    className={`w-full border rounded-lg px-4 py-2.5 md:py-3 text-sm md:text-base ${
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
                    value={responsableData.email}
                    onChange={(e) => handleProfileChange('email', e.target.value)}
                    disabled={!isEditing}
                    className={`w-full border rounded-lg px-4 py-2.5 md:py-3 text-sm md:text-base ${
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
                    value={responsableData.telephone}
                    onChange={(e) => handleProfileChange('telephone', e.target.value)}
                    disabled={!isEditing}
                    className={`w-full border rounded-lg px-4 py-2.5 md:py-3 text-sm md:text-base ${
                      isEditing 
                        ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Direction
                  </label>
                  <input
                    type="text"
                    value={responsableData.direction}
                    disabled
                    className="w-full border border-gray-200 bg-gray-50 rounded-lg px-4 py-2.5 md:py-3 text-sm md:text-base"
                  />
                </div>
              </div>

              {/* Signature numérique */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Signature numérique</h4>
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1">
                    {responsableData.signature ? (
                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-green-600" />
                            <div>
                              <div className="font-medium text-green-900">
                                Signature téléchargée
                              </div>
                              <div className="text-sm text-green-700">
                                Format: PNG • 500x200px
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => handleProfileChange('signature', null)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 md:p-8 text-center">
                        <FileText className="w-8 h-8 md:w-12 md:h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-600 mb-2">Aucune signature numérique</p>
                        <p className="text-sm text-gray-500 mb-4">
                          PNG, JPG (recommandé: 500x200px)
                        </p>
                        <label className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer text-sm">
                          Télécharger signature
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleUploadSignature}
                            className="hidden"
                          />
                        </label>
                      </div>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 md:w-1/3">
                    <p className="font-medium mb-2">À propos de la signature</p>
                    <p>Votre signature sera utilisée pour valider les documents officiels et les positions des agents.</p>
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
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
                        Enregistrer
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Informations complémentaires */}
            <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Informations professionnelles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">Date de nomination</div>
                  <div className="font-medium">{responsableData.dateNomination}</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">Statut</div>
                  <div className="font-medium text-green-600">Actif</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">Dernière connexion</div>
                  <div className="font-medium">15 Jan 2024, 14:30</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            {/* Changement de mot de passe */}
            <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
              <div className="flex items-center gap-3 mb-6">
                <Key className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg md:text-xl font-bold text-gray-900">Changer le mot de passe</h3>
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
                      className={`w-full border rounded-lg px-4 py-2.5 md:py-3 pr-10 text-sm md:text-base ${
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
                      {showCurrentPassword ? <EyeOff className="w-4 h-4 md:w-5 md:h-5" /> : <Eye className="w-4 h-4 md:w-5 md:h-5" />}
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
                      className={`w-full border rounded-lg px-4 py-2.5 md:py-3 pr-10 text-sm md:text-base ${
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
                      {showNewPassword ? <EyeOff className="w-4 h-4 md:w-5 md:h-5" /> : <Eye className="w-4 h-4 md:w-5 md:h-5" />}
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
                      className={`w-full border rounded-lg px-4 py-2.5 md:py-3 pr-10 text-sm md:text-base ${
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
                      {showConfirmPassword ? <EyeOff className="w-4 h-4 md:w-5 md:h-5" /> : <Eye className="w-4 h-4 md:w-5 md:h-5" />}
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
                  className="w-full md:w-auto px-6 py-2.5 md:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      Changement en cours...
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 md:w-5 md:h-5" />
                      Changer le mot de passe
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Connexions récentes */}
            <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Connexions récentes</h3>
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
            <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
              <div className="flex items-center gap-3 mb-6">
                <Bell className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg md:text-xl font-bold text-gray-900">Notifications</h3>
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

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Notifications urgentes</div>
                    <div className="text-sm text-gray-500">Notifications immédiates pour les urgences</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.notificationsUrgentes}
                      onChange={(e) => handlePreferencesChange('notificationsUrgentes', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Auto-validation</div>
                    <div className="text-sm text-gray-500">Validation automatique après un délai</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.autoValidation}
                      onChange={(e) => handlePreferencesChange('autoValidation', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Langue et région */}
            <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
              <div className="flex items-center gap-3 mb-6">
                <Globe className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg md:text-xl font-bold text-gray-900">Langue et région</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Langue
                  </label>
                  <select
                    value={preferences.language}
                    onChange={(e) => handlePreferencesChange('language', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 md:py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 md:py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Africa/Porto-Novo">Porto-Novo (GMT+1)</option>
                    <option value="Europe/Paris">Paris (GMT+1)</option>
                    <option value="America/New_York">New York (GMT-5)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Délai de validation (heures)
                  </label>
                  <select
                    value={preferences.delaiValidation}
                    onChange={(e) => handlePreferencesChange('delaiValidation', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 md:py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="24">24 heures</option>
                    <option value="48">48 heures</option>
                    <option value="72">72 heures</option>
                    <option value="168">1 semaine</option>
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

      case 'team':
        return (
          <div className="space-y-6">
            {/* Paramètres d'équipe */}
            <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg md:text-xl font-bold text-gray-900">Paramètres d'équipe</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Délai de déclaration (heures)
                  </label>
                  <p className="text-sm text-gray-600 mb-3">Délai minimum pour déclarer une position</p>
                  <select
                    value={teamSettings.delaiDeclaration}
                    onChange={(e) => handleTeamSettingsChange('delaiDeclaration', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 md:py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="24">24 heures à l'avance</option>
                    <option value="48">48 heures à l'avance</option>
                    <option value="72">72 heures à l'avance</option>
                    <option value="0">Aucun délai</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Heure de début
                    </label>
                    <input
                      type="time"
                      value={teamSettings.heureDebut}
                      onChange={(e) => handleTeamSettingsChange('heureDebut', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 md:py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Heure de fin
                    </label>
                    <input
                      type="time"
                      value={teamSettings.heureFin}
                      onChange={(e) => handleTeamSettingsChange('heureFin', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 md:py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Jours de travail
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'].map((jour) => (
                      <label key={jour} className="flex items-center gap-2 p-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={teamSettings.joursTravail.includes(jour)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              handleTeamSettingsChange('joursTravail', [...teamSettings.joursTravail, jour]);
                            } else {
                              handleTeamSettingsChange('joursTravail', teamSettings.joursTravail.filter(j => j !== jour));
                            }
                          }}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm">{jour}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Notification de retard</div>
                      <div className="text-sm text-gray-500">Notifier les déclarations en retard</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={teamSettings.notificationRetard}
                        onChange={(e) => handleTeamSettingsChange('notificationRetard', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Rappel de validation</div>
                      <div className="text-sm text-gray-500">Rappel pour les positions en attente</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={teamSettings.rappelValidation}
                        onChange={(e) => handleTeamSettingsChange('rappelValidation', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>

                <button className="w-full md:w-auto px-6 py-2.5 md:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Enregistrer les paramètres d'équipe
                </button>
              </div>
            </div>
          </div>
        );

      case 'export':
        return (
          <div className="space-y-6">
            {/* Options d'export */}
            <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
              <div className="flex items-center gap-3 mb-6">
                <Download className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg md:text-xl font-bold text-gray-900">Export des données</h3>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => handleExportData('agents')}
                    className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      <span className="font-medium">Liste des agents</span>
                    </div>
                    <p className="text-sm text-gray-600">Export complet de vos agents avec leurs statistiques</p>
                    <div className="flex gap-2 mt-3">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">PDF</span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">Excel</span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">CSV</span>
                    </div>
                  </button>

                  <button
                    onClick={() => handleExportData('positions')}
                    className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Calendar className="w-5 h-5 text-green-600" />
                      <span className="font-medium">Positions</span>
                    </div>
                    <p className="text-sm text-gray-600">Historique des positions avec filtres avancés</p>
                    <div className="flex gap-2 mt-3">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">PDF</span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">Excel</span>
                    </div>
                  </button>

                  <button
                    onClick={() => handleExportData('statistics')}
                    className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <BarChart3 className="w-5 h-5 text-orange-600" />
                      <span className="font-medium">Statistiques</span>
                    </div>
                    <p className="text-sm text-gray-600">Rapports statistiques détaillés de votre direction</p>
                    <div className="flex gap-2 mt-3">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">PDF</span>
                      <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded">PPT</span>
                    </div>
                  </button>

                  <button
                    onClick={() => handleExportData('validation')}
                    className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <CheckCircle className="w-5 h-5 text-purple-600" />
                      <span className="font-medium">Journal de validation</span>
                    </div>
                    <p className="text-sm text-gray-600">Historique complet de vos validations et rejets</p>
                    <div className="flex gap-2 mt-3">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">PDF</span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">CSV</span>
                    </div>
                  </button>
                </div>

                {/* Paramètres d'export */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-4">Paramètres d'export</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Période par défaut
                      </label>
                      <select className="w-full border border-gray-300 rounded-lg px-4 py-2.5 md:py-3">
                        <option>30 derniers jours</option>
                        <option>Ce mois</option>
                        <option>Ce trimestre</option>
                        <option>Cette année</option>
                        <option>Personnalisé</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Export automatique</div>
                        <div className="text-sm text-gray-500">Export mensuel automatique</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'session':
        return (
          <div className="space-y-6">
            {/* Déconnexion */}
            <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Sessions</h3>
              
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
            <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 border border-red-200">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-red-600" />
                <h3 className="text-lg md:text-xl font-bold text-gray-900">Zone dangereuse</h3>
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
            <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Informations système</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">Dernière connexion</div>
                  <div className="font-medium">15 Jan 2024, 14:30</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">Date de création</div>
                  <div className="font-medium">15 Mai 2022</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">Version</div>
                  <div className="font-medium">2.1.0</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">Sessions actives</div>
                  <div className="font-medium">2</div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header mobile */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50 lg:hidden">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="p-2"
              >
                {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Paramètres</h1>
                <p className="text-xs text-gray-600">Responsable</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {showMobileMenu && (
          <div className="border-t border-gray-200 px-4 py-3 bg-white">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setShowMobileMenu(false);
                    }}
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
          </div>
        )}
      </div>

      <div className="p-4 md:p-6 max-w-7xl mx-auto">
        {/* En-tête desktop */}
        <div className="hidden lg:block mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Paramètres du responsable</h1>
          <p className="text-gray-600 mt-2">Gérez vos informations personnelles, équipe et préférences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Navigation desktop */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-4 sticky top-6">
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

export default ParametresResponsable;