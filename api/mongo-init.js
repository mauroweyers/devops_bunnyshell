/* eslint-disable */
db.createUser(
        {
            user: "mijn_mooie_gebruikersnaam",
            pwd: "mijn_mooie_wachtwoord",
            roles: [
                {
                    role: "readWrite",
                    db: "mijn_mooie_database"
                }
            ]
        }
);
