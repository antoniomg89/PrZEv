let expect  = require("chai").expect;
let should = require("chai").should();

let server = require('../server.js');

describe('Tests unitarios', function(){
    describe('Botón no pulsado:', function(){
         it('Caso imposible 1:', function(){
            return server.getUsuarioEventoDatosPr('projectz9857349857','TeoCEAwcmEX4GHTreCxvgINAVrM2','granada',true)
                .then(function (resultado) { 
                    expect(resultado).equal('Error');
                    //done();
                })
                .catch(function (resultado) {
                    expect(resultado).equal('Caso imposible 1');
                })
        });
    });

    describe('Ruta inexistente:', function(){
        it('Caso imposible 2:', function(){
           return server.getUsuarioEventoDatosPr('projectz9857','TeoCEAwcmEX4GHTINAVrM2','granada',true)
               .then(function (resultado) { 
                   expect(resultado).equal('Error');
                   //done();
               })
               .catch(function (resultado) {
                   expect(resultado).equal('Caso imposible 2');
               })
       });
   });

});
