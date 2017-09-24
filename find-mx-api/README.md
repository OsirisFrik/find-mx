# FIND MX

## Requerimientos:

- NodeJS ^6.10.0
- MongoDB ^3.4.2

```
$ npm install
```

## Rutas

```
GET: / <-- Home
```

```
GET: /registrar <-- formulario de registro
```

```
POST: /registrar <--- registro de personas
{
  _id: String,
  timestamp: Number
  full_name: String,
  age: Number,
  last_location: String,
  sex: String,
  state: String,
  contact: {
    parent: String,
    full_name: String,
    email: String,
    phone: Number,
    country_code: Number
  },
  caract: String,
  image: String,
  find: Boolean
}
```

```
GET: /api/v1/personas <--- optener todas las personas
```

```
GET /api/v2/personas?page=x?limit=y <--- optener personas paginadas

default:
 * page = 1
 * limit = 15

return:
{
    docs:[
        {
            _id,
            timestamp,
            image,
            caract,
            state,
            last_location,
            sex,
            age,
            full_name,
            contact,
                full_name,
                email,
                phone,
                country_code,
            }
        }
    ],
    total,
    limit,
    page,
    pages
}
```

```
GET /api/v1/images/:file <--- optener imagenes
```
