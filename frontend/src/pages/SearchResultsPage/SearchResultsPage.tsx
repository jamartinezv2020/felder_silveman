import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchResult, search } from '../../services/searchService';
import { Container, Typography, List, ListItem, ListItemText, Button, Box, Paper } from '@mui/material';

const SearchResultsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const searchResults = await search(query);
        setResults(searchResults);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  const handleToggle = () => {
    setShowResults(!showResults);
  };

  return (
    <Container maxWidth="lg">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Resultados de búsqueda para "{query}"
        </Typography>
        <Button variant="contained" color="primary" onClick={handleToggle} sx={{ mt: 2, mb: 3 }}>
          {showResults ? 'Ocultar Resultados' : 'Mostrar Resultados'}
        </Button>
        {showResults && (
          <Paper elevation={3} sx={{ p: 3 }}>
            <List>
              {results.map((result) => (
                <ListItem key={result._id}>
                  <ListItemText primary={result.title} secondary={result.description} />
                </ListItem>
              ))}
            </List>
          </Paper>
        )}
      </Box>
    </Container>
  );
};

export default SearchResultsPage;







