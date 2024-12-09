import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateField, resetForm } from "../features/formSlice";
import RegistrationForm from "./RegistrationForm";

const Form = ({ onBack }) => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form.formData);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateField({ name, value }));
  };

  const validateForm = () => {
    const errors = {};
  
    if (!formData.name || formData.name.trim().length < 2) {
      errors.name = "El nombre debe tener al menos 2 caracteres.";
    }
  
    if (!formData.birth_date) {
      errors.birth_date = "La fecha de nacimiento es obligatoria.";
    }
  
    if (!formData.weight || formData.weight <= 0) {
      errors.weight = "El peso debe ser un número positivo.";
    }
  
    if (!formData.academy || formData.academy.trim().length === 0) {
      errors.academy = "El campo de academia es obligatorio.";
    }
  
    if (!formData.height || formData.height <= 0) {
      errors.height = "La estatura debe ser un número positivo.";
    }
  
    if (!formData.category || formData.category.trim().length === 0) {
      errors.category = "El campo de categoría es obligatorio.";
    }
  
    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    try {
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
        }),
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