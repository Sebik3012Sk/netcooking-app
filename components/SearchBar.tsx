import { Recipe } from "@/interface/Recipe";
import { Autocomplete, TextField, Button, Box, Typography } from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";

export default function SearchBar() {
  const [searchText, setSearchText] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<any>();
  const [recipeStatus,setRecipeStatus] = useState<string>("");

  const url = "/api/recipes/all";

  const GetRecipes = useCallback(async () => {
    try {
      const response = await fetch(url);
      const recipes = await response.json();
      setRecipes(recipes);
    } catch (err: any) {
      setError(err.message);
    }
  }, []);

  if (error) {
    return (
      <Box
        sx={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <Typography variant="h2" color="warning">
          {error}
        </Typography>
      </Box>
    );
  }

  const handleSearch = () => {
    try {
        const filter_recipe = recipes.find((recipe: Recipe) => recipe.recipe_name === searchText);
        if (filter_recipe) {
          location.assign(`/recipes/recipe?recipe_id=${filter_recipe.recipe_id}`);
        } else {
          setRecipeStatus("Recept Nenalezen");
        }
    } catch (err : any) {
        setRecipeStatus(err.message);
    }

  };

  useEffect(() => {
    GetRecipes();
  }, [GetRecipes]);

  return (
    <Box sx={{ backgroundColor: "#121212", padding: "20px", borderRadius: "8px" }}>
      <Typography variant="h4" color="warning" sx={{ marginBottom: "16px" }}>
        Vyhledávání receptů
      </Typography>
      <Autocomplete
        freeSolo
        options={recipes.map((recipe) => recipe.recipe_name)} 
        onInputChange={(event, value) => setSearchText(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            fullWidth
            helperText="Zadejte název receptu"
            InputProps={{
              ...params.InputProps,
              style: {
                color: "#ffffff", 
                backgroundColor: "#333333", 
              },
            }}
            FormHelperTextProps={{
              sx: {
                color: "#b3b3b3", 
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#444444", 
                },
                "&:hover fieldset": {
                  borderColor: "#ffffff", 
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#ff9800", 
                },
              },
            }}
          />
        )}
      />
      <Button
        variant="contained"
        color="warning"
        onClick={handleSearch}
        sx={{
          marginTop: "16px",
          color: "#000000",
          backgroundColor: "#ff9800",
          "&:hover": {
            backgroundColor: "#ffb74d",
          },
        }}
      >
        Hledat
      </Button>
      {recipeStatus != "" && (
        <Typography variant="body1" color="warning">{recipeStatus}</Typography>
      )}
    </Box>
  );
}
