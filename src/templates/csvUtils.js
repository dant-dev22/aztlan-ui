export const escapeCSVValue = (value) => `"${String(value).replace(/"/g, '""')}"`;

export const generateCSV = (participants) => {
  const headers = "ID,Weight,Name,Años entrenando,Academia,Edad,Aztlan ID,Payment Complete";

  // Función para calcular la edad desde birth_date
  const calculateAge = (birthDate) => {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return `${age} años`;
  };

  // Filtrar participantes repetidos
  const filteredParticipants = participants.reduce((acc, participant) => {
    const existingParticipantIndex = acc.findIndex(p =>
      p.name === participant.name && p.academy === participant.academy);

    if (existingParticipantIndex === -1) {
      // Si no existe, agregar al array
      acc.push(participant);
    } else {
      // Si existe, comparar si tiene is_payment_complete
      const existingParticipant = acc[existingParticipantIndex];
      if (participant.is_payment_complete && !existingParticipant.is_payment_complete) {
        // Si el participante actual tiene is_payment_complete y el existente no, reemplazar
        acc[existingParticipantIndex] = participant;
      } 
    }
    return acc;
  }, []);

  return [
    headers,
    ...filteredParticipants.map(participant =>
      [
        participant.id,
        participant.weight,
        participant.name,
        participant.category,
        participant.academy,
        calculateAge(participant.birth_date), // Convertir birth_date a edad
        participant.aztlan_id,
        participant.is_payment_complete
      ].map(escapeCSVValue).join(',')
    )
  ].join('\n');
};

// Función para descargar un archivo CSV
export const downloadCSV = (filename, csvContent) => {
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
};