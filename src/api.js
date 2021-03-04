/**
 * Copyright © 2021 Felipe Alexandre Ferreira
 * This file is part of SaveAnyForm.

    SaveAnyForm is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    SaveAnyForm is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with SaveAnyForm.  If not, see <https://www.gnu.org/licenses/>.
 */

const http = require('http');
const https = require('https');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

class Api {
    constructor(config, dao) {
        this._httpPort = config.httpPort;
        this._httpsPort = config.httpsPort;
        this._keyFile = config.cert.keyFile
        this._certFile = config.cert.certFile;
        this._successMsg = config.successMsg;
        this._errorMsg = config.errorMsg;
        this._dao = dao;
    }

    run() {
        let app = express()

        //etag:false means that if you change anything in your public_html it will
        //take effect immediactly (no restart needed)
        app.use(express.static('public_html', { etag: false }));

        // parse application/x-www-form-urlencoded
        app.use(bodyParser.urlencoded({ extended: true }));
        
        // parse application/json, just in case you wish to handle some ajax frorm instead
        app.use(bodyParser.json());

        //TODO
        app.post('/:formid', async (req, res) => {
            let formId = req.params.formid;
            let body = req.body;
            try {
                await this._dao.save(formId, body);
                if(req.query.redirect !== undefined)
                    res.redirect(req.query.redirect);
                else {
                    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
                    res.end(this._successMsg);
                }
            } catch (err) {
                console.log('Error saving form', formId, body, err)
                res.status(500).end(this._errorMsg);
            }
        })

        app.listen(this._port);
        if (this._httpPort !== undefined) {
            http.createServer(app).listen(this._httpPort);
            console.log(`Server listening http on port ${this._httpPort}`);
        }
        
        if (this._httpsPort !== undefined) {
            let key  = fs.readFileSync(this._keyFile, 'utf8');
            var cert = fs.readFileSync(this._certFile, 'utf8');
            https.createServer({key,cert}, app).listen(this._httpsPort);
            console.log(`Server listening http on port ${this._httpsPort}`);
        }
    }
}

module.exports = Api;