import React from "react";
import {
    Container,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button,
} from "@mui/material";

const services = [
    {
        id: 1,
        image: "https://via.placeholder.com/150",
        title: "Serviço",
        description: "Descrição do Serviço",
    },
    {
        id: 2,
        image: "https://via.placeholder.com/150",
        title: "Serviço",
        description: "Descrição do Serviço",
    },
    {
        id: 3,
        image: "https://via.placeholder.com/150",
        title: "Serviço",
        description: "Descrição do Serviço",
    },
    {
        id: 4,
        image: "https://via.placeholder.com/150",
        title: "Serviço",
        description: "Descrição do Serviço",
    },
    {
        id: 5,
        image: "https://via.placeholder.com/150",
        title: "Serviço",
        description: "Descrição do Serviço",
    },
    {
        id: 6,
        image: "https://via.placeholder.com/150",
        title: "Serviço",
        description: "Descrição do Serviço",
    },
    {
        id: 7,
        image: "https://via.placeholder.com/150",
        title: "Serviço",
        description: "Descrição do Serviço",
    },
    {
        id: 8,
        image: "https://via.placeholder.com/150",
        title: "Serviço",
        description: "Descrição do Serviço",
    },
];

export const ServiceList = () => {
    return (
        <Container>
            <Button
                variant="contained"
                color="primary"
                style={{ float: "right", margin: "20px 0" }}
            >
                Anunciar Serviço
            </Button>
            <Grid container spacing={4}>
                {services.map((service) => (
                    <Grid item key={service.id} xs={12} sm={6} md={3}>
                        <Card>
                            <CardMedia
                                component="img"
                                alt={service.title}
                                height="140"
                                image={service.image}
                                title={service.title}
                            />
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="h2"
                                >
                                    {service.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    component="p"
                                >
                                    {service.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};
