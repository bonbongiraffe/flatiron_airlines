Check-in 23-Aug-2023 

## Progress:
- user experience:
    - create account and login
    - book reservation with origin/destination and seat number
    - edit/cancel existing reservation with confirmation number
- models: 
    - Flight --> Reservation <-- User
        - Flight: id, origin, destination
        - User: id, first_name, last_name, email, _password_hash
            - validates: first_name, last_name, email
        - Reservation: id, flight_id, user_id, seat, conf_number
            - validates: seat
            - constraints: conf_number must be unique
- backend routes:
    - reservations 
        - create
    - reservations by confirmation number 
        - read, update, delete
    - flights 
        - read
    - flights by id 
        - read
    - user/auth (non-restful): login, signup, authorized, logout
        - need route protection
- frontend routes:
    - home
    - create-reservation
    - edit-reservation
    - signup
    - login
- adventures: 
    - bootstrap CSS
    - useContext for user state
- extras:
    - dynamic seating chart

## Next Steps:
- styling:
    - add color schema
    - logo
- functionality:
    - document title
    - restrict edit form (only seat number)
    - add to home page
- stretch:
    - roundtrip / oneway
    - print boarding pass
    - react-autosuggest for origin/destination on form

## Notes:


