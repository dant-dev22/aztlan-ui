export const escapeCSVValue = (value) => `"${String(value).replace(/"/g, '""')}"`;

export const calculateAge = (birthDate) => {
  const birthDateObj = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birthDateObj.getFullYear();
  const month = today.getMonth();
  const day = today.getDate();

  if (month < birthDateObj.getMonth() || (month === birthDateObj.getMonth() && day < birthDateObj.getDate())) {
    age--;
  }

  return age;
};

export const timeToYears = (experience) => {
  const years = Math.floor(experience / 12); // cuántos años completos caben
  const months = experience % 12; // lo que sobra
  return `${years} años, ${months} meses`;
}; 
// Función para filtrar participantes según la cinta seleccionada
const filterParticipantsByBelt = (participants, filter) => {
  if (filter === "todos") {
    return participants;
  }
  return participants.filter(participant => participant.belt === filter);
};

// Función para filtrar participantes según el grupo de edad seleccionado
const filterParticipantsByAgeGroup = (participants, filter) => {
  if (filter === "todos") {
    return participants;
  }

  return participants.filter(participant => {
    const age = calculateAge(participant.birth_date);

    switch (filter) {
      case "inf-1":
        return age >= 6 && age <= 9;
      case "inf-2":
        return age >= 10 && age <= 12;
      case "ado":
        return age >= 13 && age <= 15;
      case "juve":
        return age >= 16 && age <= 17;
      case "adul":
        return age >= 18 && age <= 34;
      case "mast":
        return age >= 35;
      default:
        return true;
    }
  });
};


// Generar CSV con participantes filtrados por cinta
export const generateCSV = (participants, filter) => {
  const headers = "ID,Peso,Nombre,Tiempo entrenando,Cinta,Academia,Edad,Payment Complete";

  // Filtrar participantes según la cinta seleccionada
  const filteredParticipants = filterParticipantsByAgeGroup(participants, filter);

  return [
    headers,
    ...filteredParticipants.map(participant =>
      [
        participant.aztlan_id,
        participant.weight,
        participant.name,
        participant.experience,        // Mantener "Tiempo entrenando" si es lo que representa category
        participant.belt,            // Columna "Cinta"
        participant.academy,
        `${calculateAge(participant.birth_date)} años`,
        participant.is_payment_complete,
      ].map(escapeCSVValue).join(',')
    )
  ].join('\n');
};

// Descargar CSV en el navegador
export const downloadCSV = (filename, csvContent) => {
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
};