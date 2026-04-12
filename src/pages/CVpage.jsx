import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CVPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      {/* Bouton Revenir */}
      <div className="w-full max-w-4xl mb-4">
        <button
          onClick={() => navigate("/")}
          className="
            px-4 py-2 
            bg-[var(--primary-color)] text-black 
            hover:bg-[var(--primary-color)]/80 
            transition-all duration-200
            rounded-lg
            flex items-center gap-2
            font-medium
          "
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Retour à l'accueil
        </button>
      </div>

      {/* Conteneur PDF avec loader */}
      <div className="w-full max-w-4xl bg-gray-800 rounded-xl overflow-hidden shadow-2xl relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 z-10">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-[var(--primary-color)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-400">Chargement du CV...</p>
            </div>
          </div>
        )}
        <iframe
          src="/CV.pdf#toolbar=0&navpanes=0&scrollbar=1&view=FitH"
          title="CV - Christian"
          className="w-full h-[85vh]"
          style={{ border: "none" }}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            console.log("Erreur de chargement");
          }}
        />
      </div>
      
      {/* Lien de téléchargement alternatif */}
      <div className="w-full max-w-4xl mt-4 text-center">
        <p className="text-gray-400 text-sm">
          Problème d'affichage ? 
          <a 
            href="/CV.pdf" 
            download
            className="text-[var(--primary-color)] hover:underline ml-1"
          >
            Télécharger le CV
          </a>
        </p>
      </div>
    </div>
  );
};

export default CVPage;