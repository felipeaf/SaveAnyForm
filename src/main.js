/**
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


let config = require('../config.json');
//in the future, config.persistance.type is supposed to be used as parameter for a factory for persistance,
//when we have more persistance types (filesystem, mysql, etc...)
let dao = new (require ('./dao/mongodao'))(config.persistence.config);
let server = new (require('./api'))(config.server, dao);


async function run() {
    await dao.connect();
    server.run();
}
run();

/**
 * ...
 * 
 * TODO LIST
 * - support to GET method (default form method)
 * - entrypoint to get csv given formid, columns and a configurable password.
 *     for checkbox we can transform an array in multiple boolean columns (like "item1Checked", "item2Checked", ...)
 * - file support (enctype multipart/form-data)
 * - support js validation in both sides
 * - json schemas
 *     validantion and also, declare an schema can cast some types
 * - NeDB or tingo support
 * - Web GUI configuration wizard
 * - Web GUI form wizard
 * - authentication (basic password)
 * - authentication  (jwt per submit, for backend)
 * - tokens with limited use numbers (for users/links)
 
 * 
 * CSV notes:
 * - Excel doesn't expect UTF-8. (here it works with ISO-8859-1 instead)
 */

