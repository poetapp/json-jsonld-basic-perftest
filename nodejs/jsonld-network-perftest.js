var fs = require('fs');
var jsonld = require('jsonld');

var person = fs.readFileSync('../data/person.jsonld', 'utf8');
var jsonPerson;
var result = [];

const runIt = async () => {
  for (let i = 0; i < 100000; i++) {
    jsonPerson = JSON.parse(person);
    result.push(await jsonld.canonize(jsonPerson))
  }
}

runIt()
  .catch(e => console.error(e))
