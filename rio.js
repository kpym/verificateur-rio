// RIO = OO + Q + RRRRRR + CCC
// OO = rio.substr(0:2)
// Q = rio[2]
// RRRRRR = rio.substr(3:9)
// CCC = rio.substr(9:12)
function RioChecksum(rio, tel) {
    rio = rio.toUpperCase();

    riotel = rio.substr(0,9) + tel;
    ordre = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+"; // caractères utilisés pour le codage (37 différents)

    a = b = c = 0 // initialisation de a, b et c

    // boucle de 0 à 18, pour chaque index de position dans riotel
    for (const ch of riotel) {

        position  = ordre.indexOf(ch); // on retrouve la position du caractère riotel[i] dans ordre

        a = (1 * a + position) % 37;
        b = (2 * b + position) % 37;
        c = (4 * c + position) % 37;
    }

    return ordre[a] + ordre[b] + ordre[c] // on encode a, b et c en leur caractères correspondants, et on concatène le tout
}
