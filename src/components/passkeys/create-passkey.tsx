'use client'

import {Fragment} from "react";
import * as React from "react";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function CreatePasskey(props: { rpId: string, challenge: string }) {
    // const getPasskeyCredential = async (rpId: string, challenge: string) => {
    //     const challengeBuffer = Uint8Array.from(challenge, (c) => c.charCodeAt(0));
    //     const publicKeyCredentialRequestOptions: PublicKeyCredentialRequestOptions = {
    //         challenge: challengeBuffer,
    //         rpId: rpId,
    //         userVerification: "preferred",
    //         timeout: 60000,
    //     };
    //
    //     return await navigator.credentials.get({
    //         publicKey: publicKeyCredentialRequestOptions,
    //     });
    // };

    const createPasskeyCredential = async (rpId: string, challenge: string) => {
        const challengeBuffer = Uint8Array.from(challenge, (c) => c.charCodeAt(0));
            const publicKeyCredentialRequestOptions: PublicKeyCredentialCreationOptions = {
                challenge: challengeBuffer,
                rp: {
                    name: "passkeys for next.js",
                    id: rpId
                },
                user: {
                  id: Uint8Array.from("user-id", (c) => c.charCodeAt(0)),
                  name: "user-name",
                  displayName: "user-display-name"
                },
                pubKeyCredParams: [ { alg: -7, type: "public-key" } ],
                timeout: 60000,
            };

            return await navigator.credentials.create({
                publicKey: publicKeyCredentialRequestOptions,
            });
    }

    const generatePasskey = async () => {
        let credential = await createPasskeyCredential(props.rpId, props.challenge);

        console.log(credential);

    }

    return (
      <Fragment>
          <Typography variant="h6" gutterBottom>
              Passkey
          </Typography>
          <Grid container spacing={3}>
              <Grid item xs={12}>
                  <Button variant="contained" fullWidth onClick={generatePasskey}>
                      Generate Passkey
                  </Button>
              </Grid>
              <Grid item xs={12}>
                  <TextField
                      required
                      id="passkey"
                      name="passkey"
                      label="Passkey"
                      variant="standard"
                      fullWidth
                      inputProps={{ readOnly: true }}
                  />
              </Grid>
          </Grid>
      </Fragment>

    )};