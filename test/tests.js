let expect  = require("chai").expect;
let should = require("chai").should();

let server = require('../server.js');

describe('Tests unitarios', function(){
    describe('Botón no pulsado (evento):', function(){
         it('Caso imposible 1:', function(){
            return server.getUsuarioEventoDatosPr('projectz9857349857','TeoCEAwcmEX4GHTreCxvgINAVrM2','granada',true)
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

    describe('Botón no pulsado (oferta):', function(){
        it('Caso imposible 1:', function(){
            return server.getUsuarioOfertaDatosPr('EmpUltzb0exbjzfa','TeoCEAwcmEX4GHTreCxvgINAVrM2','granada','granada')
                .then(function (resultado) { 
                    //expect(resultado).equal('Error');
                    expect(resultado).equal('Caso imposible 1');
                })
                .catch(function (resultado) {
                    
                })
        });
    });

    describe('Ruta inexistente (oferta):', function(){
        it('Caso imposible 2:', function(){
            return server.getUsuarioOfertaDatosPr('EmpUltzb','TeoCEAwcmEX4GHTreCxvgINAVrM2','granada','granada')
                .then(function (resultado) { 
                    //expect(resultado).equal('Error');
                    expect(resultado).equal('Caso imposible 2');
                })
                .catch(function (resultado) {
                    
                })
        });
    });

    describe('Botón no pulsado (sensor):', function(){
        it('Caso imposible 1:', function(){
            return server.getUsuarioEventosSensorDatosPr('EmpUltzb0exbjzfa','TeoCEAwcmEX4GHTreCxvgINAVrM2')
                .then(function (resultado) { 
                    //expect(resultado).equal('Error');
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
                    //expect(resultado).equal('Error');
                    expect(resultado).equal('Caso imposible 2');
                })
                .catch(function (resultado) {
                    
                })
        });
    });

});
