let expect  = require("chai").expect;
let should = require("chai").should();

let server = require('../server.js');

describe('Tests unitarios', function(){
    describe('Botón no pulsado (evento):', function(){
         it('Caso imposible 1:', function(){
            return server.getUsuarioEventoDatosPr('9857349857','TeoCEAwcmEX4GHTreCxvgINAVrM2','granada',true)
                .then(function (resultado) { 
                    expect(resultado).equal('Caso imposible 1');
                })
                .catch(function (resultado) {

                })
        });
    });

    describe('Ruta inexistente (evento):', function(){
        it('Caso imposible 2:', function(){
           return server.getUsuarioEventoDatosPr('projectz9857','TeoCEAwcmEX4GHTINAVrM2','granada',true)
               .then(function (resultado) { 
                expect(resultado).equal('Caso imposible 2');
               })
               .catch(function (resultado) {
                   
               })
       });
   });

    describe('Botón pista no pulsado (evento):', function(){
        it('Caso imposible 1:', function(){
            return server.getUsuarioEventoDatosPst('9857349857','mdjtxITyV0d3cNFwI0nzMoAVwZv1','granada')
                .then(function (resultado) { 
                    expect(resultado).equal('Caso imposible 1');
                })
                .catch(function (resultado) {
                    
                })
        });
    });

    describe('Ruta inexistente pista (evento):', function(){
        it('Caso imposible 2:', function(){
            return server.getUsuarioEventoDatosPst('9857349857','TeoCEAwcmEX4GHTreCxvgINAVrM2','granada')
                .then(function (resultado) { 
                    expect(resultado).equal('Caso imposible 2');
                })
                .catch(function (resultado) {
                    
                })
        });
    });

    describe('Botón no pulsado (sensor):', function(){
        it('Caso imposible 1:', function(){
            return server.getUsuarioEventosSensorDatosPr('zb0exbjzfa','TeoCEAwcmEX4GHTreCxvgINAVrM2')
                .then(function (resultado) { 
                    expect(resultado).equal('Caso imposible 1');
                })
                .catch(function (resultado) {
                    
                })
        });
    });

    describe('Ruta inexistente (sensor):', function(){
        it('Caso imposible 2:', function(){
            return server.getUsuarioEventosSensorDatosPr('EmpUltzb','TeoCEAwcmEX4GHTreCxvgINAVrM2')
                .then(function (resultado) { 
                    expect(resultado).equal('Caso imposible 2');
                })
                .catch(function (resultado) {
                    
                })
        });
    });

});
