export const escapeCSVValue = (value) => `"${String(value).replace(/"/g, '""')}"`;

export const generateCSV = (participants) => {
  const headers = "ID,Weight,Name,Tiempo entrenando,Categoría,Academia,Edad,Aztlan ID,Payment Complete";

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

  const getCategory = (category) => {
    if (category >= 0 && category <= 2) {
      return 'Principiante';
    } else if (category >= 3 && category <= 4) {
      return 'Intermedio';
    } else {
      return 'Experto';
    }
  };

  const filteredParticipants = participants.reduce((acc, participant) => {
    const existingParticipantIndex = acc.findIndex(p =>
      p.name === participant.name && p.academy === participant.academy);

    if (existingParticipantIndex === -1) {
      acc.push(participant);
    } else {
      const existingParticipant = acc[existingParticipantIndex];
      if (participant.is_payment_complete && !existingParticipant.is_payment_complete) {
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
        getCategory(participant.category), // Nuevo cálculo de categoría
        participant.academy,
        calculateAge(participant.birth_date),
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