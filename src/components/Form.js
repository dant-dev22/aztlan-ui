import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateField, resetForm } from "../features/formSlice";
import RegistrationForm from "./RegistrationForm";
// Función para manejar el envío del formulario
const Form = ({ onBack }) => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form.formData); // Datos del formulario desde Redux

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateField({ name, value }));
  };

  const validateForm = () => {
    if (!formData.name || !formData.birth_date || !formData.weight || !formData.academy || !formData.height || !formData.category) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    try {
      // Enviar los datos del formulario a la API
      const response = await fetch("http://localhost:8000/participants/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          birth_date: formData.birth_date,
          weight: formData.weight,
          academy: formData.academy,
          height: formData.height,
          category: formData.category,
        }), // Enviar los datos del formulario como JSON
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Formulario enviado con éxito:", data); // Ver respuesta
        dispatch(resetForm()); // Reseteamos el formulario después de enviar
        setSuccess(true); // Mostrar mensaje de éxito
        setError(null); // Limpiar el error si hay éxito
      } else {
        setError("Error al enviar los datos, inténtalo de nuevo.");
      }
    } catch (error) {
      setError("Error al enviar los datos, inténtalo de nuevo.");
      console.error("Error al enviar los datos:", error);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif", textAlign: "center" }}>
      <RegistrationForm
        formData={formData}
        handleChange={handleChange}
        error={error}
        success={success}
        handleSubmit={handleSubmit}
        onBack={onBack}>
      </RegistrationForm> 
    </div> 
  );
};

export default Form;