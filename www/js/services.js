angular.module('starter.services', [])

.factory('User', function($http) {

        var SessionIniciada = {
            nickName: null,
            password: null,
            key: null,
            Correo: null,
        };

        return {
            GuardarUsuario: function(user, pass, key, Correo) {
                SessionIniciada.password = pass;
                SessionIniciada.nickName = user;
                SessionIniciada.key = key;
                SessionIniciada.Correo = Correo;
                return true;
            },

            DatosUsuario: function() {
                return SessionIniciada;
            },
            getID: function() {
                return SessionIniciada.idUser;
            }, // FUNCION DE PRUEBA PARA MOSTRAR LOS DATOS DEL USUARIO!!
            getIdCiudad: function() {
                return SessionIniciada.idCiudad;
            },
        }

    })
    .factory('Pedidos', function($http) {

        var Pedidos = [];

        return {
            guardarPedido: function(Vari) {
                Pedidos = Vari;
            },
            retornarPedidos: function() {
                return Pedidos;
            }
        }

    })

.factory('comercio', function() {
    var datos = {
        id: null,
        delivery: null,
        costoTotal: null
    };
    return {
        guardarComercio: function(idComercio, delivery, costoTotal) {
            datos.id = idComercio;
            datos.delivery = delivery;
            datos.costoTotal = costoTotal;
            return true;
        },
        retornarComercio: function() {
            return datos;
        },

    }

});