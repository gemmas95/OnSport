const centersData = [
    {
        logo: 'https://www.skylabcoders.com/images/403/default.png',
        sport: 'Scuba-Diving',
        id: 1,
        name: 'Skylab Sluba Club',
        email: 'skylab@gmail.com',
        phone: 666666666,
        opiniones: [
            'Recomiendo mucho este lugar, es uno de mis sitios favoritos y el personal tiene una muy biena atención a los usuarios!',
            'Es un buen centro aunque deberían hacer una renovación del material'
        ],
        description:
            'Descubre todas las instalaciones del centro Accura Bruc, situado en el barrio de Eixample Dret-Sagrada Familia en Barcelona. Accede a sus servicios al mejor precio con Andjoy ¡sin matrícula ni permanencia mínima! Aprovecha nuestra oferta para hacer Zumba, Pilates, Yoga, entre otras de las increíbles actividades que te propone el centro Accura Bruc. En Àccura Bruc, podrás disfrutar de un programa de acogida gratuito en el momento de tu primer acceso, el sistema de entrenamiento “Coge Ritmo”, que consiste en adaptar tus necesidades y mantener un seguimiento personalizado que te ayudará a disfrutar de tu día a día haciendo ejercicio y así poder llevar a cabo tus objetivos. Además el centro consta de varias salas de actividades dirigidas, con horarios desde las 7 de la mañana hasta las 23:00 de la noche, una piscina climatizada con spa y sauna y servicio de fisioterapia. ¡Un centro muy completo en pleno centro de la ciudad condal!',
        activities: [
            {
                name: 'El pecio del Papacho',
                description: 'hahaha',
                // Dates in string or date?
                dates: [
                    '2018-04-23T18:25:43.511Z',
                    '2015-04-23T18:25:43.511Z',
                    '2012-04-23T18:25:43.511Z'
                ],
                price: 12,
                requisits: 'swim-bath',
                ageRange: '16-50',
                aptToPhisicalDisability: true,
                ubication: 'Playa de Conchinchina',
                duration: 150,
                image: [
                    'https://www.baliocean.com/wp-content/uploads/2019/11/dive-with-turtle-1024x768.jpg'
                ],
                depth: 17,
                difficulty: 'low',
                type: 'Nocturn',
                startPoint: 'Bogatell',
                speciesInArea: ['Morena', 'Turtle'],
                usersSubscribed: ['Mr. Potato', 'Dr. Cola']
            },
            {
                name: 'El pecio del Boreas',
                description: 'hahaha',
                dates: ['11/09/29', '22/09/11', '18/09/20'],
                price: 12,
                requisits: 'swim-bath',
                ageRange: '16-50',
                aptToPhisicalDisability: true,
                ubication: 'Playa de Bogatell',
                duration: 50,
                image:
                    'https://www.baliocean.com/wp-content/uploads/2019/11/dive-with-turtle-1024x768.jpg',
                depth: 17,
                difficulty: 'low',
                type: 'Nocturn',
                startPoint: 'Bogatell',
                speciesInArea: ['Morena', 'Turtle'],
                usersSubscribed: ['Mr. Potato', 'Dr. Cola']
            }
        ]
    },
    {
        logo: 'https://www.skylabcoders.com/images/403/default.png',
        sport: 'Scuba-Diving',
        id: 2,
        name: 'Skylabbbbbbbbbbb',
        email: 'skylab@gmail.com',
        phone: 666666666,
        dates: ['10/09/20', '18/09/20', '22/09/21'],
        description:
            'New club with 24 adventurers who wants to introduce scuba to other people'
    }
];

export default centersData;
