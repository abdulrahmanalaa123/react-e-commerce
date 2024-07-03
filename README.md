# Olive ecommerce web app
A minimalistic Single vendor e-commerce web app created as an SPA utilizing supabase for the backend services.
## Features:
### defining legend for the following diagrams
![image](https://github.com/abdulrahmanalaa123/react-e-commerce/assets/29045466/740d7db5-c083-4d1d-86fe-fa53fdefbcc4)

### Auth

#### Login
Representing the requests taken to perform a signle login operation and Auth service represents 
the auth service hosted on supabase
![image](https://github.com/abdulrahmanalaa123/react-e-commerce/assets/29045466/d261abf2-6505-4fe7-9866-95aa4bb9f913)

#### Registration

Registeration invokes login on clientside and performs most of the operations required to setup the account on supabase
utilizing triggers, webhooks and edge Functions 
![image](https://github.com/abdulrahmanalaa123/react-e-commerce/assets/29045466/e2a0a1d2-aab8-4f4c-85ee-4eb5c0192b9d)

### Cart

Generally an auth cheeck is performed first to check if the client is authorized to do server sided alterations if no authorizations
are found only the changes would happen on client side 
![image](https://github.com/abdulrahmanalaa123/react-e-commerce/assets/29045466/2132f0ce-3524-4cef-8679-a107a84f1beb)

### Checkout / Payment

This is defining the process of checking out after entering you credit card details or simply selecting cash on delivery options
Note that the credit card details are handled with stripe and accessed using the stripe hook for elements and no credit card details
are stored client side to not expose secret information.

![image](https://github.com/abdulrahmanalaa123/react-e-commerce/assets/29045466/dec1f9ff-6bb8-44eb-8787-15c9731fab03)

## Stack Used:
### React
### SupaBase for the backend
### Formik,Yup for form validation
### React Query for handling server state Management
### Zustand for handling client state Management
### Stripe for handling payments
