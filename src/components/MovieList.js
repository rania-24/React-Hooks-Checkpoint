import React, { useState } from 'react';
import MovieCard from './MovieCard';
const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    posterURL: '',
    rating: 1
  });
  const [titleFilter, setTitleFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMovie(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value
    }));
  };

  const addMovie = () => {
    if (newMovie.title && newMovie.description && newMovie.posterURL) {
      setMovies(prev => [
        ...prev, 
        { ...newMovie, id: Date.now() }
      ]);
      // Réinitialiser le formulaire
      setNewMovie({
        title: '',
        description: '',
        posterURL: '',
        rating: 1
      });
    }
  };

  const deleteMovie = (id) => {
    setMovies(prev => prev.filter(movie => movie.id !== id));
  };

  const filteredMovies = movies.filter(movie => 
    movie.title.toLowerCase().includes(titleFilter.toLowerCase()) && 
    movie.rating >= ratingFilter
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Bibliothèque de Films</h1>
      
      {/* Formulaire d'ajout de film */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <input 
          name="title"
          placeholder="Titre du film" 
          value={newMovie.title}
          onChange={handleInputChange}
          className="border rounded-md p-2"
        />
        <input 
          name="description"
          placeholder="Description" 
          value={newMovie.description}
          onChange={handleInputChange}
          className="border rounded-md p-2"
        />
        <input 
          name="posterURL"
          placeholder="URL de l'affiche" 
          value={newMovie.posterURL}
          onChange={handleInputChange}
          className="border rounded-md p-2"
        />
        <input 
          name="rating"
          type="number"
          min="1"
          max="5"
          placeholder="Note (1-5)" 
          value={newMovie.rating}
          onChange={handleInputChange}
          className="border rounded-md p-2"
        />
        <button 
          onClick={addMovie}
          className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Ajouter un Film
        </button>
      </div>

      {/* Filtres */}
      <div className="flex mb-6 space-x-4">
        <input 
          placeholder="Filtrer par titre" 
          value={titleFilter}
          onChange={(e) => setTitleFilter(e.target.value)}
          className="border rounded-md p-2 flex-1"
        />
        <input 
          type="number"
          min="1"
          max="5"
          placeholder="Note minimale" 
          value={ratingFilter}
          onChange={(e) => setRatingFilter(parseInt(e.target.value) || 0)}
          className="border rounded-md p-2 w-32"
        />
      </div>

      {/* Liste de films */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredMovies.map(movie => (
          <MovieCard 
            key={movie.id} 
            movie={movie} 
            onDelete={deleteMovie} 
          />
        ))}
      </div>
    </div>
  );
};

export default MovieList;