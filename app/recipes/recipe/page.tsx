"use client"
import React, { useState , useEffect , useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Recipe } from "@/interface/Recipe";
import { Box , CircularProgress, Modal , Fade , Typography } from "@mui/material";
import Image from "next/image";

export default function Page() {

    const [recipes,setRecipes] = useState<Recipe[]>([]);
    const [foundRecipe,setFoundRecipe] = useState<Recipe>();
    const [loading,setLoading] = useState<boolean>(false);
    const [error,setError] = useState<any>();
    const [imageOpen,setImageOpen] = useState<boolean>(false);

    const search_params = useSearchParams();
    const recipe_id = search_params.get("recipe_id");

    const GetRecipes = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch("/api/recipes/all");
            const data_recipes = await response.json();
            setRecipes(data_recipes);            
        } catch (err : any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    } , [])

    useEffect(() => {
        GetRecipes();
    } , [GetRecipes])

    useEffect(() => {
        const found_recipe = recipes.find((recipe : Recipe) => Number(recipe.recipe_id) == Number(recipe_id));
        setFoundRecipe(found_recipe);
    } , [recipes,recipe_id])

    if(loading) {
        return <Box sx={{
            position : "absolute",
            left : "50%",
            top : "50%",
            transform : "translate(-50%,-50%)"
        }}>
            <CircularProgress color="warning" />
        </Box>
    }

    if(error) {
        return <Box sx={{
            position : "absolute",
            left : "50%",
            top : ""
        }}></Box>
    }
    return (
        <Box
            sx={{
                width: "100%",
                height: "100vh",
                background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                borderRadius: "10px"
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    height: "100%",
                    flexWrap: "wrap",
                }}
            >
                <Typography
                    variant="h2"
                    sx={{
                        width: "45%",
                        height: "80%",
                        backgroundColor: "black",
                        borderRadius: "10px",
                        color: "#fff",
                        margin: "10px",
                    }}
                >
                    {foundRecipe?.recipe_name}
                </Typography>
    
                {foundRecipe?.photo && (
                    
                    <Box>
                        <Image
                        style={{
                            margin: "10px",
                            width: "100vh",
                            height: "80%",
                            borderRadius: "10px",
                        }}
                        src={foundRecipe.photo ? foundRecipe.photo : "data:image/jpeg;base64,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"}
                        onClick={() => setImageOpen(true)}
                        alt="Recipe Photo"
                        width={250}
                        height={250}
                    />
                    <Modal open={imageOpen} closeAfterTransition onClose={() => setImageOpen(false)}>
                        <Box>
                            <Fade in={imageOpen}>
                                <Image
                                    style={{
                                        margin: "10px",
                                        width: "100vh",
                                        position : "absolute",
                                        top : "50%",
                                        left : "50%",
                                        transform : "translate(-50%,-50%)",
                                        height: "80%",
                                        borderRadius: "10px",
                                    }}
                                    width={450}
                                    height={350}
                                    src={foundRecipe.photo ? foundRecipe.photo : "data:image/jpeg;base64,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"}
                                    alt="Recipe Photo"
                                />                                
                            </Fade>
                        </Box>
                    </Modal>
                    </Box>
                    
                )}
            </Box>
        </Box>
    );
    
}