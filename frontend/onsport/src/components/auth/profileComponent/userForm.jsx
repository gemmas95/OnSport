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

export default function UserForm(props) {
    // Opciones del input de dificultad de select
    const genders = [
        {
            value: 'Female',
            label: 'Female'
        },
        {
            value: 'Male',
            label: 'Male'
        },
        {
            value: 'Other',
            label: 'Other'
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
                    <TextField
                        value={props.dataUser.username}
                        name="username"
                        type="text"
                        onChange={props.onChange}
                        variant="filled"
                        error={props.dataUser.username === ''}
                        id="filled-basic"
                        label="Nombre"
                    />
                    <TextField
                        value={props.dataUser.lastname}
                        name="lastname"
                        onChange={props.onChange}
                        error={props.dataUser.lastname === ''}
                        id="filled-basic"
                        variant="filled"
                        label="Apellido"
                        type="text"
                    />
                    <TextField
                        value={props.dataUser.phone}
                        name="phone"
                        onChange={props.onChange}
                        id="standard-basic"
                        label="Telefono"
                        type="number"
                        variant="filled"
                    />
                    <TextField
                        value={props.dataUser.usergender}
                        name="usergender"
                        onChange={props.onChange}
                        id="outlined-usergender"
                        select
                        label="Sexo"
                        variant="filled"
                    >
                        {genders.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>

                    <div>
                        <Button
                            variant="contained"
                            type="submit"
                            color="primary"
                        >
                            Dive in!
                        </Button>
                    </div>
                </Container>
            </div>
        </form>
    );
}
