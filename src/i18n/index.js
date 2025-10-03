import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Navigation
      "dashboard": "Dashboard",
      "profile": "Profile",
      "memberOrientation": "Member Orientation Training",
      "mandateTraining": "Mandate Training",
      "leadershipTraining": "Leadership Training",
      "downloadCertificates": "Download Certificates",
      "certificateVerification": "Certificate Verification",
      "liveStreaming": "Live Streaming",
      "membersDirectory": "Members Directory",
      "donorsHub": "Donors Hub",
      "events": "Events",
      "resources": "Resources & Publications",
      "cfnGroupTracker": "CFN Group Tracker",
      "aiChat": "AI Apostle",
      
      // Common
      "welcome": "Welcome back!",
      "continueTraining": "Continue Training",
      "findCFN": "Find a CFN",
      "give": "Give",
      "trainingProgress": "Training Progress",
      "upcomingMeetings": "Upcoming Meetings",
      "recommendedForYou": "Recommended for You",
      "search": "Search",
      "searchAddress": "Search by address...",
      "selectGroup": "Select Group",
      "groupDetails": "Group Details",
      "loading": "Loading...",
      "noResults": "No results found",
      "certificateNumber": "Certificate Number",
      "verificationResult": "Verification Result",
      "certificateValid": "Certificate Valid",
      "certificateInvalid": "Certificate Invalid",
      "holderName": "Holder Name",
      "courseName": "Course Name",
      "issueDate": "Issue Date",
      "verifying": "Verifying...",
      "verifyCertificate": "Verify Certificate",
      "enterCertificateNumber": "Enter certificate number (e.g., CERT-2024-001)",
      "enterCertificateDesc": "Enter a certificate number to verify its authenticity.",
      "certificateNotFound": "Certificate number not found in database.",
      
      // AI Chat
      "chatWithAI": "Chat with AI Apostle",
      "typeMessage": "Type your message...",
      "send": "Send",
      "aiAssistant": "AI Apostle",
      
      // CFN Group Tracker
      "cfnGroupTrackerTitle": "CFN Group Tracker",
      "cfnGroupTrackerDesc": "Find CFN groups in your area",
      "enterAddress": "Enter an address to find nearby CFN groups",
      "groupName": "Group Name",
      "address": "Address",
      "meetingTime": "Meeting Time",
      "contact": "Contact",
      "members": "Members",
      "description": "Description"
    }
  },
  es: {
    translation: {
      // Navigation
      "dashboard": "Panel de Control",
      "profile": "Perfil",
      "memberOrientation": "Entrenamiento de Orientación de Miembros",
      "mandateTraining": "Entrenamiento de Mandato",
      "leadershipTraining": "Entrenamiento de Liderazgo",
      "downloadCertificates": "Descargar Certificados",
      "certificateVerification": "Verificación de Certificados",
      "liveStreaming": "Transmisión en Vivo",
      "membersDirectory": "Directorio de Miembros",
      "donorsHub": "Centro de Donantes",
      "events": "Eventos",
      "resources": "Recursos y Publicaciones",
      "cfnGroupTracker": "Rastreador de Grupos CFN",
      "aiChat": "Apóstol IA",
      
      // Common
      "welcome": "¡Bienvenido de vuelta!",
      "continueTraining": "Continuar Entrenamiento",
      "findCFN": "Encontrar un CFN",
      "give": "Dar",
      "trainingProgress": "Progreso del Entrenamiento",
      "upcomingMeetings": "Próximas Reuniones",
      "recommendedForYou": "Recomendado para Ti",
      "search": "Buscar",
      "searchAddress": "Buscar por dirección...",
      "selectGroup": "Seleccionar Grupo",
      "groupDetails": "Detalles del Grupo",
      "loading": "Cargando...",
      "noResults": "No se encontraron resultados",
      "certificateNumber": "Número de Certificado",
      "verificationResult": "Resultado de Verificación",
      "certificateValid": "Certificado Válido",
      "certificateInvalid": "Certificado Inválido",
      "holderName": "Nombre del Titular",
      "courseName": "Nombre del Curso",
      "issueDate": "Fecha de Emisión",
      "verifying": "Verificando...",
      "verifyCertificate": "Verificar Certificado",
      "enterCertificateNumber": "Ingrese el número de certificado (ej. CERT-2024-001)",
      "enterCertificateDesc": "Ingrese un número de certificado para verificar su autenticidad.",
      "certificateNotFound": "Número de certificado no encontrado en la base de datos.",
      
      // AI Chat
      "chatWithAI": "Chatear con Apóstol IA",
      "typeMessage": "Escribe tu mensaje...",
      "send": "Enviar",
      "aiAssistant": "Apóstol IA",
      
      // CFN Group Tracker
      "cfnGroupTrackerTitle": "Rastreador de Grupos CFN",
      "cfnGroupTrackerDesc": "Encuentra grupos CFN en tu área",
      "enterAddress": "Ingresa una dirección para encontrar grupos CFN cercanos",
      "groupName": "Nombre del Grupo",
      "address": "Dirección",
      "meetingTime": "Hora de Reunión",
      "contact": "Contacto",
      "members": "Miembros",
      "description": "Descripción"
    }
  },
  fr: {
    translation: {
      // Navigation
      "dashboard": "Tableau de Bord",
      "profile": "Profil",
      "memberOrientation": "Formation d'Orientation des Membres",
      "mandateTraining": "Formation de Mandat",
      "leadershipTraining": "Formation de Leadership",
      "downloadCertificates": "Télécharger les Certificats",
      "certificateVerification": "Vérification des Certificats",
      "liveStreaming": "Diffusion en Direct",
      "membersDirectory": "Annuaire des Membres",
      "donorsHub": "Centre des Donateurs",
      "events": "Événements",
      "resources": "Ressources et Publications",
      "cfnGroupTracker": "Suivi des Groupes CFN",
      "aiChat": "Apôtre IA",
      
      // Common
      "welcome": "Bon retour !",
      "continueTraining": "Continuer la Formation",
      "findCFN": "Trouver un CFN",
      "give": "Donner",
      "trainingProgress": "Progrès de la Formation",
      "upcomingMeetings": "Réunions à Venir",
      "recommendedForYou": "Recommandé pour Vous",
      "search": "Rechercher",
      "searchAddress": "Rechercher par adresse...",
      "selectGroup": "Sélectionner un Groupe",
      "groupDetails": "Détails du Groupe",
      "loading": "Chargement...",
      "noResults": "Aucun résultat trouvé",
      "certificateNumber": "Numéro de Certificat",
      "verificationResult": "Résultat de Vérification",
      "certificateValid": "Certificat Valide",
      "certificateInvalid": "Certificat Invalide",
      "holderName": "Nom du Titulaire",
      "courseName": "Nom du Cours",
      "issueDate": "Date d'Émission",
      "verifying": "Vérification...",
      "verifyCertificate": "Vérifier le Certificat",
      "enterCertificateNumber": "Entrez le numéro de certificat (ex. CERT-2024-001)",
      "enterCertificateDesc": "Entrez un numéro de certificat pour vérifier son authenticité.",
      "certificateNotFound": "Numéro de certificat introuvable dans la base de données.",
      
      // AI Chat
      "chatWithAI": "Chatter avec l'Apôtre IA",
      "typeMessage": "Tapez votre message...",
      "send": "Envoyer",
      "aiAssistant": "Apôtre IA",
      
      // CFN Group Tracker
      "cfnGroupTrackerTitle": "Suivi des Groupes CFN",
      "cfnGroupTrackerDesc": "Trouvez des groupes CFN dans votre région",
      "enterAddress": "Entrez une adresse pour trouver des groupes CFN à proximité",
      "groupName": "Nom du Groupe",
      "address": "Adresse",
      "meetingTime": "Heure de Réunion",
      "contact": "Contact",
      "members": "Membres",
      "description": "Description"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;