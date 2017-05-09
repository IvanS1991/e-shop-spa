# Short info
Course project for the Telerik Academy Javascript Applications course, team Dragonfruit

# Short description
Server-side and client-side functionality for an e-shop application, where users are able to register, login, logout, post their own products for sale, buy other people's products, comment on products, send messages to other users.
When a product is sold, the seller gets his "cash" updated.

# Web storages - localStorage
  * User data
    - LOGIN_USERNAME
    - LOGIN_AUTHKEY

  * Shopping cart data
    - SHOPPING_CART    

# Authentication - whereever needed
  * "x-auth-header" : LOGIN_AUTHKEY

# Server REST API
  * Users - 3/3
    - GET       /api/users      - get list of users
      * request data: none, response data - {users: [...]}

    - POST      /api/users      - register a new user
      * request data - {username:... , passHash:...}, response data - {username:...}

    - PUT       /api/users      - user login
      * request data - {username:... , passHash:...}, response data - {username:...}

  * Profiles - 1/1
    - GET       /api/profiles            - get profile, current user profile if provided with auth header, some user's profile if provided with query userId
      * ?AUTH, request data - none, response data - {user:..., isAuthenticated:..., products:...}

  * Messages - 4/4
    - GET       /api/messages/sent       - get all RECEIVED messages (get a single message if query msgId is provided)
      * AUTH, request data - none, response data - {messages: [...]}

    - GET       /api/messages/received   - get all RECEIVED messages (get a single message if query msgId is provided)
      * AUTH, request data - none, response data - {messages: [...]}

    - POST      /api/messages            - send a new message
      * AUTH, request data - {title:... , content:... , recipientId:...}, response data - {msgId:...}

    - DELETE    /api/messages             - delete a message
      * AUTH, request data - {msgId:...}, response data - {authorId:...}

  * Products - 4/4
    - GET       /api/products   - get products info (filtered with queries pCategory and pTitle, get single product with query productId)
      * AUTH, request data - none, response data - {products: [...]}

    - POST      /api/products   - post a new product
      * AUTH, request data - {title:... , description:... , category:... , price:...}, response data - {productId:...}

    - PUT       /api/products   - update a product
      * AUTH, request data - {product:...}, response data - none
      
    - DELETE    /api/products   - delete a product
      * AUTH, request data - {productId:...}, response data - {sellerId:...}

  * Order - 1/1
    - POST      /api/orders     - post a new order
      * AUTH, request data - {products: [productId 1, productId 2...]}, response data - {cost:...}

# Libraries/frameworks
  * Client
    - SystemJS - module loader
    - SammyJS - routing
    - jQuery - AJAX / DOM operations
    - CryptoJS - password encryption
    - HandlebarsJS - templates
    - jQuery UI - UI elements
    - Bootstrap - styles
    - Toastr - notifications

  * Server
    - Express
    - Lowdb
    - CORS - allow cross-origin resource sharing
    - Body-parser - JSON parse for the request body