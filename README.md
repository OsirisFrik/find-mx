# FIND MX

### Requerimientos:
* NodeJS ^6.10.0
* MongoDB ^3.4.2

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
