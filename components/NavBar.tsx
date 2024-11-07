import Link from "next/link";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

export default function NavBar() {
    return (
        <AppBar position="static" style={{ backgroundColor: "orange" }}>
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    <Link href={"/"}>Domov</Link>
                </Typography>
                <Button color="inherit" component={Link} href="/recipes" style={{ marginLeft: "25px" }}>
                    Recepty
                </Button>
                <Button color="inherit" component={Link} href="#" style={{ marginLeft: "25px" }}>
                    Účet
                </Button>
            </Toolbar>
        </AppBar>
    );
}
