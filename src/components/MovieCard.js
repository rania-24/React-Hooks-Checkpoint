import React from 'react';


const MovieCard = ({ movie, onDelete }) => {
  return (
    <div className="border rounded-lg shadow-md p-4 w-64 m-2 bg-white">
      <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
      <img 
        src={movie.posterURL} 
        alt={movie.title} 
        className="w-full h-80 object-cover rounded-md mb-2" 
      />
      <p className="text-gray-600 mb-2">{movie.description}</p>
     
      <button 
        className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors"
        onClick={() => onDelete(movie.id)}
      >
        Supprimer
      </button>
    </div>
  );
};

export default MovieCard;
