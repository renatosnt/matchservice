import Header from "./Header";
import {
    AppBar,
    Box,
    Button,
    Grid,
    Toolbar,
    alpha,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Avatar,
    Container,
    CardActions,
    Paper,
} from "@mui/material";

import { makeStyles } from "@mui/styles";
const useStyles = makeStyles({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
    },
    profileSection: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "20px",
    },
    profilePhoto: {
        width: "150px",
        height: "150px",
        marginBottom: "10px",
    },
    buttons: {
        marginTop: "10px",
        "& button": {
            margin: "5px 0",
        },
    },
    serviceSection: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    serviceCard: {
        maxWidth: "345px",
    },
    serviceMedia: {
        height: "200px",
    },
});
export default function Profile() {
    const classes = useStyles();
    const services = [
        {
            id: 1,
            title: "Serviço 1",
            description: "Descrição do Serviço 1",
            image: "https://via.placeholder.com/300",
        },
        {
            id: 2,
            title: "Serviço 2",
            description: "Descrição do Serviço 2",
            image: "https://via.placeholder.com/300",
        },
        {
            id: 3,
            title: "Serviço 3",
            description: "Descrição do Serviço 3",
            image: "https://via.placeholder.com/300",
        },
    ];
    return (
        <div>
            <AppBar
                position="fixed"
                color="transparent"
                elevation={0}
                sx={{
                    backgroundColor: "White",
                    borderBottom: "1px solid #E0E0E0",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                }}
            >
                <Toolbar>
                    <Grid container justifyContent="right" alignItems="center">
                        <Grid item xs>
                            <Box
                                sx={{
                                    position: "relative",
                                    borderRadius: "20px",
                                    backgroundColor: alpha("#fff", 0.15),
                                    "&:hover": {
                                        backgroundColor: alpha("#fff", 0.25),
                                    },
                                    marginLeft: 0,
                                    width: "100%",
                                }}
                            >
                                <Box
                                    sx={{
                                        paddingLeft: "20px",
                                        height: "40px",
                                        position: "absolute",
                                        pointerEvents: "none",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                ></Box>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{
                                    borderRadius: 20,
                                }}
                            >
                                Anunciar Serviço
                            </Button>
                        </Grid>
                        <Grid item>
                            <Header />
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Container maxWidth="lg">
                <Paper
                    elevation={3}
                    sx={{
                        padding: 4,
                        marginTop: 4,
                    }}
                >
                    <Grid container spacing={16} mt={1}>
                        <Grid item xs={12} sm={4} mt={4} align="center">
                            <Avatar
                                alt="João"
                                src="https://via.placeholder.com/150"
                                sx={{
                                    width: 150,
                                    height: 150,
                                    marginBottom: 2,
                                }}
                            />
                            <Typography variant="h6">Nome: João</Typography>
                            <Typography variant="subtitle1">
                                Especialidade: Fotografia
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ marginTop: 2 }}
                            >
                                Editar
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ marginTop: 1 }}
                            >
                                Histórico
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ marginTop: 1 }}
                            >
                                Agenda
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                mb={2}
                            >
                                <Typography variant="h5">
                                    Seus Serviços
                                </Typography>
                                <Button variant="contained" color="primary">
                                    Novo Serviço
                                </Button>
                            </Box>
                            {services.map((service) => (
                                <Card key={service.id} sx={{ marginBottom: 2 }}>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={service.image}
                                        alt={service.title}
                                    />
                                    <CardContent>
                                        <Typography
                                            gutterBottom
                                            variant="h6"
                                            component="div"
                                        >
                                            {service.title}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {service.description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button
                                            size="small"
                                            variant="contained"
                                            color="primary"
                                        >
                                            Editar
                                        </Button>
                                    </CardActions>
                                </Card>
                            ))}
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </div>
    );
}
