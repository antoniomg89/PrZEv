const express = require('express');
const firebase = require("firebase-admin");
require('dotenv').config();
const fs = require('fs');

const app = express();
let fb_iniciado = false;
let fbdb;

app.set('port', (process.env.PORT || 4000));

app.get('/vgetmdata/:id/:uid/:ciu', (req, res) => {
  console.log('Petición de mapa del juego: ' + req.params['id'] + '...');

  let id = req.params['id'];
  let uid = req.params['uid'];
  let ciu = req.params['ciu'];
  let mapa = true;

  validateToken(uid)
  .then((resultado) => {
    console.log('Promise recibida: ' + resultado);
    getUsuarioEventoDatosPr(id,resultado,ciu,mapa)
    .then((resultado) => { 
      console.log('Promise recibida: ' + resultado);
      res.json(resultado);
    })
    .catch((resultado) => {  
      console.log('Promise recibida: ' + resultado);
      res.json(resultado);
    });
  })
  .catch((resultado) => {
    console.log('Promise recibida: ' + resultado);
    res.json(resultado);
  })

});

app.get('/vgetsdata/:id/:uid/:ciu/:lat/:long', (req, res) => {
  console.log('Petición de sensor del juego: ' + req.params['id'] + '...');

  let id = req.params['id'];
  let uid = req.params['uid'];
  let ciu = req.params['ciu'];
  let lat = req.params['lat'];
  let long = req.params['long'];

  validateToken(uid)
  .then((resultado) => {
    console.log('Promise recibida: ' + resultado);
    getUsuarioEventosSensorDatosPr(id,resultado,ciu,lat,long)
    .then((resultado) => { 
      console.log('Promise recibida: ' + resultado);
      res.json(resultado);
    })
    .catch((resultado) => {  
      console.log('Promise recibida: ' + resultado);
      res.json(resultado);
    });
  })
  .catch((resultado) => {
    console.log('Promise recibida: ' + resultado);
    res.json(resultado);
  })

});

app.get('/vgetvaldata/:id/:uid/:ciu/:lat/:long/:infoqr', (req, res) => {
  console.log('Petición de validación de código QR: ' + req.params['id'] + '...');

  let id = req.params['id'];
  let uid = req.params['uid'];
  let ciu = req.params['ciu'];
  let lat = req.params['lat'];
  let long = req.params['long'];
  let infoqr = req.params['infoqr'];
  let mapa = false;

  validateToken(uid)
  .then((resultado) => {
    console.log('Promise recibida: ' + resultado);
    getUsuarioEventoDatosPr(id,resultado,ciu,mapa,lat,long,infoqr)
    .then((resultado) => { 
      console.log('Promise recibida: ' + resultado);
      res.json(resultado);
    })
    .catch((resultado) => {  
      console.log('Promise recibida: ' + resultado);
      res.json(resultado);
    });
  })
  .catch((resultado) => {
    console.log('Promise recibida: ' + resultado);
    res.json(resultado);
  })

});

app.get('/vgetpstdata/:id/:uid/:ciu', (req, res) => {
  console.log('Petición de pista del  juego: ' + req.params['id'] + '...');

  let id = req.params['id'];
  let uid = req.params['uid'];
  let ciu = req.params['ciu'];

  validateToken(uid)
  .then((resultado) => {
    console.log('Promise recibida: ' + resultado);
    getUsuarioEventoDatosPst(id,resultado,ciu)
    .then((resultado) => { 
      console.log('Promise recibida: ' + resultado);
      res.json(resultado);
    })
    .catch((resultado) => {  
      console.log('Promise recibida: ' + resultado);
      res.json(resultado);
    });
  })
  .catch((resultado) => {
    console.log('Promise recibida: ' + resultado);
    res.json(resultado);
  })

});

app.listen(app.get('port'), () => {
  console.log('Estado del Listener: ON');

})

