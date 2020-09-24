import React from 'react';

// Material UI imports for form
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import './formStyles.scss';

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

export default function FormActivity(props) {
    // Opciones del input de dificultad de select
    const difficulties = [
        {
            value: 'Bajo',
            label: 'Bajo'
        },
        {
            value: 'Medio',
            label: 'Medio'
        },
        {
            value: 'Alto',
            label: 'Alto'
        }
    ];

    const sports = [
        {
            value: 'Scuba-diving',
            label: 'Scuba-diving'
        }
    ];

    const types = [
        {
            value: 'Nocturna',
            label: 'Nocturna'
        },
        {
            value: 'Pecio',
            label: 'Pecio'
        },
        {
            value: 'Cueva',
            label: 'Cueva'
        },
        {
            value: 'Formación Rocosa',
            label: 'Formación Rocosa'
        },
        {
            value: 'Costa',
            label: 'Costa'
        },
        {
            value: 'Curso de formación',
            label: 'Curso de formación'
        }
    ];

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
                    marginTop: '80px',
                    marginBottom: '60px',
                    display: 'flex',
                    flexDirection: 'column',
                    textAlign: 'center'
                }}
            >
                <Container maxWidth="xs">
                    <h1>Formulario nueva actividad</h1>
                    <TextField
                        value={props.dataActivity.name}
                        name="name"
                        className={classes.smallText}
                        onChange={props.onChange}
                        variant="filled"
                        error={props.dataActivity.name === ''}
                        id="filled-basic"
                        label="Nombre de la actividad"
                    />
                    <TextField
                        value={props.dataActivity.sport}
                        name="sport"
                        onChange={props.onChange}
                        error={props.dataActivity.sport === ''}
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
                        name="dates"
                        onChange={props.onChange}
                        error={props.dataActivity.dates === ''}
                        id="filled-basic"
                        variant="filled"
                        type="date"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                    <TextField
                        value={props.dataActivity.price}
                        name="price"
                        onChange={props.onChange}
                        error={props.dataActivity.price === ''}
                        id="filled-basic"
                        variant="filled"
                        label="Precio (€)"
                        type="number"
                    />
                    <TextField
                        value={props.dataActivity.duration}
                        name="duration"
                        onChange={props.onChange}
                        error={props.dataActivity.duration === ''}
                        label="Duración (min)"
                        type="number"
                        variant="filled"
                        id="standard-basic"
                    />
                    <TextField
                        value={props.dataActivity.images_collection}
                        name="images_collection"
                        onChange={props.onChange}
                        multiline
                        rows={4}
                        variant="filled"
                        error={props.dataActivity.images_collection === ''}
                        label="Añade un link de una imagen con extensión imagen"
                        id="standard-basic"
                    />
                    <TextField
                        value={props.dataActivity.description}
                        name="description"
                        onChange={props.onChange}
                        multiline
                        rows={4}
                        variant="filled"
                        error={props.dataActivity.description === ''}
                        label="Descripción de la actividad"
                        id="standard-basic"
                    />
                    <TextField
                        value={props.dataActivity.requisits}
                        name="requisits"
                        onChange={props.onChange}
                        id="standard-basic"
                        label="Requisitos"
                        multiline
                        rows={4}
                        type="text"
                        variant="filled"
                    />
                    <TextField
                        value={props.dataActivity.depth}
                        name="depth"
                        onChange={props.onChange}
                        error={props.dataActivity.depth === ''}
                        id="outlined-depth"
                        label="Profundidad (m)"
                        type="number"
                        variant="filled"
                    />
                    <TextField
                        value={props.dataActivity.difficulty}
                        name="difficulty"
                        onChange={props.onChange}
                        error={props.dataActivity.difficulty === ''}
                        id="outlined-difficulty"
                        select
                        label="Nivel de dificultad"
                        variant="filled"
                    >
                        {difficulties.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        value={props.dataActivity.type}
                        name="type"
                        onChange={props.onChange}
                        error={props.dataActivity.type === ''}
                        id="outlined-type"
                        select
                        label="Tipo de inmersión"
                        variant="filled"
                    >
                        {types.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        value={props.dataActivity.startPoint}
                        name="startPoint"
                        onChange={props.onChange}
                        error={props.dataActivity.startPoint === ''}
                        id="outlined-startPoint"
                        label="Punto de salida"
                        type="text"
                        variant="filled"
                    />
                    <TextField
                        value={props.dataActivity.speciesInArea}
                        name="speciesInArea"
                        onChange={props.onChange}
                        id="outlined-speciesInArea"
                        multiline
                        rows={4}
                        label="Especies en el área"
                        type="text"
                        variant="filled"
                    />
                    <div>
                        <Button
                            variant="contained"
                            type="submit"
                            color="primary"
                        >
                            Crear actividad
                        </Button>
                    </div>
                </Container>
            </div>
        </form>
    );
}
