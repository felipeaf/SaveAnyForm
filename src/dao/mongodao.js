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

const { MongoClient } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.

class MongoDao {

    constructor(mongoConfig) {
        this._client = new MongoClient(mongoConfig.uri, { useUnifiedTopology: true });
        this._db = mongoConfig.database;
        this._coll = mongoConfig.collection;
    }

    async connect() {
        try {
            await this._client.connect();
            console.log('mongodb connected!');
        }
        catch (err) {
            console.log(err);
            this._client.close();
            process.exit(-1);
        }
    }

    async save(formId, data) {
        let document = {
            metadata: {
                formId,
                createdAt: new Date()
            },
            data
        }

        let db = this._client.db(this._db.replace('%%FORMID%%', formId));
        let collection = db.collection(this._coll.replace('%%FORMID%%', formId));
        await collection.insertOne(document);
    }
}

module.exports = MongoDao;