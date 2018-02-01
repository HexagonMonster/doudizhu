const mysql = require('mysql');

const PLAYER_INFO_TABLE = 't_playerinfo';

let client;
const query = function(sql, cb) {
    console.log('[db] query = ' + sql);
    client.getConnection(function(err, connection) {
        if (err) {
            console.log('[db] connection mysql err = ' + err);
            cb(err);
            throw err;
        } else {
            connection.query(sql, function(connerr, result) {
                if (connerr) {
                    console.log('[db] query err = ' + connerr);
                    cb(connerr);
                } else {
                    cb(null, result);
                }
                connection.release();
            });
        }
    });
};

const getValueRep = function (value) {
    if (typeof value === 'string') {
        return '\'' + value + '\'';
    } else {
        return value;
    }
};

const genInsertSql = function(table, data) {
    let sql = 'insert into ' + table;
    let keyStr = '(';
    let valueStr = '(';
    for (let i in data) {
        keyStr += i + ',';
        valueStr += getValueRep(data[i]) + ',';
    }
    keyStr = keyStr.substring(0, keyStr.length - 1);
    keyStr += ") ";
    valueStr = valueStr.substring(0, valueStr.length - 1);
    valueStr += ") ";
    sql += keyStr + 'values' + valueStr + ';';
    console.log('[sql] insert sql = ' + sql);
    return sql;
};

const genDeleteSql = function (table, key, value) {
    let sql = 'delete from ' + table + ' where ' + key + ' = ' + getValueRep(value) + ';';
    console.log('[sql] delete sql = ' + sql);
    return sql;
};

const genUpdateSql = function (table, key, value, data) {
    let sql = 'update ' + table + ' set ';
    for (let i in data) {
        sql += i + ' = ' + getValueRep(data[i]) + ',';
    }
    sql = sql.substring(0, sql.length - 1);
    sql += ' where ' + key + ' = ' + getValueRep(value) + ';';
    console.log('[sql] update sql = ' + sql);
    return sql;
};

exports.connect = function(config) {
    client = mysql.createPool(config);
};

exports.checkPlayer = function (uniqueID, cb) {
    let sql = 'select * from ' + PLAYER_INFO_TABLE + ' where unique_id = ' + uniqueID + ';';
    query(sql, function (err, data) {
        if (err) {
            console.log('err = ' + err);
        }
        console.log('[db] check player = ' + JSON.stringify(data));
        cb(err, data);
    });
};

exports.insertPlayerInfo = function (data) {
    let sql = genInsertSql(PLAYER_INFO_TABLE, data);
    query(sql, function (err, res) {
        if (err) {
            console.log('[db] insertPlayerInfo err = ' + err);
        } else {
            console.log('[db] insertPlayerInfo res = ' + JSON.stringify(res));
        }
    })
};

exports.updatePlayerInfo = function (key, value, data) {
    let sql = genUpdateSql(PLAYER_INFO_TABLE, key, value, data);
    query(sql, function (err, res) {
        if (err) {
            console.log('[db] updatePlayerInfo err = ' + err);
        } else {
            console.log('[db] updatePlayerInfo res = ' + JSON.stringify(res));
        }
    })
};

exports.deletePlayerInfo = function (key, value) {
    let sql = genDeleteSql(PLAYER_INFO_TABLE, key, value);
    query(sql, function (err, res) {
        if (err) {
            console.log('[db] deletePlayerInfo err = ' + err);
        } else {
            console.log('[db] deletePlayerInfo res = ' + JSON.stringify(res));
        }
    })
};
