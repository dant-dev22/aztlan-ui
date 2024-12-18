export const escapeCSVValue = (value) => `"${String(value).replace(/"/g, '""')}"`;

export const generateCSV = (participants) => {
  const headers = "ID,Weight,Name,Años entrenando,Academy,Birth Date,Aztlan ID,Payment Complete";
  return [
    headers,
    ...participants.map(participant =>
      [
        participant.id,
        participant.weight,
        participant.name,
        participant.category,
        participant.academy,
        participant.birth_date,
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