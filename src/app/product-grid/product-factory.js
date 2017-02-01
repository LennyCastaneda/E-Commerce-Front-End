(function() {
    'use strict';

    angular
        .module('app')
        .factory('productGridFactory', productGridFactory);

    productGridFactory.$inject = ['$http', '$q', 'toastr'];

    /* @ngInject */
    function productGridFactory($http, $q, toastr) {
        var service = {
            getProductsGrid: getProductsGrid
        };
        return service;

        ////////////////

        function getProductsGrid() {
            var defer = $q.defer();
        	var data = this; //jshint ignore:line 

            $http.get('app/product-grid/products.json').then(
            	function(response) {
                    defer.resolve(response.data);
                    data = response.data; 
                    //console.log(data);
                },
                function(error) {
                    defer.reject(error);
                    toastr.error('Products grid failed to load.', 'Error');
                    console.log(error);
                });
            // defer promise variable runs before callback function.
            return defer.promise;
        }
    }
})();