import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from "@mui/material/Container";
import CreatePasskey from "@/components/passkeys/create-passkey";

export default function Profile() {
    return (
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Box component="form" sx={{ mt: 1 }}>
            <Typography variant="h6" gutterBottom>
                Your profile
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <TextField
                        required
                        id="firstName"
                        name="firstName"
                        label="First name"
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        required
                        id="lastName"
                        name="lastName"
                        label="Last name"
                        fullWidth
                        autoComplete="family-name"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="email"
                        name="email"
                        label="Email"
                        variant="standard"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <CreatePasskey rpId="localhost" challenge="challenge"/>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        fullWidth
                        >
                        Save
                    </Button>
                </Grid>
            </Grid>
        </Box>
        </Container>
    );
}