function getUsuarioEventoDatosPst (id,uid,ciu) {
  return new Promise (function (resolve, reject) {
    //Se comprueba que el usuario haya presionado el botón de la pista.
    let r0;
    
    r0 = 'usuarioeventospistas/' + uid + '/' + id;

    let ref0 = fbdb.ref(r0);
  
    ref0.once('value').then(async function(snapshot) {
      if (snapshot.exists()) {
        let botondatos = snapshot.val();
        let botonestado = botondatos.estado;
        
        if (botonestado == 'false') {
          return reject('Caso imposible 1');
          
    
          // Si el usuario ha pulsado el botón se comprueba su progreso en el juego.
        } else {
          let r1 = 'usuarioeventos/' + uid + '/' + id;
          let ref1 = fbdb.ref(r1);
    
          ref1.once('value').then(function(snapshot) {
          let eventousuario = snapshot.val();
          let validadosusuario = eventousuario.cantidadValidados;
    
          console.log('Cantidad validados: ' + validadosusuario);
            
          let r3 = 'eventosData/' + ciu + '/' + id;
          let ref3 = fbdb.ref(r3);
      
          // Se obtienen los datos correctos para devolver al usuario.
          ref3.once('value').then(function(snapshot) {
            let eventodata = snapshot.val();
            
            let pistasevento = eventodata.pistas;
            let pst = pistasevento.split(';');
            resultado = pst[validadosusuario];

            console.log('Resultado devuelto: ' + resultado);
            return resolve(resultado);
            
          });
          
        });
      }

      } else {
        return reject('Caso imposible 2');
      }     

    });

  });
  
}

