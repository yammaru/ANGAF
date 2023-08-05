'use strict';

define(['js/app'], function (app) {
	app.register.controller('EditPlanUtilidad', ['$scope', 'auRequest', 'auAlert', '$filter',
		function ($scope, auRequest, auAlert, $filter) {

			$scope.ModelName = "";
			$scope.TitleModal = "";
			$scope.info_mostrar = {};
			$scope.info_guardar = {};
			$scope.Proyecto = {};
			$scope.lista_cuotas = [];
			$scope.lista_cuotas_nueva = [];
			$scope.listado_cupones = [];
			$scope.listado_cupones_ventas = [];
			$scope.isCotizacion = true;
			$scope.plan_cliente_aumento_mes = false;

			//Fix checkbox
			$scope.checkbox = {
				$congelar_valor_final: false
			};

			$scope.NivelesInteres = [
				{ id: 'Bajo', name: 'Bajo' },
				{ id: 'Medio', name: 'Medio' },
				{ id: 'Alto', name: 'Alto' }
			];

			//Funciones cambios en el Form
			$scope.changeForm = function () {
				$scope.guardado_disabled = false;
			};

			$scope.getCanales = function () {
				auRequest({
					url: 'canales_informaciones/select',
					method: 'GET',
					callback: function (response) {
						$scope.loading = false;
						if (response.code != 200) {
							auAlert({ content: response.message, type: 'danger', seconds: 5 });
							return;
						}

						$scope.CanalesInformacione = [];

						// Add Referidos from server into $scope.referidos array
						if (response.data && response.data.list && response.data.list.length) {
							$.each(response.data.list, function (index, item) {
								$scope.CanalesInformacione.push({ id: item.CanalesInformacione.id, nombre: item.CanalesInformacione.nombre });
							});
						}
					}
				});
			};

			$scope.getCanales();

			//Esta Variable es un recurso para solucionar el problema con el ng-change
			//de la directiva j-datepicker, es decir para que no se genere el
			//plan de pago la primera vez que se arbe el modal
			var contador_cambio_fecha = 0;

			//Fecha Cotizacion
			$scope.DateTemplate = {};

			$scope.getDateTemplate = function () {
				auRequest({
					url: 'dates/getDate',
					method: 'GET',
					callback: function (response) {
						if (response.code != 200) {
							auAlert({ content: response.message, type: 'danger', seconds: 5 });
							return;
						}

						$scope.DateTemplate.clock = response.data.clock;
						$scope.DateTemplate.initialDate = response.data.date;
						$scope.DateTemplate.serverDate = response.data.date;
					}
				});
			};

			$scope.getDateTemplate();

			$scope.ver_descuentos = false;
			$scope.guardado_disabled = true;

			var month = new Array();
			month[0] = "Ene";
			month[1] = "Feb";
			month[2] = "Mar";
			month[3] = "Abr";
			month[4] = "May";
			month[5] = "Jun";
			month[6] = "Jul";
			month[7] = "Ago";
			month[8] = "Sep";
			month[9] = "Oct";
			month[10] = "Nov";
			month[11] = "Dic";

			//Cramos un evento para que la funcion pueda ser 
			//llamada desde Los controladores Padres
			//******************************************************************
			$scope.$on('EventEditPlan', function (e, data) {
				contador_cambio_fecha = 0;

				$scope.lista_cuotas.length = 0;
				$scope.lista_cuotas_nueva.length = 0;
				$scope.listado_cupones_ventas.length = 0;

				$scope.ver_descuentos = false;
				$scope.ver_descuentos_cupones = false;
				$scope.guardado_disabled = true;

				var fecha_creacion = $scope.DateTemplate.serverDate + " " + $scope.DateTemplate.clock;

				/*Variables Para Venta*/
				if (typeof (data.Data.Venta) != 'undefined') {
					$scope.ModelName = "Venta";
					$scope.TitleModal = "Venta";
					$scope.isCotizacion = false;
					$scope.info_mostrar = $.extend({}, data.Data.Venta);

					$.each(data.Data.CuponesAplicado, function (index, item) {
						$scope.listado_cupones_ventas.push(item.Cupone);
						$scope.listado_cupones_ventas[index].cupones_aplicados_id = item.id;
					});

					$scope.DateTemplate.serverDate = $scope.info_mostrar.fecha_cotizacion.dateFormat('Y-m-d');
					fecha_creacion = $scope.DateTemplate.serverDate + " " + $scope.DateTemplate.clock;

					$scope.info_mostrar.incluye_acabados = 1 * $scope.info_mostrar.incluye_acabados;
				}

				/*Variables Para Cotizaciones*/
				if (typeof (data.Data.Cotizacione) != 'undefined') {
					$scope.ModelName = "Cotizacione";
					$scope.TitleModal = "Cotización - " + _dcdit_zero_fill(data.Data.Cotizacione.id, 6);
					$scope.info_mostrar = $.extend({}, data.Data.Cotizacione);

					$scope.DateTemplate.serverDate = $scope.info_mostrar.fecha_aux.dateFormat('Y-m-d');

					$scope.info_mostrar.incluye_acabados = 1 * $scope.info_mostrar.incluye_acabados;
					$scope.info_mostrar.plan_pago = angular.fromJson($scope.info_mostrar.plan_pago);

					fecha_creacion = $scope.DateTemplate.serverDate + " " + $scope.DateTemplate.clock;
					var date_cuota = new Date(fecha_creacion);

					$.each($scope.info_mostrar.plan_pago, function (index, item) {
						date_cuota.setMonth(date_cuota.getMonth() + 1);
						$scope.info_mostrar.plan_pago[index].fecha = month[date_cuota.getMonth()] + '-' + date_cuota.getFullYear();
					});
				}

				//VARIABLES PARA GUARDAR
				//**************************************************************
				$scope.info_guardar = $.extend({}, $scope.info_mostrar);

				/*Creamos la Variable cuota_financiada para info_guardar*/
				$scope.info_guardar.cuota_financiada = 0;//No DB
				$.each($scope.info_mostrar.plan_pago, function (index) {
					$scope.info_guardar.cuota_financiada = $scope.info_guardar.cuota_financiada + (1 * $scope.info_mostrar.plan_pago[index].cuota);
				});

				//VARIABLES GLOBALES
				//**************************************************************

				/*Variable que contiene la infomacion del Proyecto*/
				$scope.Proyecto = $.extend({}, data.Data.Proyecto);

				/*Valor del Inmueble Sin Modificar Plan de Pago*/
				$scope.valor_total_inicial_menos_descuentos = $scope.info_mostrar.valor_total_inicial - $scope.info_mostrar.descuento_acabados;
				$scope.valor_total_inicial_menos_descuentos = $scope.valor_total_inicial_menos_descuentos - $scope.info_mostrar.descuento;
				$scope.valor_total_inicial_menos_descuentos = $scope.valor_total_inicial_menos_descuentos - $scope.info_mostrar.descuento_cupones;

				/*Variable donde guardaremos el descuento inicial*/
				$scope.descuento_inicial = null;
				$scope.descuento_cupones_inicial = null;

				/*Contiene el valor de descuentos por politicas antes de realizar un cambio*/
				$scope.descuento_auxiliar = $scope.info_mostrar.descuento;
				$scope.descuento_cupones_auxiliar = $scope.info_mostrar.descuento_cupones;

				/*Valor m2 para las operaciondes de descuento por acabados y politicas*/
				$scope.valor_metro_cuadrado_operaciones = $scope.info_mostrar.valor_metro_cuadrado;

				/*Numero de meses con interes Planos*/
				$scope.fecha_creacion_cotizacion = new Date(fecha_creacion);

				var aux_fecha_inicio = $scope.Proyecto.fecha_inicio + ' 00:00:00';
				$scope.fecha_construccion = new Date($scope.Proyecto.fecha_inicio);
				$scope.meses_sobre_planos = $scope.fecha_construccion.getFullYear() * 12 + $scope.fecha_construccion.getMonth() - ($scope.fecha_creacion_cotizacion.getFullYear() * 12 + $scope.fecha_creacion_cotizacion.getMonth());
				$scope.meses_sobre_planos = $scope.meses_sobre_planos - 1;

				if ($scope.meses_sobre_planos < 1) {
					$scope.meses_sobre_planos = 0;
				}

				//LISTADOS DE CUOTAS
				//**************************************************************
				$.each($scope.info_mostrar.plan_pago, function (index) {
					if ($scope.info_mostrar.plan_pago[index].refinanciacion != 1) {
						$scope.lista_cuotas.push($.extend({}, $scope.info_mostrar.plan_pago[index]));
					} else {
						$scope.plan_cliente_aumento_mes = true;
					}


					$scope.lista_cuotas_nueva.push($.extend({}, $scope.info_mostrar.plan_pago[index]));
				});

				//GENERAMOS PLAN DE PAGO PROPUESTO
				//**************************************************************
				var generador_plan_pago = {
					cuota_financiada: $scope.valor_total_inicial_menos_descuentos * ($scope.Proyecto.porcentaje_cuota_inicial - $scope.Proyecto.porcentaje_valor_unidad) / 100,
					cuota_inicial: $scope.valor_total_inicial_menos_descuentos * (1 * $scope.Proyecto.porcentaje_cuota_inicial) / 100, //No BD
					cuota_no_financiada: $scope.valor_total_inicial_menos_descuentos * (1 * $scope.Proyecto.porcentaje_valor_unidad) / 100,
					descuento: 1 * $scope.info_mostrar.descuento,
					descuento_acabados: 1 * $scope.info_mostrar.descuento_acabados,
					descuento_cupones: 1 * $scope.info_mostrar.descuento_cupones,
					incluye_acabados: 1 * $scope.info_mostrar.incluye_acabados,
					interes_valor_presente: 1 * $scope.Proyecto.interes_valor_presente,
					interes_valor_presente_construccion: 1 * $scope.Proyecto.interes_valor_presente_construccion,
					porcentaje_financiar_cuota_inicial: $scope.Proyecto.porcentaje_cuota_inicial - $scope.Proyecto.porcentaje_valor_unidad,
					porcentaje_cuota_inicial: 1 * $scope.Proyecto.porcentaje_cuota_inicial,
					procentaje_no_financiado_cuota_inicial: 1 * $scope.Proyecto.porcentaje_valor_unidad,
					valor_total: $scope.valor_total_inicial_menos_descuentos,
					cliente_valor_presente: $scope.info_mostrar.cliente_valor_presente
				};

				$scope.reiniciar_plan_pago_edit_plan($scope.lista_cuotas, $scope.info_mostrar, generador_plan_pago);
			});


			//FUNCIONES PARA CAMBIAR LAS FECHAS
			//**************************************************************

			$scope.cambiar_fecha_cotizacion_edit_plan = function () {
				//$scope.guardado_disabled = false;

				contador_cambio_fecha++;

				if (contador_cambio_fecha > 1) {
					$scope.info_mostrar.fecha = $scope.DateTemplate.serverDate + " " + $scope.DateTemplate.clock;
					$scope.info_guardar.fecha = $scope.DateTemplate.serverDate + " " + $scope.DateTemplate.clock;

					var today = new Date($scope.info_mostrar.fecha);
					var fecha_hasta = today.setDate(today.getDate() + (1 * $scope.info_mostrar.dias_validos_cotizacion));
					var date_hasta = new Date(fecha_hasta);

					$scope.info_mostrar.valido_hasta = date_hasta.dateFormat('Y-m-d');


					//CREAMOS EL PLAN DE PAGOS NUEVAMENTE SEGUN LA NUEVA FECHA
					//**********************************************************

					$scope.lista_cuotas_nueva = [];
					$scope.lista_cuotas = [];

					/*Hallando el numero de meses hasta la entrega del proyecto*/
					var fecha_creadora = $scope.DateTemplate.serverDate + " " + $scope.DateTemplate.clock;
					var date_cuota = new Date(fecha_creadora);

					var fecha_entrega = new Date($scope.Proyecto.fecha_entrega + " " + $scope.DateTemplate.clock);
					var fecha_construccion = new Date($scope.Proyecto.fecha_inicio + " " + $scope.DateTemplate.clock);

					fecha_construccion.setDate(fecha_construccion.getDate() + 1);
					fecha_entrega.setDate(fecha_entrega.getDate() + 1);

					$scope.numero_meses = fecha_entrega.getFullYear() * 12 + fecha_entrega.getMonth() - (date_cuota.getFullYear() * 12 + date_cuota.getMonth());
					$scope.numero_meses = $scope.numero_meses;

					if ($scope.numero_meses < 1) {
						$scope.numero_meses = 1;
					}

					if ($scope.numero_meses > (1 * $scope.Proyecto.meses_cuota_inicial)) {
						$scope.numero_meses = (1 * $scope.Proyecto.meses_cuota_inicial);
					}


					$scope.meses_sobre_planos = fecha_construccion.getFullYear() * 12 + fecha_construccion.getMonth() - (date_cuota.getFullYear() * 12 + date_cuota.getMonth());
					$scope.meses_sobre_planos = $scope.meses_sobre_planos - 1;

					if ($scope.meses_sobre_planos < 1) {
						$scope.meses_sobre_planos = 0;
					}

					var month = new Array();
					month[0] = "Ene";
					month[1] = "Feb";
					month[2] = "Mar";
					month[3] = "Abr";
					month[4] = "May";
					month[5] = "Jun";
					month[6] = "Jul";
					month[7] = "Ago";
					month[8] = "Sep";
					month[9] = "Oct";
					month[10] = "Nov";
					month[11] = "Dic";

					for (var i = 0; i < $scope.numero_meses; i++) {
						date_cuota.setMonth(date_cuota.getMonth() + 1);

						$scope.lista_cuotas.push({ id: i + 1, cuota: 0, porcentaje: 0, fecha: month[date_cuota.getMonth()] + '-' + date_cuota.getFullYear() });
						$scope.lista_cuotas_nueva.push({ id: i + 1, cuota: 0, porcentaje: 0, fecha: month[date_cuota.getMonth()] + '-' + date_cuota.getFullYear() });
					}

					$scope.generar_nuevo_plan_pago_edit_plan();
				}
			};


			//******************************************************************
			//FUNCION PARA GENERAR EL PLANES DE PAGO
			//******************************************************************

			/*plan_pago => Listado con el plan de Pago (Propuesto o Modificado por el Cliente)*/
			/*receptor => (info_mostar o info_guardar)*/
			/*variables => JSON con los parametro que generan cambio*/
			$scope.reiniciar_plan_pago_edit_plan = function (plan_pago, receptor, variables) {
				receptor.cuota_financiada = variables.cuota_financiada;//No BD
				receptor.cuota_inicial = variables.cuota_inicial;
				receptor.cuota_no_financiada = variables.cuota_no_financiada;
				receptor.descuento = variables.descuento;
				receptor.descuento_acabados = variables.descuento_acabados;
				receptor.descuento_cupones = variables.descuento_cupones;
				receptor.incluye_acabados = variables.incluye_acabados;
				receptor.interes_valor_presente = variables.interes_valor_presente;
				receptor.interes_valor_presente_construccion = variables.interes_valor_presente_construccion;
				receptor.porcentaje_cuota_inicial = variables.porcentaje_cuota_inicial;
				receptor.porcentaje_fincanciado_banco = 100 - receptor.porcentaje_cuota_inicial;
				receptor.porcentaje_financiar_cuota_inicial = variables.porcentaje_financiar_cuota_inicial;
				receptor.procentaje_no_financiado_cuota_inicial = variables.procentaje_no_financiado_cuota_inicial;

				/*Valor del Inmueble Sin Modificar Plan de Pago*/
				$scope.valor_total_inicial_menos_descuentos = receptor.valor_total_inicial - receptor.descuento_acabados;
				$scope.valor_total_inicial_menos_descuentos = $scope.valor_total_inicial_menos_descuentos - receptor.descuento;
				$scope.valor_total_inicial_menos_descuentos = $scope.valor_total_inicial_menos_descuentos - receptor.descuento_cupones;

				var valor_por_cuota = (receptor.cuota_financiada) / plan_pago.length;
				receptor.valor_cuotas = valor_por_cuota;

				receptor.cliente_valor_presente = 0;
				var valor_presente_cuota_financiada = 0;

				var index_cuota_banco = 0;
				$.each(plan_pago, function (index) {
					plan_pago[index].cuota = valor_por_cuota;
					plan_pago[index].porcentaje = (plan_pago[index].cuota * 100) / $scope.valor_total_inicial_menos_descuentos;

					if ($scope.meses_sobre_planos && index <= $scope.meses_sobre_planos) {
						valor_presente_cuota_financiada = valor_presente_cuota_financiada + ((valor_por_cuota / Math.pow((1 + (receptor.interes_valor_presente / 100)), (index + 1))));
					} else {
						valor_presente_cuota_financiada = valor_presente_cuota_financiada + ((valor_por_cuota / Math.pow((1 + (receptor.interes_valor_presente_construccion / 100)), (index + 1))));
					}
					index_cuota_banco = index + 1;
				});

				receptor.valor_fincanciado_banco = $scope.valor_total_inicial_menos_descuentos - receptor.cuota_financiada - receptor.cuota_no_financiada;
				receptor.cliente_valor_presente = receptor.cuota_no_financiada + valor_presente_cuota_financiada + ((receptor.valor_fincanciado_banco / Math.pow((1 + (receptor.interes_valor_presente_construccion / 100)), (index_cuota_banco + 1))));
				receptor.descuento_financiero = 0;
				receptor.valor_total = (1 * receptor.cuota_no_financiada) + (1 * receptor.cuota_financiada) + (1 * receptor.valor_fincanciado_banco);
			};


			$scope.reiniciar_plan_pago_modificado_mes = function (plan_pago, receptor, variables) {
				receptor.cuota_financiada = variables.cuota_financiada;//No BD
				receptor.cuota_inicial = variables.cuota_inicial;
				receptor.cuota_no_financiada = variables.cuota_no_financiada;
				receptor.descuento = variables.descuento;
				receptor.descuento_acabados = variables.descuento_acabados;
				receptor.descuento_cupones = variables.descuento_cupones;
				receptor.incluye_acabados = variables.incluye_acabados;
				receptor.interes_valor_presente = variables.interes_valor_presente;
				receptor.interes_valor_presente_construccion = variables.interes_valor_presente_construccion;
				receptor.porcentaje_cuota_inicial = variables.porcentaje_cuota_inicial;
				receptor.porcentaje_fincanciado_banco = 100 - receptor.porcentaje_cuota_inicial;
				receptor.porcentaje_financiar_cuota_inicial = variables.porcentaje_financiar_cuota_inicial;
				receptor.procentaje_no_financiado_cuota_inicial = variables.procentaje_no_financiado_cuota_inicial;

				/*Valor del Inmueble Sin Modificar Plan de Pago*/
				$scope.valor_total_inicial_menos_descuentos = receptor.valor_total_inicial - receptor.descuento_acabados;
				$scope.valor_total_inicial_menos_descuentos = $scope.valor_total_inicial_menos_descuentos - receptor.descuento;
				$scope.valor_total_inicial_menos_descuentos = $scope.valor_total_inicial_menos_descuentos - receptor.descuento_cupones;

				var valor_por_cuota = (receptor.cuota_financiada) / plan_pago.length;
				receptor.valor_cuotas = valor_por_cuota;

				var valor_presente_cuota_financiada = 0;

				var index_cuota_banco = 0;
				$.each(plan_pago, function (index) {
					plan_pago[index].cuota = valor_por_cuota;
					plan_pago[index].porcentaje = (plan_pago[index].cuota * 100) / $scope.valor_total_inicial_menos_descuentos;

					if ($scope.meses_sobre_planos && index <= $scope.meses_sobre_planos) {
						valor_presente_cuota_financiada = valor_presente_cuota_financiada + ((valor_por_cuota / Math.pow((1 + (receptor.interes_valor_presente / 100)), (index + 1))));
					} else {
						valor_presente_cuota_financiada = valor_presente_cuota_financiada + ((valor_por_cuota / Math.pow((1 + (receptor.interes_valor_presente_construccion / 100)), (index + 1))));
					}
					index_cuota_banco = index + 1;
				});

				receptor.valor_fincanciado_banco = (variables.cliente_valor_presente - valor_presente_cuota_financiada - (1 * receptor.cuota_no_financiada)) * Math.pow((1 + (1 * $scope.info_guardar.interes_valor_presente_construccion) / 100), index_cuota_banco + 1);
				receptor.valor_total = (1 * receptor.cuota_no_financiada) + (1 * receptor.cuota_financiada) + (1 * receptor.valor_fincanciado_banco);
			};

			//******************************************************************
			//FUNCIONES PARA APLICAR DESCUENTOS
			//******************************************************************

			$scope.get_descuentos_edit_plan = function () {
				$scope.ver_descuentos = true;

				$scope.descuento_inicial = $scope.descuento_auxiliar;
				$scope.info_mostrar.descuento = 0;

				auRequest({
					url: 'cotizaciones/get_descuentos/' + $scope.Proyecto.id + '/' + $scope.DateTemplate.serverDate,
					method: 'GET',
					callback: function (response) {
						$scope.loading = false;
						auAlert(false);

						if (response.code != 200) {
							auAlert({ content: response.message, type: 'danger' });
							return;
						}

						$.each(response.data.list, function (index) {
							response.data.list[index].Politica.incluye_politica = 0;

							var nombre_politica = '';

							if (response.data.list[index].Politica.limite_inferior != null && (1 * response.data.list[index].Politica.limite_inferior) != 0 && (1 * response.data.list[index].Politica.limite_superior) != 0) {
								if (response.data.list[index].Politica.limite_inferior != response.data.list[index].Politica.limite_superior) {
									nombre_politica = 'Desde la ' + response.data.list[index].Politica.limite_inferior + 'º  hasta la ' + response.data.list[index].Politica.limite_superior + 'º  unidad vendida';
								} else {
									nombre_politica = 'La ' + response.data.list[index].Politica.limite_inferior + 'º  unidad vendida';
								}
							}

							if (response.data.list[index].Politica.fecha_inicio != null) {
								if (response.data.list[index].Politica.fecha_inicio != response.data.list[index].Politica.fecha_fin) {
									nombre_politica = nombre_politica + '(' + $filter('date')(response.data.list[index].Politica.fecha_inicio, "dd/MM/y") + '  -  ' + $filter('date')(response.data.list[index].Politica.fecha_fin, "dd/MM/y") + ')';
								} else {
									nombre_politica = nombre_politica + '(' + $filter('date')(response.data.list[index].Politica.fecha_inicio, "dd/MM/y") + ')';
								}
							}

							response.data.list[index].Politica.nombre_politica = nombre_politica;
						});

						$scope.listado_descuentos = response.data.list;
						$scope.generar_nuevo_plan_pago_edit_plan();
					}
				});
			};


			$scope.aplicar_descuento_edit_plan = function () {
				$scope.info_mostrar.valor_metro_cuadrado = $scope.valor_metro_cuadrado_operaciones;
				$scope.info_mostrar.descuento = 0;

				$.each($scope.listado_descuentos, function (index, item) {
					if (item.Politica.incluye_politica) {
						if (1 * item.Politica.is_valor_total) {
							$scope.info_mostrar.descuento = $scope.info_mostrar.descuento + (1 * item.Politica.valor);
						} else {
							$scope.info_mostrar.valor_metro_cuadrado = (1 * $scope.info_mostrar.valor_metro_cuadrado) - (1 * item.Politica.valor);
							$scope.info_mostrar.descuento = $scope.info_mostrar.descuento + (1 * item.Politica.valor) * (1 * $scope.info_mostrar.tipo_unidad);
						}
					}
				});

				$scope.generar_nuevo_plan_pago_edit_plan();
			};


			$scope.descuento_acabado_edit_plan = function (incluye_acabado) {
				if (!incluye_acabado) {
					$scope.info_mostrar.descuento_acabados = $scope.info_mostrar.valor_acabados;
				} else {
					$scope.info_mostrar.descuento_acabados = 0;
				}

				$scope.generar_nuevo_plan_pago_edit_plan();
			};


			$scope.get_descuentos_cupones_edit_plan = function () {
				$scope.ver_descuentos_cupones = true;
				var model = '';

				$scope.descuento_cupones_inicial = $scope.descuento_cupones_auxiliar;
				$scope.info_mostrar.descuento_cupones = 0;

				if ($scope.ModelName == "Venta") {
					model = 2;
				} else {
					model = 1;
				}

				auRequest({
					url: 'cupones/select?idCliente=' + $scope.info_mostrar.cliente_id + '&idProyecto=' + $scope.Proyecto.id + '&modelo=' + model,
					method: 'GET',
					callback: function (response) {
						$scope.loading = false;
						auAlert(false);

						if (response.code != 200) {
							auAlert({ content: response.message, type: 'danger' });
							return;
						}

						$scope.listado_cupones = response.data.list;

						$.each($scope.listado_cupones, function (index, data) {
							$scope.listado_cupones[index].Cupone.incluye_cupon = 0;

							if (model == 2) {
								$.each($scope.listado_cupones_ventas, function (index2, data2) {
									if ($scope.listado_cupones[index].Cupone.codigo == $scope.listado_cupones_ventas[index2].codigo) {
										$scope.listado_cupones[index].Cupone.incluye_cupon = 1;
										$scope.listado_cupones[index].cupones_aplicados_id = $scope.listado_cupones_ventas[index2].cupones_aplicados_id;
									}
								});
							}

							if ($scope.listado_cupones[index].Cupone.tipo_descuento == 'Porcentaje') {
								$scope.listado_cupones[index].Cupone.valor_aplicar = (((1 * $scope.info_mostrar.valor_total_inicial) * (data.Cupone.valor_descuento)) / 100).toFixed(2);
							} else {
								$scope.listado_cupones[index].Cupone.valor_aplicar = 1 * data.Cupone.valor_descuento;
							}
						});

						if (model == 2) {
							$scope.info_mostrar.descuento_cupones = $scope.descuento_cupones_auxiliar;
						}

						$scope.generar_nuevo_plan_pago_edit_plan();
					}
				});
			};

			$scope.aplicar_descuento_cupones_edit_plan = function () {
				$scope.info_mostrar.descuento_cupones = 0;

				$.each($scope.listado_cupones, function (index, item) {
					if (item.Cupone.incluye_cupon) {
						$scope.info_mostrar.descuento_cupones = (1 * $scope.info_mostrar.descuento_cupones) + (1 * item.Cupone.valor_aplicar);
					}
				});

				$scope.generar_nuevo_plan_pago_edit_plan();
			};

			//******************************************************************  
			// FUNCION PARA REINICIAR LOS PLANES DE PAGO
			// *****************************************************************

			//funcion que se ejecuta al recalcular el plan de pagos
			$scope.generar_nuevo_plan_pago_edit_plan = function () {
				//Habilitar Guardado
				$scope.guardado_disabled = false;

				$scope.valor_total_inicial_menos_descuentos = $scope.info_mostrar.valor_total_inicial - $scope.info_mostrar.descuento_acabados;
				$scope.valor_total_inicial_menos_descuentos = $scope.valor_total_inicial_menos_descuentos - $scope.info_mostrar.descuento;
				$scope.valor_total_inicial_menos_descuentos = $scope.valor_total_inicial_menos_descuentos - $scope.info_mostrar.descuento_cupones;

				var generador_plan_pago = {
					cuota_financiada: $scope.valor_total_inicial_menos_descuentos * ($scope.Proyecto.porcentaje_cuota_inicial - $scope.Proyecto.porcentaje_valor_unidad) / 100,
					cuota_inicial: $scope.valor_total_inicial_menos_descuentos * (1 * $scope.Proyecto.porcentaje_cuota_inicial) / 100, //No BD
					cuota_no_financiada: $scope.valor_total_inicial_menos_descuentos * (1 * $scope.Proyecto.porcentaje_valor_unidad) / 100,
					descuento: 1 * $scope.info_mostrar.descuento,
					descuento_acabados: 1 * $scope.info_mostrar.descuento_acabados,
					descuento_cupones: 1 * $scope.info_mostrar.descuento_cupones,
					incluye_acabados: 1 * $scope.info_mostrar.incluye_acabados,
					interes_valor_presente: 1 * $scope.Proyecto.interes_valor_presente,
					interes_valor_presente_construccion: 1 * $scope.Proyecto.interes_valor_presente_construccion,
					porcentaje_financiar_cuota_inicial: $scope.Proyecto.porcentaje_cuota_inicial - $scope.Proyecto.porcentaje_valor_unidad,
					porcentaje_cuota_inicial: 1 * $scope.Proyecto.porcentaje_cuota_inicial,
					procentaje_no_financiado_cuota_inicial: 1 * $scope.Proyecto.porcentaje_valor_unidad,
					valor_total: $scope.valor_total_inicial_menos_descuentos,
					cliente_valor_presente: $scope.info_mostrar.cliente_valor_presente
				};

				/*Plan Propuesto*/
				$scope.reiniciar_plan_pago_edit_plan($scope.lista_cuotas, $scope.info_mostrar, generador_plan_pago);

				/*Plan Cliente*/
				if ($scope.plan_cliente_aumento_mes) {
					$scope.reiniciar_plan_pago_modificado_mes($scope.lista_cuotas_nueva, $scope.info_guardar, generador_plan_pago);
				} else {
					$scope.reiniciar_plan_pago_edit_plan($scope.lista_cuotas_nueva, $scope.info_guardar, generador_plan_pago);
				}

				/*Variable que contiene el plan a guardar*/
				$scope.info_guardar.plan_pago = angular.toJson($scope.lista_cuotas_nueva);
			};

			//******************************************************************
			//CALCULO DEL PLAN POR CAMBIOS EN LAS CUOTAS
			//******************************************************************


			//funcion que se encarga de recalcular el valor final de acuerdo
			//a las nuevas cuotas que se puedan añadir
			$scope.calcular_cuotas_edit_plan = function () {
				/*Habilitar Guardado*/
				$scope.guardado_disabled = false;

				var valor_presente_cuota_financiada = 0;

				$scope.info_guardar.porcentaje_financiar_cuota_inicial = 0;
				$scope.info_guardar.cuota_financiada = 0;//No DB

				var index = 0;// variable para saber que n de cuota es la entrega
				for (var i = 0; i < $scope.lista_cuotas_nueva.length; i++) {
					/*Calculos de Porcentajes*/
					$scope.info_guardar.cuota_financiada = $scope.info_guardar.cuota_financiada + (1 * $scope.lista_cuotas_nueva[i].cuota);

					/*Calculos Sobre el Valor Presente*/
					if ($scope.meses_sobre_planos && i <= $scope.meses_sobre_planos) {
						valor_presente_cuota_financiada = valor_presente_cuota_financiada + (($scope.lista_cuotas_nueva[i].cuota / Math.pow((1 + ((1 * $scope.info_guardar.interes_valor_presente) / 100)), (i + 1))));
					} else {
						valor_presente_cuota_financiada = valor_presente_cuota_financiada + (($scope.lista_cuotas_nueva[i].cuota / Math.pow((1 + ((1 * $scope.info_guardar.interes_valor_presente_construccion) / 100)), (i + 1))));
					}

					index = i + 1;
				}

				$scope.info_guardar.valor_fincanciado_banco = ($scope.info_guardar.cliente_valor_presente - valor_presente_cuota_financiada - (1 * $scope.info_guardar.cuota_no_financiada)) * Math.pow((1 + (1 * $scope.info_guardar.interes_valor_presente_construccion) / 100), index + 1);

				//para congelar el valor final en caso de que se quieran cambiar las cuotas
				//para el cliente, debemos primero, crear una variable para definir cuando congelar tanto
				//el descuento financiero como el valor de la unidad (valor_total)
				if (!$scope.checkbox.congelar_valor_final) {
					$scope.info_guardar.valor_total = (1 * $scope.info_guardar.cuota_no_financiada) + (1 * $scope.info_guardar.valor_fincanciado_banco) + (1 * $scope.info_guardar.cuota_financiada);
					$scope.info_guardar.porcentaje_fincanciado_banco = ($scope.info_guardar.valor_fincanciado_banco * 100) / $scope.info_guardar.valor_total;
					$scope.info_guardar.descuento_financiero = $scope.info_guardar.valor_total - $scope.valor_total_inicial_menos_descuentos;
				}

				for (var i = 0; i < $scope.lista_cuotas_nueva.length; i++) {
					/*Calculos de Porcentajes*/
					$scope.lista_cuotas_nueva[i].porcentaje = ($scope.lista_cuotas_nueva[i].cuota * 100) / (1 * $scope.info_guardar.valor_total);
					$scope.info_guardar.porcentaje_financiar_cuota_inicial = $scope.info_guardar.porcentaje_financiar_cuota_inicial + $scope.lista_cuotas_nueva[i].porcentaje;
				}

				$scope.info_guardar.plan_pago = angular.toJson($scope.lista_cuotas_nueva);


				//Calculo del porcentaje de la cuota incial no financiada
				$scope.info_guardar.procentaje_no_financiado_cuota_inicial = ($scope.info_guardar.cuota_no_financiada * 100) / $scope.valor_total_inicial_menos_descuentos;

				//                var aux = (1 * $scope.info_guardar.cuota_no_financiada) + (1 * valor_presente_cuota_financiada) + (1 * $scope.info_guardar.valor_fincanciado_banco / Math.pow((1 + (1 * $scope.info_guardar.interes_valor_presente_construccion) / 100), index + 1));
				//                console.log('valor presente recaulado => ', aux);


				//                for (var i = 0; i < $scope.lista_cuotas_nueva.length; i++) {
				//                    /*Calculos de Porcentajes*/
				//                    $scope.lista_cuotas_nueva[i].porcentaje = ($scope.lista_cuotas_nueva[i].cuota * 100) / (1 * $scope.valor_total_inicial_menos_descuentos);
				//                    $scope.info_guardar.cuota_financiada = $scope.info_guardar.cuota_financiada + (1 * $scope.lista_cuotas_nueva[i].cuota);
				//                    $scope.info_guardar.porcentaje_financiar_cuota_inicial = $scope.info_guardar.porcentaje_financiar_cuota_inicial + $scope.lista_cuotas_nueva[i].porcentaje;
				//
				//                    /*Calculos del Valor Total*/
				//                    sumatoria_cuotas = sumatoria_cuotas + (1 * $scope.lista_cuotas_nueva[i].cuota);
				//
				//                    /*Calculos Sobre el Valor Presente*/
				//                    if ($scope.meses_sobre_planos && i <= $scope.meses_sobre_planos) {
				//                        valor_presente = valor_presente - (($scope.lista_cuotas_nueva[i].cuota / Math.pow((1 + ((1 * $scope.info_guardar.interes_valor_presente) / 100)), (i + 1))));
				//                    } else {
				//                        valor_presente = valor_presente - (($scope.lista_cuotas_nueva[i].cuota / Math.pow((1 + ((1 * $scope.info_guardar.interes_valor_presente_construccion) / 100)), (i + 1))));
				//                    }
				//                }
				//
				//                //Calculo del porcentaje de la cuota incial no financiada
				//                $scope.info_guardar.procentaje_no_financiado_cuota_inicial = ($scope.info_guardar.cuota_no_financiada * 100) / $scope.valor_total_inicial_menos_descuentos;
				//
				//                //Calculo Sobre La Entrega
				//                $scope.info_guardar.valor_fincanciado_banco = (valor_presente - $scope.info_guardar.cuota_no_financiada) * (Math.pow((1 + ((1 * $scope.info_guardar.interes_valor_presente_construccion) / 100)), ($scope.lista_cuotas_nueva.length + 1)));
				//                $scope.info_guardar.porcentaje_fincanciado_banco = ($scope.info_guardar.valor_fincanciado_banco * 100) / $scope.valor_total_inicial_menos_descuentos;
				//
				//                $scope.info_guardar.valor_total = (1 * $scope.info_guardar.valor_fincanciado_banco) + (1 * $scope.info_guardar.cuota_no_financiada) + sumatoria_cuotas;
				//                $scope.info_guardar.descuento_financiero = $scope.info_guardar.valor_total - $scope.valor_total_inicial_menos_descuentos;
				//                $scope.info_guardar.plan_pago = angular.toJson($scope.lista_cuotas_nueva);
			};


			//UTILIDADES
			//******************************************************************

			/*Convierte el valor de una cuota del plan de pago del cliente en 0*/
			$scope.equal_zero_edit_plan = function (index) {
				$scope.lista_cuotas_nueva[index].cuota = 0;
				$scope.calcular_cuotas_edit_plan();
			};

			/*Convierte todas las cuota del plan de pago del cliente en 0*/
			$scope.all_zero_edit_plan = function () {
				for (var i = 0; i < $scope.lista_cuotas_nueva.length; i++) {
					$scope.lista_cuotas_nueva[i].cuota = 0;
				}
				$scope.calcular_cuotas_edit_plan();
			};
			$scope.reset = function () {
				if (!$scope.checkbox.congelar_valor_final) {
					$scope.calcular_cuotas_edit_plan();
				}
			};

			//******************************************************************
			//Funciones de Guardado
			//******************************************************************



			$scope.guardar_edit_plan = function () {
				$scope.loading = true;

				var url = '';
				var _data = '';
				var modelo = '';

				if ($scope.ModelName == "Venta") {
					modelo = 2;
					url = 'ventas/edit';
					_data = {
						Venta: {
							id: $scope.info_guardar.id,
							proyecto_id: $scope.info_mostrar.proyecto_id,
							cliente_valor_presente: $scope.info_guardar.cliente_valor_presente,
							cuota_inicial: $scope.info_guardar.cuota_inicial,
							cuota_no_financiada: $scope.info_guardar.cuota_no_financiada,
							descuento: $scope.info_guardar.descuento,
							descuento_acabados: $scope.info_guardar.descuento_acabados,
							descuento_financiero: $scope.info_guardar.descuento_financiero,
							descuento_cupones: $scope.info_guardar.descuento_cupones,
							incluye_acabados: $scope.info_guardar.incluye_acabados,
							interes_valor_presente: $scope.info_guardar.interes_valor_presente,
							interes_valor_presente_construccion: $scope.info_guardar.interes_valor_presente_construccion,
							porcentaje_fincanciado_banco: $scope.info_guardar.porcentaje_fincanciado_banco,
							porcentaje_financiar_cuota_inicial: $scope.info_guardar.porcentaje_financiar_cuota_inicial,
							procentaje_no_financiado_cuota_inicial: $scope.info_guardar.procentaje_no_financiado_cuota_inicial,
							valor_cuotas: $scope.info_guardar.valor_cuotas,
							valor_fincanciado_banco: $scope.info_guardar.valor_fincanciado_banco,
							valor_metro_cuadrado: $scope.info_guardar.valor_metro_cuadrado,
							valor_metro_inicial: $scope.info_guardar.valor_metro_inicial,
							valor_total: $scope.info_guardar.valor_total,
							valor_total_inicial: $scope.info_guardar.valor_total_inicial,
							cuota_financiada: $scope.info_guardar.cuota_financiada
						},
						//parsea los planes de pagos para ventas para poder armar en el backend
						//los array para guardar o actualizar los registros en la tabla plan pagos
						PlanPago: JSON.parse($scope.info_guardar.plan_pago)
					};
				} else {
					modelo = 1;
					url = 'cotizaciones/edit';
					_data = {
						Cotizacione: $scope.info_guardar
					};
				}

				_data.CuponesAplicado = [];

				$.each($scope.listado_cupones, function (index, item) {
					if (item.Cupone.incluye_cupon && typeof (item.cupones_aplicados_id) == 'undefined') {
						_data.CuponesAplicado.push({
							tipo_modelo: modelo,
							modelo_id: $scope.info_guardar.id,
							codigo_cupon: item.Cupone.codigo,
							descuento: item.Cupone.valor_aplicar
						});
					}
				});

				var method = 'PUT';

				auRequest({
					url: url,
					data: _data,
					method: method,
					callback: function (response) {
						$scope.loading = false;
						if (response.code != 200) {
							auAlert({ content: response.message, type: 'danger', seconds: 7 });
							return;
						}

						if ($scope.ModelName == "Venta") {
							window.open("backend/ventas/pdf/?id=" + $scope.info_guardar.cotizacion_id);
						} else {
							window.open("backend/cotizaciones/pdf/?id=" + $scope.info_guardar.id);
						}

						if ($scope.ModelName == "Venta") {
							$scope.updateList();
						} else {
							$scope.updateList('', '', '', '', '', '', '');
						}

						$('#editPlanModal').modal('hide');
						auAlert(false);

						var message = response.message;
						auAlert({ content: message, type: 'success', seconds: 5 });
					}
				});
			};

			//******************************************************************
			//Funciones de Refinanciacion
			//******************************************************************

			$scope.addMonth = function () {
				var index = $scope.lista_cuotas_nueva.length + 1;

				/*Hallando el numero de meses hasta la entrega del proyecto*/
				var fecha_creadora = $scope.DateTemplate.serverDate + " " + $scope.DateTemplate.clock;
				var date_cuota = new Date(fecha_creadora);

				var day = (1 * $scope.info_mostrar.fecha_corte < 10) ? "0" + $scope.info_mostrar.fecha_corte : $scope.info_mostrar.fecha_corte;

				date_cuota.setMonth(date_cuota.getMonth() + index);

				var month_number = (date_cuota.getMonth() + 1 < 10) ? "0" + (date_cuota.getMonth() + 1) : (date_cuota.getMonth() + 1);

				$scope.lista_cuotas_nueva.push({
					id: index,
					cuota: 0,
					porcentaje: 0,
					fecha: month[date_cuota.getMonth()] + '-' + day + '-' + date_cuota.getFullYear(),
					fecha_pago: date_cuota.getFullYear() + '-' + month_number + '-' + day,
					proyecto_id: $scope.info_mostrar.proyecto_id,
					refinanciacion: 1
				});

				$scope.calcular_cuotas_edit_plan();
			};

			$scope.removeMonth = function (index) {
				$scope.lista_cuotas_nueva.splice(index, 1);
				$scope.calcular_cuotas_edit_plan();
			};
		}
	]);
});


