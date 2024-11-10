"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Box, Button, TextField, Grid, Typography } from "@mui/material";

export default function Page() {
    const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Zabrání automatickému odeslání formuláře
        const formdata = new FormData(e.currentTarget);
        const data_form = {
            recipe_name: formdata.get("recipe_name"),
            recipe_text: formdata.get("recipe_text"),
            likes: formdata.get("likes"),
            photo: formdata.get("photo"),
            materials: formdata.get("materials")  // Přidáno nové pole "materials"
        };

        await fetch("/api/recipes/new-recipe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data_form)
        });
    };

    return (
        <Box sx={{ padding: 4, backgroundColor: "#000" }}>
            <Typography variant="h4" sx={{ marginBottom: 2, color: "#fff" }}>
                Add New Recipe
            </Typography>
            <form onSubmit={handleSubmitForm} action="" method="post">
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Recipe Name"
                            variant="outlined"
                            type="text"
                            name="recipe_name"
                            fullWidth
                            sx={{
                                input: { color: "#fff" },
                                label: { color: "#bbb" },
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        borderColor: "#555"
                                    },
                                    "&:hover fieldset": {
                                        borderColor: "#fff"
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: "#fff"
                                    }
                                }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Photo URL"
                            variant="outlined"
                            type="text"
                            name="photo"
                            fullWidth
                            sx={{
                                input: { color: "#fff" },
                                label: { color: "#bbb" },
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        borderColor: "#555"
                                    },
                                    "&:hover fieldset": {
                                        borderColor: "#fff"
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: "#fff"
                                    }
                                }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Recipe Text"
                            variant="outlined"
                            type="text"
                            name="recipe_text"
                            multiline
                            rows={10}
                            fullWidth
                            sx={{
                                input: { color: "#fff" },
                                textarea: { color: "#fff" }, // Stylování pro multiline textarea
                                label: { color: "#bbb" },
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        borderColor: "#555"
                                    },
                                    "&:hover fieldset": {
                                        borderColor: "#fff"
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: "#fff"
                                    }
                                }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Materials"  // Nový TextField pro materials
                            variant="outlined"
                            type="text"
                            name="materials"
                            multiline
                            rows={5}
                            fullWidth
                            sx={{
                                input: { color: "#fff" },
                                textarea: { color: "#fff" }, // Stylování pro multiline textarea
                                label: { color: "#bbb" },
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        borderColor: "#555"
                                    },
                                    "&:hover fieldset": {
                                        borderColor: "#fff"
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: "#fff"
                                    }
                                }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Likes"
                            variant="outlined"
                            type="number"
                            name="likes"
                            fullWidth
                            sx={{
                                input: { color: "#fff" },
                                label: { color: "#bbb" },
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        borderColor: "#555"
                                    },
                                    "&:hover fieldset": {
                                        borderColor: "#fff"
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: "#fff"
                                    }
                                }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button type="submit" variant="contained" fullWidth sx={{ color: "#fff" }}>
                            Přidat Recept
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
}