function getUsuarioEventoDatosPr (id,uid,ciu,mapa,lat,long,infoqr) {
  return new Promise (function (resolve, reject) {
    //Se comprueba que el usuario haya presionado el botón del mapa.
    let r0;
    
    if (mapa) {
      r0 = 'usuarioeventosmapa/' + uid + '/' + id;
    } else {
      r0 = 'usuarioeventosvalidacion/' + uid + '/' + id;
    }
    
    let ref0 = fbdb.ref(r0);
  
    ref0.once('value').then(async function(snapshot) {
      if (snapshot.exists()) {
        let botondatos = snapshot.val();
        let botonestado = botondatos.estado;
        
        if (botonestado == 'false') {
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
    
    
            let r3 = 'eventosData/' + ciu + '/' + id;
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
    
                } else if (validadosusuario+1 != qrcontador && estadocontador == 'false') {
                  let c = coordenadasevento.split(';');
                  resultado = c[validadosusuario];
    
                } else if (validadosusuario+1 != qrcontador && estadocontador == 'true') {
                  cc = coordenadascevento.split(';');
                  resultado = cc[validadosusuario];
                }
    
                r4 = 'usuarioeventosmapa/' + uid + '/' + id;
                ref4 = fbdb.ref(r4);
                ref4.update(boton_actualizacion);

                return resolve(resultado);  
    
              } else {
                let qrdataevento = eventodata.qrdata;
                let coordenadasevento = eventodata.coordenadas;
                let q = qrdataevento.split(';');
                let c = coordenadasevento.split(';');
                let coord = c[validadosusuario].split(',');
                let latjuego = coord[0];
                let longjuego = coord[1];
                let distancia;

                distancia = resDistances(lat,long,latjuego,longjuego);
                console.log('Distancia calculada: ' + distancia);
                console.log('infoqr: ' + infoqr);
                console.log('infoqr: ' + q[validadosusuario]);

                if (distancia > 1000) {
                  return reject('lejos');

                } else if (infoqr == q[validadosusuario]){
                  resultado = 'ok';

                  /*r4 = 'usuarioeventosvalidacion/' + uid + '/' + id;
                  ref4 = fbdb.ref(r4);
                  ref4.update(boton_actualizacion);*/

                  return resolve(resultado);
 
                } else {
                  return reject('error')
                }

                //resultado = q[validadosusuario] + ';' + c[validadosusuario];
    
                
    
              }    
          
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

function getUsuarioEventosSensorDatosPr (id,uid,ciu,lat,long) {
  return new Promise (function (resolve, reject) {
    //Se comprueba que el usuario haya presionado el botón del mapa.
    let r0;
    r0 = 'usuarioeventossensor/' + uid + '/' + id;
   
    let ref0 = fbdb.ref(r0);
  
    ref0.once('value').then(async function(snapshot) {
      if (snapshot.exists()) {
        let botondatos = snapshot.val();
        let botonestado = botondatos.estado;
        
      if (botonestado == 'false') {
        return reject('Caso imposible 1');
        
  
        // Si el usuario ha pulsado el botón se comprueba su progreso en el juego.
      } else {
        let r1 = 'usuarioeventos/' + uid + '/' + id;
        let ref1 = fbdb.ref(r1);
  
        ref1.once('value').then(function(snapshot) {
        let eventousuario = snapshot.val();
        let validadosusuario = eventousuario.cantidadValidados;
  
        console.log('Cantidad validados: ' + validadosusuario);
  
        let r3 = 'eventosData/' + ciu + '/'  + id;
        let ref3 = fbdb.ref(r3);
    
        // Se obtienen los datos correctos para devolver al usuario.
        ref3.once('value').then(function(snapshot) {
          let eventodata = snapshot.val();
          let coordenadasevento = eventodata.coordenadas;
          let c = coordenadasevento.split(';');
          let coord = c[validadosusuario].split(',');
          let latjuego = coord[0];
          let longjuego = coord[1];
          let r4, ref4, resultado;

          console.log(lat + ',' + long + '\n' + latjuego + ',' + longjuego);
        
          resultado = resDistances(lat,long,latjuego,longjuego);
          console.log('Distancia calculada: ' + resultado);

          /*resultado = c[validadosusuario];
          r4 = 'usuarioeventossensor/' + uid + '/' + id;
          ref4 = fbdb.ref(r4);*/

          return resolve(resultado);      
      
        });
        
        });
      
      }

      } else {
        return reject('Caso imposible 2');
      }     

    });

  });
  
}

function validateToken(token) {
  return new Promise (function (resolve, reject) {
    if (!fb_iniciado) {
      firebase.initializeApp({
          //credential: firebase.credential.cert(JSON.parse(Buffer.from(process.env.SERVICE_ACCOUNT, 'base64').toString('ascii'))),
          credential: firebase.credential.cert('./projectz-d7419-firebase-adminsdk-tlwny-65ff7dd3ee.json'),
          //databaseURL: process.env.FBR
          databaseURL: 'https://projectz-d7419.firebaseio.com'
      });
      fb_iniciado = true;
      fbdb = firebase.database();
    }

    firebase.auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      const uid = decodedToken.uid;
      console.log('UID: ' + uid);
      return resolve(uid)
    })
    .catch((error) => {
      console.log('Error: ' + error)
      return reject('error token');
    })
  });
}

function resDistances(lat,long,latjuego,longjuego) {
  let r = 6371; // km
  let dLatitud = (latjuego - lat)*Math.PI / 180;
  let dLongitud = (longjuego - long)*Math.PI / 180;
  let latitud1 = (lat)*Math.PI / 180;
  let latitud2 = (latjuego)*Math.PI / 180;

  let a = Math.sin(dLatitud/2) * Math.sin(dLatitud/2) + Math.sin(dLongitud/2) * Math.sin(dLongitud/2) * Math.cos(latitud1) * Math.cos(latitud2); 
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  let d = r * c;

  return d*1000;
}

exports.getUsuarioEventoDatosPr = getUsuarioEventoDatosPr;
exports.getUsuarioEventoDatosPst = getUsuarioEventoDatosPst;
exports.getUsuarioEventosSensorDatosPr = getUsuarioEventosSensorDatosPr;
