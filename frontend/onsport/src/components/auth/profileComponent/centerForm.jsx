import React from 'react';

// Material UI imports for form
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

// Estilos de los inputs de materials

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '55ch'
        },
        '& .MuiContainer-maxWidthXs': {
            'max-width': '850px',
            'text-align': '-webkit-center'
        }
    }
}));

export default function CenterForm(props) {
    // Opciones del input de dificultad de select
    const sports = [
        {
            value: 'Scuba-diving',
            label: 'Scuba-diving'
        }
    ];

    /* const handleChangeDifficulty = (event) => {
    setDifficulty(event.target.value);
};

const handleChangeType = (event) => {
    setType(event.target.value);
}; */

    const classes = useStyles();

    return (
        <form
            onSubmit={props.onSubmit}
            className={`${classes.root} materialform`}
            noValidate
            autoComplete="off"
        >
            <div
                style={{
                    marginBottom: '60px',
                    display: 'flex',
                    flexDirection: 'column',
                    textAlign: 'center'
                }}
            >
                <Container maxWidth="sm">
                    <p>
                        Por favor, rellene los campos con la máxima precisión
                        posible para ofrecer a los usuarios una idea detallada
                        de lo que ofrece su centro. Las imagenes se tienen que
                        añadir en formato url y con la terminación de una
                        extensión tipo imagen (.png, .jpg,...). We recommend you
                        to choose an image with a transparent background.
                    </p>
                    <TextField
                        value={props.dataCenter.name}
                        name="name"
                        type="text"
                        onChange={props.onChange}
                        variant="filled"
                        error={props.dataCenter.name === ''}
                        id="filled-basic"
                        label="Nombre del centro"
                    />
                    <TextField
                        value={props.dataCenter.logo}
                        name="logo"
                        onChange={props.onChange}
                        error={props.dataCenter.logo === ''}
                        id="filled-basic"
                        variant="filled"
                        label="Logo"
                        type="text"
                    />
                    <TextField
                        value={props.dataCenter.sport}
                        name="sport"
                        onChange={props.onChange}
                        error={props.dataCenter.sport === ''}
                        id="outlined-sport"
                        select
                        label="Deporte"
                        variant="filled"
                    >
                        {sports.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        value={props.dataCenter.phone}
                        name="phone"
                        onChange={props.onChange}
                        id="standard-basic"
                        label="Telefono"
                        type="number"
                        variant="filled"
                    />
                    <TextField
                        value={props.dataCenter.city}
                        name="city"
                        error={props.dataCenter.city === ''}
                        onChange={props.onChange}
                        id="standard-basic"
                        label="Ciudad"
                        type="text"
                        variant="filled"
                    />
                    <TextField
                        value={props.dataCenter.street}
                        name="street"
                        onChange={props.onChange}
                        id="standard-basic"
                        label="Calle"
                        type="text"
                        variant="filled"
                    />
                    <TextField
                        value={props.dataCenter.postal_code}
                        name="postal_code"
                        onChange={props.onChange}
                        id="standard-basic"
                        label="Código postal"
                        type="text"
                        variant="filled"
                    />
                    <TextField
                        value={props.dataCenter.description}
                        name="description"
                        onChange={props.onChange}
                        multiline
                        rows={4}
                        variant="filled"
                        error={props.dataCenter.description === ''}
                        label="Descripción del centro"
                        id="standard-basic"
                    />

                    <div>
                        <Button
                            variant="contained"
                            type="submit"
                            color="primary"
                        >
                            Crear centro
                        </Button>
                    </div>
                </Container>
            </div>
        </form>
    );
}
