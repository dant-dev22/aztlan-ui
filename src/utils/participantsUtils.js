// participantsUtils.js
export const fetchParticipants = async (API_URL, setLoading, setParticipants, setFilteredParticipants) => {
  setLoading(true);
  try {
    const response = await fetch(`${API_URL}/participants`);
    if (!response.ok) {
      throw new Error('Error al obtener los participantes');
    }

    const data = await response.json();
    setParticipants(data);
    setFilteredParticipants(data);
  } catch (error) {
    console.error('Error al obtener los participantes:', error);
  } finally {
    setLoading(false);
  }
};

export const handleSearchChange = (searchQuery, participants, setFilteredParticipants) => {
  if (searchQuery === "") {
    setFilteredParticipants(participants);
  } else {
    const filtered = participants.filter(participant =>
      participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      participant.academy.toLowerCase().includes(searchQuery.toLowerCase()) ||
      participant.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredParticipants(filtered);
  }
};

// Modificamos handleDownloadCSV para aceptar el filtro
export const handleDownloadCSV = (filteredParticipants, setLoading, generateCSV, downloadCSV, filter) => {
  setLoading(true);
  try {
    const csvContent = generateCSV(filteredParticipants, filter); // Pasamos el filtro a generateCSV
    const fileName = `participantes_${filter}.csv`;
    downloadCSV(fileName, csvContent);
  } catch (error) {
    console.error('Error al generar el archivo CSV:', error);
    alert('Hubo un problema al generar el archivo CSV. Por favor, inténtalo de nuevo.');
  } finally {
    setLoading(false);
  }
};

export const getCategory = (category) => {
  if (category >= 0 && category <= 2) {
    return 'Principiante';
  } else if (category > 2 && category <= 4) {
    return 'Intermedio';
  } else if (category > 4) {
    return 'Experto';
  } else {
    return 'Desconocido';
  }
};