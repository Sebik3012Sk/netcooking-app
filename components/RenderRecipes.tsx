"use client"
import { useState , useEffect , useCallback } from "react";
import { usePathname } from "next/navigation";
import { Recipe } from "@/interface/Recipe";
import { Box , Typography , Button , CircularProgress } from "@mui/material";
import Link from "next/link";
import SearchBar from "./SearchBar";
import SpecialLayout from "./SpecLayout";


export default function RenderRecipes() {

    const [recipes,setRecipes] = useState<Recipe[]>([]);
    const [loading,setLoading] = useState<boolean>(false);
    const [error,setError] = useState<any>(null);
    const pathname = usePathname();

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

    if(loading) {
        return <Box sx={{
            position : "absolute",
            top : "50%",
            left : "50%",
            transform : "translate(-50%,-50%)"
        }}>
            <CircularProgress color="warning" />
        </Box>
    }

    if(error) {
        return <Typography color="warning" sx={{
            position : "absolute",
            left : "50%",
            top : "50%",
            transform : "translate(-50%,-50%)"
        }}>{error}</Typography>
    }

     return <Box>

        <SearchBar />

        <Box sx={{
            display : "flex",
            flexDirection : "row",
            flexWrap : "wrap"
        }}>

            {recipes.map((recipe : Recipe , key : number) => {
                return <Box sx={{
                    width : "45%",
                    height : "250px",
                    background : "gray",
                    borderRadius : "5px"
                }} key={key} margin={"10px"}>
                    <Typography sx={{margin : "5px"}} variant="h3" color="white">{recipe.recipe_name}</Typography>
                    <Typography sx={{margin : "5px"}} variant="body1" color="white">{recipe.recipe_text}</Typography>
                    <Button color="warning" sx={{margin : "5px",bgcolor : "warning.main"}} variant="contained" component={Link} prefetch={true} href={`${pathname}/recipe?recipe_id=${recipe.recipe_id}`}>Ukazat Detail</Button>
                </Box>
            })}
        </Box>
    </Box>
   
}