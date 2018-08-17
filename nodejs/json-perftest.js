var fs = require('fs');

var person = fs.readFileSync('../data/person.json', 'utf8');
var jsonPerson;
var result = [];

const canonizeAttributes = attributes => {
  const r = Object.entries(attributes)
    .map(([key, value]) => ({key, value}))
    .map(({key, value}) => ({key: key.toLowerCase(), value}))
    .sort((a, b) => a.key.localeCompare(b.key))
    .map((obj) => {
      k = obj['key']
      v = obj.value
      const r = {}
      r[k] = v
      return r
    })
  return r
}


const canonizeDoc = doc => ({
  publicKey: doc.publicKey,
  type: doc.type,
  created: doc.created,
  attributes: canonizeAttributes(doc.attributes)
})

const runIt = async () => {
  for (let i = 0; i < 100000; i++) {
    jsonPerson = JSON.parse(person);
    result.push(canonizeDoc(jsonPerson))
  }
}

runIt()
  .catch(e => console.error(e))
