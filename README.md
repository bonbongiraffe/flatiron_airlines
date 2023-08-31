Check-in 30-Aug-2023
## Progress:
- user experience:
    - create account and login
    - book reservation with origin/destination and seat number
        - one-way and round-trip options
        - added datalist options with autopopulating airport/city names
    - edit/cancel existing reservation with confirmation number
        - removed user capability to edit origin/destination
    - download boarding pass .pdf file, with confirmation number encoded into qrcode
- models:
    - added airport model: id, city, id_code
- backend:
    - added reservations function to automatically create qrcode.png and boardingpass.pdf files upon reservation POST
- frontend:
    - home (new)
    - my-flights (_was_ home)
    - new-reservation (_replaced_ create-reservation)
    - manage-reservations (_replaced_ edit-reservations)
- adventures:
    - reportlab (python) for creating .pdf
    - qrcode (python) for generating qr codes
    - bootstrap (js) for styling
    - useContext (react) added locations context 
- extras:
    - added copy confirmation code button to reservation card
    - added download boarding pass button to reservation card
    - added logo and background

## Next-Steps:
- new seating chart
- confirm passenger information page in new-reservation process
- home page photo loop navigation dots
- home page airport pins
- home page about description

## Notes:
    -

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


