# Agro API

## Running Application

First, clone the project and install dependencies:

```shell
npm install
```

Start the database:

```shell
docker-compose up -d --build
```
Seeds the infos

```shell
node ace db:seed
```

Then just start the application:

```shell
npm start
```
or
```shell
npm run dev
```

## Health Check

To verify if the application started up successfully, just try the health check:

[http://localhost:300/api/v1/health](http://localhost:3000/api/v1/health)

## Endpoints

create a producer:

```shell
POST http://localhost:3000/api/v1/producers
{
    "producer_name": "Teste Producer",
    "farm_name": "Teste",
    "document": "06121699361",
    "city": "Solonopole",
    "state": "Rio de Janeiro",
    "total_area_arable": 2,
    "total_area_vegetation": 1,
    "total_area_farm":3,
    "planted_crops": ["café"]
}
```

Update a producer:

```shell
PUT http://localhost:3000/api/v1/producers/:id
{
    "producer_name": "Teste Producer",
    "farm_name": "Teste",
    "document": "06121699361",
    "city": "Solonopole",
    "state": "Rio de Janeiro",
    "total_area_arable": 2,
    "total_area_vegetation": 1,
    "total_area_farm":3,
    "planted_crops": ["café"]
}
```

Delete a producer:

```shell
DELETE http://localhost:3000/api/v1/producers/:id
```

Dashboard:

```shell
GET http://localhost:3000/api/v1/dashboard
{
    "farms": 1,
    "total_area_farms": 12,
    "farms_by_state": [
        {
            "state": "São Paulo",
            "total": "1"
        },
        {
            "state": "Ceará",
            "total": "2"
        },
        {
            "state": "Rio de Janeiro",
            "total": "1"
        }
    ],
    "total_bry_crops": [
        {
            "crop_name": "milho",
            "total": "3"
        },
        {
            "crop_name": "café",
            "total": "1"
        },
        {
            "crop_name": "soja",
            "total": "3"
        }
    ]
}
```

[http://localhost:3000/health](http://localhost:3000/health)

## Built With

- [AdonisJS](https://adonisjs.com/) - Framework
- [Postgres](https://www.postgresql.org/) - Database
- [yarn](https://yarnpkg.com/) - Dependency Management
- [Docker](https://www.docker.com/) - Containerization Platform