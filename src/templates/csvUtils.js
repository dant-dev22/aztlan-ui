import { getCategory } from "../utils/participantsUtils";

export const escapeCSVValue = (value) => `"${String(value).replace(/"/g, '""')}"`;

// Función para calcular la edad
const calculateAge = (birthDate) => {
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};

// Función para filtrar participantes según la categoría seleccionada
const filterParticipantsByCategory = (participants, filter) => {
  if (filter === "todos") {
   return participants; 
  }
  return participants.filter(participant => {
    const age = calculateAge(participant.birth_date);
    const category = participant.category;

    switch (filter) {
      case "juveniles":
        return age < 18;
      case "principiantes":
        return age >= 18 && age < 35 && category <= 2;
      case "intermedios":
        return age >= 18 && age < 35 && category > 2 && category <= 4;
      case "avanzados":
        return age >= 18 && age < 35 && category > 4;
      case "masters":
        return age >= 35;
      default:
        return true; // Sin filtro
    }
  });
};

export const generateCSV = (participants, filter) => {
  const headers = "ID,Weight,Name,Tiempo entrenando,Categoría,Academia,Edad,Aztlan ID,Payment Complete";

  // Filtrar participantes según la categoría seleccionada
  const filteredParticipants = filterParticipantsByCategory(participants, filter);

  return [
    headers,
    ...filteredParticipants.map(participant =>
      [
        participant.id,
        participant.weight,
        participant.name,
        participant.category,
        getCategory(participant.category),
        participant.academy,
        `${calculateAge(participant.birth_date)} años`,
        participant.aztlan_id,
        participant.is_payment_complete,
      ].map(escapeCSVValue).join(',')
    )
  ].join('\n');
};

export const downloadCSV = (filename, csvContent) => {
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
};