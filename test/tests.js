let expect  = require("chai").expect;
let should = require("chai").should();

let server = require('../server.js');

describe('Tests unitarios', function(){
    describe('Botón no pulsado (mapa juego):', function(){
         it('Caso imposible 1:', function(){
            return server.getUsuarioEventoDatosPr('9857349857','mdjtxITyV0d3cNFwI0nzMoAVwZv1','granada',true)
                .then(function (resultado) { 
                    expect(resultado).equal('Caso imposible 1');
                })
                .catch(function (resultado) {

                })
        });
    });

    describe('Ruta inexistente (mapa juego):', function(){
        it('Caso imposible 2:', function(){
           return server.getUsuarioEventoDatosPr('projectz9857','mdjtxITyV0d3cNFwI0nzMoAVwZv1','granada',true)
               .then(function (resultado) { 
                expect(resultado).equal('Caso imposible 2');
               })
               .catch(function (resultado) {
                   
               })
       });
   });

    describe('Botón pista no pulsado (pista juego):', function(){
        it('Caso imposible 1:', function(){
            return server.getUsuarioEventoDatosPst('9857349857','mdjtxITyV0d3cNFwI0nzMoAVwZv1','granada')
                .then(function (resultado) { 
                    expect(resultado).equal('Caso imposible 1');
                })
                .catch(function (resultado) {
                    
                })
        });
    });

    describe('Ruta inexistente (pista juego):', function(){
        it('Caso imposible 2:', function(){
            return server.getUsuarioEventoDatosPst('projectz9857','mdjtxITyV0d3cNFwI0nzMoAVwZv1','granada')
                .then(function (resultado) { 
                    expect(resultado).equal('Caso imposible 2');
                })
                .catch(function (resultado) {
                    
                })
        });
    });

    describe('Botón no pulsado (sensor juego):', function(){
        it('Caso imposible 1:', function(){
            return server.getUsuarioEventosSensorDatosPr('9857349857','mdjtxITyV0d3cNFwI0nzMoAVwZv1','granada',37.0256183,-3.6288167)
                .then(function (resultado) { 
                    expect(resultado).equal('Caso imposible 1');
                })
                .catch(function (resultado) {
                    
                })
        });
    });

    describe('Ruta inexistente (sensor juego):', function(){
        it('Caso imposible 2:', function(){
            return server.getUsuarioEventosSensorDatosPr('projectz9857','mdjtxITyV0d3cNFwI0nzMoAVwZv1','granada',37.0256183,-3.6288167)
                .then(function (resultado) { 
                    expect(resultado).equal('Caso imposible 2');
                })
                .catch(function (resultado) {
                    
                })
        });
    });

});
