var schema = require('./schema.json'),
  swaggerNodeClient = require('../');
var api = swaggerNodeClient(schema);

function getOrCreate(id, name){
  return api.pet.getPetById(id).catch(function(response){
    // If pet doesn't exist, create a new one.
    if(response.status === 404){
      var pet = {id: id, name: name};
      return api.pet.addPet(pet).then(function(){
        return pet;
      });
    }
    console.log(response);
    // Unknown error
    console.error(response.error.toString());
  });
}

getOrCreate(23, 'bob').then(function(pet){
  console.log('Got pet:', pet);
}, function(error){
  console.error(error.toString());
});