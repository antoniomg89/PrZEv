const express = require('express');
const firebase = require("firebase-admin");
require('dotenv').config();
const fs = require('fs');

const app = express();
let fb_iniciado = false;
let fbdb;

app.set('port', (process.env.PORT || 4000));

app.get('/getmdata/:id/:uid/:ciu', (req, res) => {
  console.log('Petición de mapa del evento: ' + req.params['id'] + '...');

  let id = req.params['id'];
  let uid = req.params['uid'];
  let ciu = req.params['ciu'];
  let mapa = true;
  
  getUsuarioEventoDatosPr(id,uid,ciu,mapa)
    .then((resultado) => { 
      console.log('Promise recibida: ' + resultado);
      res.json(resultado);
    })
    .catch((resultado) => {  
      console.log('Promise recibida: ' + resultado);
      res.json(resultado);
    });

});

app.get('/getvaldata/:id/:uid/:ciu', (req, res) => {
  console.log('Petición de validación del evento: ' + req.params['id'] + '...');

  let id = req.params['id'];
  let uid = req.params['uid'];
  let ciu = req.params['ciu'];
  let mapa = false;

  getUsuarioEventoDatosPr(id,uid,ciu,mapa)
    .then((resultado) => { 
      console.log('Promise recibida: ' + resultado);
      res.json(resultado);
    })
    .catch((resultado) => {  
      console.log('Promise recibida: ' + resultado);
      res.json(resultado);
    });


});

app.listen(app.get('port'), () => {
  console.log('Estado del Listener: ON');

})

function getUsuarioEventoDatosPr (id,uid,ciu,mapa) {
  return new Promise (function (resolve, reject) {
    if (!fb_iniciado) {
      firebase.initializeApp({
          credential: firebase.credential.cert(JSON.parse(Buffer.from(process.env.SERVICE_ACCOUNT, 'base64').toString('ascii'))),
          databaseURL: process.env.FBR
      });
      fb_iniciado = true;
    }
  
    fbdb = firebase.database();

    //Se comprueba que el usuario haya presionado el botón del mapa.
    let r0;
    
    if (mapa) {
      r0 = 'usuarioeventosmapa/' + uid + '/' + id;
    } else {
      r0 = 'usuarioeventosvalidacion/' + uid + '/' + id;
    }
    
    let ref0 = fbdb.ref(r0);
    //console.log('Ruta botón estado: ' + r0);
  
    ref0.once('value').then(async function(snapshot) {
      if (snapshot.exists()) {
        let botondatos = snapshot.val();
      let botonestado = botondatos.estado;
  
      //console.log('Estado del botón: ' + botonestado);
      
      if (botonestado == 'false') {
        //res.json('Error');
        return reject('Caso imposible 1');
        
  
        // Si el usuario ha pulsado el botón se comprueba su progreso en el juego.
      } else {
        let r1 = 'usuarioeventos/' + uid + '/' + id;
        let ref1 = fbdb.ref(r1);
  
        ref1.once('value').then(function(snapshot) {
        let eventousuario = snapshot.val();
        let validadosusuario = eventousuario.cantidadValidados;
  
        console.log('Cantidad validados: ' + validadosusuario);
  
        let r2 = 'eventosContador/' + ciu + '/' + id + '/qr';
        let ref2 = fbdb.ref(r2);
      
        // Se comprueba el estado del evento actual.
        ref2.once('value').then(function(snapshot) {
          let eventocontador = snapshot.val();
          let estadocontador = eventocontador.estado;
          let qrcontador = eventocontador.qr;
  
  
          let r3 = 'eventosData/' + id;
          let ref3 = fbdb.ref(r3);
      
          // Se obtienen los datos correctos para devolver al usuario.
          ref3.once('value').then(function(snapshot) {
            let eventodata = snapshot.val();
            let r4, ref4, resultado;
            let boton_actualizacion = {
              estado: 'false'
            };
  
            if (mapa) {
              let coordenadasevento = eventodata.coordenadas;
              let coordenadascevento = eventodata.coordenadasc;
              let cc;
              
              if (validadosusuario+1 == qrcontador) {
                cc = coordenadascevento.split(';');
                resultado = cc[validadosusuario];
                //res.json(cc[validadosusuario]);
  
              } else if (validadosusuario+1 != qrcontador && estadocontador == 'false') {
                let c = coordenadasevento.split(';');
                resultado = c[validadosusuario];
                //res.json(c[validadosusuario]);
  
              } else if (validadosusuario+1 != qrcontador && estadocontador == 'true') {
                cc = coordenadascevento.split(';');
                resultado = cc[validadosusuario];
                //res.json(cc[validadosusuario]);
              }
  
              r4 = 'usuarioeventosmapa/' + uid + '/' + id;
              ref4 = fbdb.ref(r4);
              ref4.update(boton_actualizacion);
  
            } else {
              let qrdataevento = eventodata.qrdata;
              let q = qrdataevento.split(';');
              resultado = q[validadosusuario];
              //res.json(q[validadosusuario]);
  
              r4 = 'usuarioeventosvalidacion/' + uid + '/' + id;
              ref4 = fbdb.ref(r4);
              ref4.update(boton_actualizacion);
  
            }
            return resolve(resultado);      
        
          });
        
        });
      
        });
      }

      } else {
        return reject('Caso imposible 2');
      }
      

    });


  });
  

}

exports.getUsuarioEventoDatosPr = getUsuarioEventoDatosPr;
