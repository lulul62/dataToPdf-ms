var pdf = require('html-pdf');
var options = {format: "letter"};
var express = require('express');
var request = require('request');
var router = express.Router();
const baseUrlApi = "http://localhost:1337/devis";

// Mock : A remplacer par une response du client
var devisToPdf = {name: "test", price : "2000"};

/**
 * Récupere un objet JSON et convertis son template HTML en PDF dans le repertoire /downloads
 */
router.get('/', function (req, res) {

        res.render('jsonToPdf', {devisToPdf: devisToPdf}, function (err, HTML) {
            pdf.create(HTML, options).toFile('./downloads/' + devisToPdf.name + '.pdf', function (err) {
                if (err) {
                    return res.status(400).send({
                        message: err
                    });
                }
                else {
                    res.send("le devis de " + devisToPdf.name + " à été exporté avec succés dans le repertoire download");
                }
            })
        });
});

module.exports = router;
