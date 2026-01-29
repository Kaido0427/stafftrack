import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft,
  Save,
  Clock,
  Calendar,
  MapPin,
  FileText,
  AlertCircle,
  CheckCircle,
  XCircle,
  Upload,
  Trash2,
  Plus,
  Minus,
  Info,
  Building,
  User
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AgentPosition = ({ isEdit = false, positionId = null }) => {
  const [formData, setFormData] = useState({
    type: 'mission',
    motif: '',
    lieu: '',
    dateDebut: '',
    dateFin: '',
    heureDebut: '08:00',
    heureFin: '17:00',
    commentaire: '',
    justificatif: null,
    isRecurring: false,
    recurrencePattern: '',
    days: []
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [availableTypes, setAvailableTypes] = useState([
    { value: 'mission', label: 'Mission', description: 'Déplacement professionnel', icon: '📍' },
    { value: 'teletravail', label: 'Télétravail', description: 'Travail à distance', icon: '🏠' },
    { value: 'conge', label: 'Congé', description: 'Absence autorisée', icon: '🏖️' },
    { value: 'formation', label: 'Formation', description: 'Formation professionnelle', icon: '🎓' },
    { value: 'maladie', label: 'Maladie', description: 'Absence maladie', icon: '🏥' },
    { value: 'reunion', label: 'Réunion', description: 'Réunion professionnelle', icon: '👥' },
    { value: 'autre', label: 'Autre', description: 'Autre type de position', icon: '📝' }
  ]);

  const [agentInfo, setAgentInfo] = useState({
    nom: 'Lorent Marcos',
    matricule: '358RTX5RJ',
    direction: 'Direction Commerciale',
    responsable: 'Paul Durand'
  });

  // Charger les données si en mode édition
  useEffect(() => {
    if (isEdit && positionId) {
      // Simuler le chargement d'une position existante
      setTimeout(() => {
        setFormData({
          type: 'mission',
          motif: 'Visite client ABC Corp',
          lieu: 'Siège client - Godomey',
          dateDebut: '2024-01-20',
          dateFin: '2024-01-20',
          heureDebut: '09:00',
          heureFin: '17:00',
          commentaire: 'Visite pour présentation des nouveaux produits et discussion contrat.',
          justificatif: null,
          isRecurring: false,
          recurrencePattern: '',
          days: []
        });
      }, 500);
    } else {
      // Mode création - pré-remplir avec aujourd'hui
      const today = new Date().toISOString().split('T')[0];
      setFormData(prev => ({
        ...prev,
        dateDebut: today,
        dateFin: today
      }));
    }
  }, [isEdit, positionId]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      setFormData(prev => ({
        ...prev,
        justificatif: files[0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      
      // Effacer l'erreur quand l'utilisateur corrige
      if (errors[name]) {
        setErrors(prev => ({
          ...prev,
          [name]: ''
        }));
      }
    }
  };

  const handleToggleRecurring = () => {
    setFormData(prev => ({
      ...prev,
      isRecurring: !prev.isRecurring,
      dateFin: prev.isRecurring ? prev.dateDebut : ''
    }));
  };

  const handleAddDay = () => {
    setFormData(prev => ({
      ...prev,
      days: [...prev.days, { date: '', heureDebut: '08:00', heureFin: '17:00' }]
    }));
  };

  const handleRemoveDay = (index) => {
    setFormData(prev => ({
      ...prev,
      days: prev.days.filter((_, i) => i !== index)
    }));
  };

  const handleDayChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      days: prev.days.map((day, i) => 
        i === index ? { ...day, [field]: value } : day
      )
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.motif.trim()) {
      newErrors.motif = 'Le motif est requis';
    }

    if (!formData.lieu.trim()) {
      newErrors.lieu = 'Le lieu est requis';
    }

    if (!formData.dateDebut) {
      newErrors.dateDebut = 'La date de début est requise';
    }

    if (!formData.isRecurring && !formData.dateFin) {
      newErrors.dateFin = 'La date de fin est requise';
    }

    if (formData.dateFin && formData.dateDebut > formData.dateFin) {
      newErrors.dateFin = 'La date de fin doit être après la date de début';
    }

    if (formData.heureDebut >= formData.heureFin) {
      newErrors.heureFin = 'L\'heure de fin doit être après l\'heure de début';
    }

    // Vérifier les jours supplémentaires pour les positions récurrentes
    if (formData.days.some(day => !day.date)) {
      newErrors.days = 'Tous les jours doivent avoir une date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simuler l'envoi des données
    setTimeout(() => {
      console.log('Données soumises:', formData);
      alert(isEdit ? 'Position mise à jour avec succès !' : 'Position créée avec succès !');
      setIsSubmitting(false);
      // Redirection vers la liste des positions
      // window.location.href = '/agent/positions';
    }, 1500);
  };

  const handleDeleteJustificatif = () => {
    setFormData(prev => ({
      ...prev,
      justificatif: null
    }));
  };

  const calculateDuration = () => {
    if (!formData.dateDebut || !formData.dateFin) return '';

    const start = new Date(formData.dateDebut);
    const end = new Date(formData.dateFin);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    if (diffDays === 1) {
      return '1 jour';
    } else {
      return `${diffDays} jours`;
    }
  };

  const TypeCard = ({ type }) => {
    const typeInfo = availableTypes.find(t => t.value === type);
    
    return (
      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
        <span className="text-2xl">{typeInfo?.icon}</span>
        <div>
          <div className="font-medium">{typeInfo?.label}</div>
          <div className="text-sm text-gray-600">{typeInfo?.description}</div>
        </div>
      </div>
    );
  };

  const PreviewCard = () => {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Aperçu de la position</h3>
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TypeCard type={formData.type} />
              </div>
              <h4 className="text-lg font-medium text-gray-900">{formData.motif}</h4>
            </div>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
              En attente
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Direction:</span>
              <span className="text-sm font-medium">{agentInfo.direction}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Responsable:</span>
              <span className="text-sm font-medium">{agentInfo.responsable}</span>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="font-medium">Période</span>
            </div>
            <div className="text-sm text-gray-700">
              {formData.dateDebut} {formData.dateFin !== formData.dateDebut && `au ${formData.dateFin}`}
              <span className="ml-2 text-gray-500">({calculateDuration()})</span>
            </div>
            <div className="text-sm text-gray-600 mt-1">
              {formData.heureDebut} - {formData.heureFin}
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="font-medium">Lieu</span>
            </div>
            <div className="text-sm text-gray-700">{formData.lieu}</div>
          </div>

          {formData.commentaire && (
            <div className="border-t pt-4">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-gray-400" />
                <span className="font-medium">Commentaire</span>
              </div>
              <div className="text-sm text-gray-700">{formData.commentaire}</div>
            </div>
          )}

          {formData.justificatif && (
            <div className="border-t pt-4">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-gray-400" />
                <span className="font-medium">Justificatif</span>
              </div>
              <div className="text-sm text-gray-700">{formData.justificatif.name}</div>
            </div>
          )}

          {formData.isRecurring && formData.days.length > 0 && (
            <div className="border-t pt-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="font-medium">Jours spécifiques</span>
              </div>
              <div className="space-y-1">
                {formData.days.map((day, index) => (
                  <div key={index} className="text-sm text-gray-700">
                    {day.date} : {day.heureDebut} - {day.heureFin}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* En-tête */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link
              to="/agent/positions"
              className="p-2 hover:bg-white rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {isEdit ? 'Modifier une position' : 'Nouvelle position'}
              </h1>
              <p className="text-gray-600 mt-2">
                {isEdit 
                  ? 'Modifiez les informations de votre position' 
                  : 'Déclarez une nouvelle mission, congé, télétravail...'}
              </p>
            </div>
          </div>

          {/* Informations agent */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="font-medium text-gray-900">{agentInfo.nom}</div>
                <div className="text-sm text-gray-600">{agentInfo.matricule} • {agentInfo.direction}</div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Responsable:</span>
                  <span className="font-medium">{agentInfo.responsable}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPreview(!showPreview)}
                  className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  {showPreview ? 'Masquer aperçu' : 'Aperçu'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne gauche : Formulaire */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Type de position */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  1. Type de position
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {availableTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => handleChange({ target: { name: 'type', value: type.value } })}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        formData.type === type.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{type.icon}</span>
                        <div>
                          <div className="font-semibold text-gray-900">{type.label}</div>
                          <div className="text-sm text-gray-600 mt-1">{type.description}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Détails de la position */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  2. Détails de la position
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Motif <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="motif"
                      value={formData.motif}
                      onChange={handleChange}
                      className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.motif ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Ex: Visite client, Formation interne, Congé annuel..."
                    />
                    {errors.motif && (
                      <p className="text-red-500 text-sm mt-1">{errors.motif}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Lieu <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="lieu"
                      value={formData.lieu}
                      onChange={handleChange}
                      className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.lieu ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Ex: Siège social, Domicile, Client XYZ..."
                    />
                    {errors.lieu && (
                      <p className="text-red-500 text-sm mt-1">{errors.lieu}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Commentaire
                    </label>
                    <textarea
                      name="commentaire"
                      value={formData.commentaire}
                      onChange={handleChange}
                      rows="3"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Informations complémentaires..."
                    />
                  </div>
                </div>
              </div>

              {/* Période */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  3. Période
                </h2>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-4">
                    <button
                      type="button"
                      onClick={handleToggleRecurring}
                      className={`px-4 py-2 rounded-lg border ${
                        formData.isRecurring
                          ? 'bg-blue-100 text-blue-700 border-blue-300'
                          : 'bg-gray-100 text-gray-700 border-gray-300'
                      }`}
                    >
                      {formData.isRecurring ? 'Position récurrente' : 'Position ponctuelle'}
                    </button>
                    <div className="text-sm text-gray-600">
                      {formData.isRecurring 
                        ? 'Cette position se répète sur plusieurs jours' 
                        : 'Cette position concerne une période spécifique'}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date de début <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="dateDebut"
                        value={formData.dateDebut}
                        onChange={handleChange}
                        className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.dateDebut ? 'border-red-300' : 'border-gray-300'
                        }`}
                      />
                      {errors.dateDebut && (
                        <p className="text-red-500 text-sm mt-1">{errors.dateDebut}</p>
                      )}
                    </div>

                    {!formData.isRecurring && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date de fin <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          name="dateFin"
                          value={formData.dateFin}
                          onChange={handleChange}
                          className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            errors.dateFin ? 'border-red-300' : 'border-gray-300'
                          }`}
                          min={formData.dateDebut}
                        />
                        {errors.dateFin && (
                          <p className="text-red-500 text-sm mt-1">{errors.dateFin}</p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Heure de début
                      </label>
                      <input
                        type="time"
                        name="heureDebut"
                        value={formData.heureDebut}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Heure de fin
                      </label>
                      <input
                        type="time"
                        name="heureFin"
                        value={formData.heureFin}
                        onChange={handleChange}
                        className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.heureFin ? 'border-red-300' : 'border-gray-300'
                        }`}
                      />
                      {errors.heureFin && (
                        <p className="text-red-500 text-sm mt-1">{errors.heureFin}</p>
                      )}
                    </div>
                  </div>

                  {/* Calcul de la durée */}
                  {formData.dateDebut && formData.dateFin && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 text-blue-700">
                        <Info className="w-5 h-5" />
                        <span className="font-medium">Durée estimée : {calculateDuration()}</span>
                      </div>
                    </div>
                  )}

                  {/* Jours spécifiques pour positions récurrentes */}
                  {formData.isRecurring && (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Jours spécifiques
                        </label>
                        <button
                          type="button"
                          onClick={handleAddDay}
                          className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-lg hover:bg-blue-200"
                        >
                          <Plus className="w-4 h-4 inline mr-1" />
                          Ajouter un jour
                        </button>
                      </div>
                      
                      {formData.days.length === 0 ? (
                        <div className="text-center py-6 border-2 border-dashed border-gray-300 rounded-lg">
                          <Clock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-600">Aucun jour spécifique ajouté</p>
                          <p className="text-sm text-gray-500 mt-1">
                            Ajoutez des jours avec des horaires spécifiques
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {formData.days.map((day, index) => (
                            <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-1">
                                <div>
                                  <label className="block text-xs text-gray-600 mb-1">Date</label>
                                  <input
                                    type="date"
                                    value={day.date}
                                    onChange={(e) => handleDayChange(index, 'date', e.target.value)}
                                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs text-gray-600 mb-1">Début</label>
                                  <input
                                    type="time"
                                    value={day.heureDebut}
                                    onChange={(e) => handleDayChange(index, 'heureDebut', e.target.value)}
                                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs text-gray-600 mb-1">Fin</label>
                                  <input
                                    type="time"
                                    value={day.heureFin}
                                    onChange={(e) => handleDayChange(index, 'heureFin', e.target.value)}
                                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                                  />
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleRemoveDay(index)}
                                className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Justificatif */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  4. Justificatif (Optionnel)
                </h2>
                <div>
                  {formData.justificatif ? (
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-green-600" />
                          <div>
                            <div className="font-medium text-green-900">
                              {formData.justificatif.name}
                            </div>
                            <div className="text-sm text-green-700">
                              {(formData.justificatif.size / 1024).toFixed(2)} KB
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={handleDeleteJustificatif}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600 mb-2">Déposez votre justificatif ici</p>
                      <p className="text-sm text-gray-500 mb-4">
                        PDF, JPG, PNG (max. 5MB)
                      </p>
                      <label className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer">
                        Choisir un fichier
                        <input
                          type="file"
                          name="justificatif"
                          onChange={handleChange}
                          className="hidden"
                          accept=".pdf,.jpg,.jpeg,.png"
                        />
                      </label>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  <AlertCircle className="w-4 h-4 inline mr-1" />
                  Pour les congés maladie, un certificat médical est obligatoire.
                </p>
              </div>

              {/* Actions */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex flex-col sm:flex-row gap-4 justify-end">
                  <Link
                    to="/agent/positions"
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-center font-medium"
                  >
                    Annuler
                  </Link>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        {isEdit ? 'Mise à jour...' : 'Création...'}
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        {isEdit ? 'Mettre à jour' : 'Créer la position'}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Colonne droite : Aperçu */}
          <div className="lg:col-span-1">
            {showPreview && (
              <div className="sticky top-6">
                <PreviewCard />
                
                {/* Règles et conseils */}
                <div className="mt-6 bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    <Info className="w-5 h-5 inline mr-2" />
                    Règles importantes
                  </h3>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      Déclarez vos positions au moins 48h à l'avance
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      Pour les missions, précisez le lieu exact
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      Les congés maladie nécessitent un justificatif
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-500 mt-0.5" />
                      Vous ne pouvez pas modifier une position validée
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-500 mt-0.5" />
                      Les positions rejetées peuvent être corrigées
                    </li>
                  </ul>
                </div>

                {/* Contacts */}
                <div className="mt-6 bg-blue-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-4">
                    Besoin d'aide ?
                  </h3>
                  <p className="text-sm text-blue-700 mb-3">
                    Contactez votre responsable pour toute question :
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium">{agentInfo.responsable}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">{agentInfo.direction}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentPosition;