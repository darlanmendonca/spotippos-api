define({ "api": [  {    "type": "POST",    "url": "/authentication",    "title": "local",    "description": "<p>Authentication user with local strategy</p>",    "name": "local",    "group": "Auth",    "permission": [      {        "name": "Public"      }    ],    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "email",            "description": "<p>email of user</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "password",            "description": "<p>password of user</p>"          }        ]      }    },    "version": "0.0.0",    "filename": "app/authentication/authentication.controller.js",    "groupTitle": "Auth"  },  {    "type": "POST",    "url": "/properties",    "title": "create",    "description": "<p>Create a new property in Spotippos</p>",    "name": "create",    "group": "Properties",    "permission": [      {        "name": "Public"      }    ],    "parameter": {      "fields": {        "201": [          {            "group": "201",            "type": "Number",            "optional": false,            "field": "x",            "description": "<p>coodinate x of property</p>"          },          {            "group": "201",            "type": "Number",            "optional": false,            "field": "y",            "description": "<p>coordinate y of property</p>"          },          {            "group": "201",            "type": "String",            "optional": false,            "field": "title",            "description": "<p>a title/name of property, to short description</p>"          },          {            "group": "201",            "type": "Number",            "optional": false,            "field": "price",            "description": "<p>value of property</p>"          },          {            "group": "201",            "type": "String",            "optional": false,            "field": "description",            "description": "<p>a long description about property</p>"          },          {            "group": "201",            "type": "Number",            "size": "1..5",            "optional": false,            "field": "beds",            "description": "<p>number of rooms in property</p>"          },          {            "group": "201",            "type": "Number",            "size": "1..4",            "optional": false,            "field": "baths",            "description": "<p>number of baths in property</p>"          },          {            "group": "201",            "type": "Number",            "size": "20..240",            "optional": false,            "field": "squareMeters",            "description": "<p>total area of property</p>"          }        ]      }    },    "success": {      "fields": {        "201": [          {            "group": "201",            "type": "String",            "optional": false,            "field": "id",            "description": "<p>id of property, to future requests</p>"          }        ]      }    },    "error": {      "fields": {        "400": [          {            "group": "400",            "optional": false,            "field": "BadRequest",            "description": "<p>Return a list of invalid fields, and details about error</p>"          }        ]      },      "examples": [        {          "title": "Error-Response:",          "content": "HTTP/1.1 400 Bad Request\n{\n  x: {\n    message: 'Path `x` is required.',\n    name: 'ValidatiorError',\n    path: 'x',\n  },\n  beds: {\n    message: 'Path `beds` (10) is more than maximum allowed value (5).',\n    kind: 'max',\n    path: 'beds',\n    value: 10\n  }\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "app/properties/properties.controller.js",    "groupTitle": "Properties"  },  {    "type": "GET",    "url": "/properties/",    "title": "list",    "description": "<p>Get list of properties in Spotippos</p>",    "name": "list",    "group": "Properties",    "permission": [      {        "name": "Public"      }    ],    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "QueryString",            "allowedValues": [              "'x,y,title,price,description,beds,baths,squareMeters'"            ],            "optional": false,            "field": "fields",            "description": "<p>used to filter params in response</p>"          }        ]      }    },    "success": {      "fields": {        "200, 204": [          {            "group": "200, 204",            "type": "String",            "optional": false,            "field": "x",            "description": "<p>coordinate x from property</p>"          },          {            "group": "200, 204",            "type": "String",            "optional": false,            "field": "y",            "description": "<p>coordinate y from property</p>"          },          {            "group": "200, 204",            "type": "String",            "optional": false,            "field": "title",            "description": "<p>short description about property</p>"          },          {            "group": "200, 204",            "type": "String",            "optional": false,            "field": "price",            "description": "<p>total value to revenue of property</p>"          },          {            "group": "200, 204",            "type": "String",            "optional": false,            "field": "description",            "description": "<p>long description about property</p>"          },          {            "group": "200, 204",            "type": "Number",            "optional": false,            "field": "beds",            "description": "<p>total of rooms in property</p>"          },          {            "group": "200, 204",            "type": "Number",            "optional": false,            "field": "baths",            "description": "<p>total of baths in property</p>"          },          {            "group": "200, 204",            "type": "String",            "optional": false,            "field": "squareMeters",            "description": "<p>total area of property</p>"          }        ]      }    },    "version": "0.0.0",    "filename": "app/properties/properties.controller.js",    "groupTitle": "Properties"  },  {    "type": "GET",    "url": "/properties/:id",    "title": "single",    "description": "<p>Get a single property by id</p>",    "name": "single",    "group": "Properties",    "permission": [      {        "name": "Public"      }    ],    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "QueryString",            "allowedValues": [              "'x,y,title,price,description,beds,baths,squareMeters'"            ],            "optional": false,            "field": "fields",            "description": "<p>used to filter params in response</p>"          }        ]      }    },    "success": {      "fields": {        "200, 204": [          {            "group": "200, 204",            "type": "String",            "optional": false,            "field": "x",            "description": "<p>coordinate x from property</p>"          },          {            "group": "200, 204",            "type": "String",            "optional": false,            "field": "y",            "description": "<p>coordinate y from property</p>"          },          {            "group": "200, 204",            "type": "String",            "optional": false,            "field": "title",            "description": "<p>short description about property</p>"          },          {            "group": "200, 204",            "type": "String",            "optional": false,            "field": "price",            "description": "<p>total value to revenue of property</p>"          },          {            "group": "200, 204",            "type": "String",            "optional": false,            "field": "description",            "description": "<p>long description about property</p>"          },          {            "group": "200, 204",            "type": "Number",            "optional": false,            "field": "beds",            "description": "<p>total of rooms in property</p>"          },          {            "group": "200, 204",            "type": "Number",            "optional": false,            "field": "baths",            "description": "<p>total of baths in property</p>"          },          {            "group": "200, 204",            "type": "String",            "optional": false,            "field": "squareMeters",            "description": "<p>total area of property</p>"          }        ]      }    },    "version": "0.0.0",    "filename": "app/properties/properties.controller.js",    "groupTitle": "Properties"  },  {    "type": "PUT",    "url": "/properties/:id",    "title": "update",    "description": "<p>Update data from a single property</p>",    "name": "update",    "group": "Properties",    "permission": [      {        "name": "Public"      }    ],    "parameter": {      "fields": {        "204": [          {            "group": "204",            "type": "String",            "optional": false,            "field": "message",            "description": "<p>message status</p>"          }        ]      }    },    "version": "0.0.0",    "filename": "app/properties/properties.controller.js",    "groupTitle": "Properties"  },  {    "type": "POST",    "url": "/users",    "title": "create",    "description": "<p>Create a new user</p>",    "name": "create",    "group": "Users",    "permission": [      {        "name": "Authenticated"      }    ],    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "email",            "description": "<p>email of user</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "password",            "description": "<p>password of user</p>"          }        ]      }    },    "version": "0.0.0",    "filename": "app/users/users.controller.js",    "groupTitle": "Users"  },  {    "type": "DELETE",    "url": "/users/:id",    "title": "delete",    "description": "<p>Delete a user</p>",    "name": "delete",    "group": "Users",    "permission": [      {        "name": "Authenticated"      }    ],    "version": "0.0.0",    "filename": "app/users/users.controller.js",    "groupTitle": "Users"  },  {    "type": "GET",    "url": "/users/",    "title": "list",    "description": "<p>Get list of users</p>",    "name": "list",    "group": "Users",    "permission": [      {        "name": "Authenticated"      }    ],    "version": "0.0.0",    "filename": "app/users/users.controller.js",    "groupTitle": "Users"  },  {    "type": "GET",    "url": "/users/:id",    "title": "single",    "description": "<p>Get an user</p>",    "name": "single",    "group": "Users",    "permission": [      {        "name": "Authenticated"      }    ],    "version": "0.0.0",    "filename": "app/users/users.controller.js",    "groupTitle": "Users"  },  {    "type": "PUT",    "url": "/users/:id",    "title": "update",    "description": "<p>Update a user</p>",    "name": "update",    "group": "Users",    "permission": [      {        "name": "Authenticated"      }    ],    "version": "0.0.0",    "filename": "app/users/users.controller.js",    "groupTitle": "Users"  }] });
