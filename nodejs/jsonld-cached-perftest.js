var fs = require('fs');
var jsonld = require('jsonld');

var CONTEXTS = {
    "type": "@type",
    "id": "@id",
    'http://schema.org/additionalType': { '@type': '@id' },
    'http://schema.org/author': { '@type': '@id' },
    'http://schema.org/contentUrl': { '@type': '@id' },
    'http://purl.org/dcterms/created': { '@type': 'Date'},
    'http://schema.org/CreativeWork': {'@type': '@id'},
    'http://schema.org/dateCreated': { '@type': 'Date' },
    'http://schema.org/datePublished': { '@type': 'Date' },
    'http://schema.org/keyword': { '@type': '@id' },
    'http://schema.org/license': { '@type': '@id' },
    'http://schema.org/text': { '@type': 'Text' },
    'http://schema.org/Text': { '@type': '@id' },
    'http://schema.org/url': { '@type': '@id' },
  }
;

documentLoader = (url, callback) => {
  if(url in CONTEXTS) {
    return callback(
      null, {
        contextUrl: null, // this is for a context via a link header
        document: CONTEXTS[url], // this is the actual document that was loaded
        documentUrl: url // this is the actual context URL after redirects
      });
  } else {
    throw new Error('invalid context: ' + url);
  }
};

var person = fs.readFileSync('../data/person.jsonld', 'utf8');
var jsonPerson;
var result = [];

const runIt = async () => {
  for (let i = 0; i < 100000; i++) {
    jsonPerson = JSON.parse(person);
    result.push(await jsonld.canonize(await jsonld.expand(jsonPerson, { documentLoader })))
  }
}

runIt()
  .catch(e => console.error(e))
