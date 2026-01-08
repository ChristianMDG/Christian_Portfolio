import React from "react";
import { useNavigate } from "react-router-dom";

const CVPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      {/* Bouton Revenir */}
      <div className="w-full max-w-4xl mb-4">
        <button
          onClick={() => navigate(-1)} // revient à la page précédente
          className="px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--primary-color)]/80 transition-colors"
        >
          ← Revenir
        </button>
      </div>

      {/* Conteneur PDF */}
      <div className="w-full max-w-4xl bg-gray-800 rounded-xl overflow-hidden shadow-2xl">
        <iframe
          src="/CV.pdf#view=fitH"
          title="CV Preview"
          className="w-full h-[90vh]"
          style={{ border: "none" }}
        />
      </div>
    </div>
  );
};

export default CVPage;
