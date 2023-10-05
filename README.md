![Flatiron Airlines Logo](./client/public/flatlines-64.ico "FL-logo") 
# Flatiron Airlines
### About: 
Book your flight with Flatiron Airlines from a growing list of airports (currently operating out of 24 major international airports as of 31-Aug-2023!). Select your seat on our new and improved FL404 Airbus with an expanded capacity of 40 passengers per flight! Print your boarding pass as a neatly formatted A6 size .pdf file containing your reservation information and an embedded QR code for a quick and smooth boarding experience. Book your reservation with one-way or round-trip options and no additional charges for seat changes and cancellations. Fly with us at Flatiron Airlines today!

Clone the `flatiron_airlines` repository onto your local machine and simply run `bash launch.sh` from the project directory to get started! *Detailed steps outlined at the end*

1. ### User Experience:
    - create account and login
    - book reservation with origin/destination and seat number
        - one-way and round-trip options
        - added datalist options with autopopulating airport/city names
    - edit/cancel existing reservation with confirmation number
    - download boarding pass .pdf file with reservation information and qr code
2. ### Models:
    - Flight —> Reservation <— User
        - Flight: id, origin, destination
        - User: id, first_name, last_name, email, _password_hash
            - validates: first_name, last_name, email
        - Reservation: id, flight_id, user_id, seat, conf_number
            - validates: seat
            - constraints: conf_number must be unique
    - Airport: id, city, id_code (*no relationships yet*)
3. ### Back-end (Flask):
    - RESTful routes with CRUD:
        - `/reservations`
            - create
        - `/reservations/<id>`
            - read, update, delete
        - `/flights` 
            - read
        - `/flights/<id>` 
            - read
    - helper query routes:
        - `/reservation-query`
            - POST to query by confirmation number
        - `/flight-query`
            - POST to query by origin and destination
    - boarding pass export route:
        - `/export-boarding-pass/<confirmation>`
            - GET to fetch boarding_pass.pdf as attachment
    - user authentication (non-restful): `/login`, `/signup`, `/authorized`, and `/logout`
4. ### Front-end (React):
    - `/home`
        - about info, photo cards, world map, locations list
    - `/my-flights`
        - reservation cards, print boarding pass
    - `/new-reservation`
        - create reservation form, one-way and round-trip options, dynamic seating chart
    - `/manage-reservations`
        - edit reservation form, change seat, cancel reservation
    - `/signup`
        - user signup form
    - `/login`
        - user login form
5. ### Extra Libraries:
    - reportlab (`python`) for creating and formatting .pdf 
    - qrcode (`python`) for generating qr codes
    - bootstrap (`js`) for styling
    - bcrypt (`python`) for password hashing
6. ### Next Steps:
    - basic pricing
        - calculated based on origin/destination and seat selection
    - basic date/time
        - add date to reservation, add time to flights
    - passenger information confirmation form in reservation form

## Quick-Start Guide
1. Clone repository onto your local machine: `git clone git@github.com:bonbongiraffe/flatiron_airlines.git`
2. Navigate in your terminal to the parent directory, `/flatiron_airlines`
3. Install the backend virtual environment: `pipenv install`
4. Install the frontend dependencies: `npm install --prefix client`
5. Start the backend server from `/flatiron_airlines/server` with `python app.py`
6. Start the frontend server from `/flatiron_airlines/client` with `npm start` *in a separate terminal*
7. Open `http://localhost:3000` in your browser to view the project

## Acknowledgements
- To Adam and Emiley for being the best instructors at Flatiron School
- To Jon, Amelia, Jessica, Sebastian, Shanley, Alexis, Paul, Harjas, Megan, Nolan, Sadaf, and Marc for being my coding partners
- To Mom and Dad, and Kat for supporting me through my career change
### Thank you for viewing my capstone project!
### —Francesco Wai
## Stay in touch!
- Linked-In: https://www.linkedin.com/in/francescowai 
- GitHub: https://github.com/bonbongiraffe
- Dev: https://dev.to/bonbongiraffe