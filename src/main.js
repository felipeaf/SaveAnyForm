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
let persistance = new (require ('./dao/mongodao'))(config.persistence.config);
let server = new (require('./api'))(config.server, persistance);


async function run() {
    await persistance.connect();
    server.run();
}
run();

/**
 * ...
 * 
 * TODO LIST
 * - support to GET method (default form method)
 * - entrypoint to get csv given formid, columns and a configurable password.
 *   for checkbox we can transform an array in multiple boolean columns (like "item1Checked", "item2Checked", ...)
 * 
 * CSV notes:
 * - Excel doesn't expect UTF-8. (here it works with ISO-8859-1 instead)
 */

