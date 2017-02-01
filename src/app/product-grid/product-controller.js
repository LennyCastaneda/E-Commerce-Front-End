(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProductsController', ProductsController);

    ProductsController.$inject = ['toastr', 'productGridFactory'];

    /* @ngInject */
    function ProductsController(toastr, productGridFactory) {
        var vm = this;
        vm.products = 'ProductsController';

        // Methods
        vm.getProductsGrid = 'getProductsGrid';
        vm.getFilteredProducts = 'getFilteredProducts';
        vm.onBrandChange = 'onBrandChange';
        vm.onStyleChange = 'onStyleChange';
        vm.onColorChange = 'onColorChange';
        vm.onPriceRangeChange = 'onPriceRangeChange';

        // Empty Arrays for checkbox items
        vm.selectedBrands = [];
        vm.brandsChecked = [];
        
        vm.selectedStyles = [];
        vm.stylesChecked = [];
        
        vm.selectedColors = [];
        vm.colorsChecked = []; 
        
        vm.selectedPriceRanges = [];
        vm.priceRangesChecked = [];
        vm.selectedPriceRangeBounds = [];

        // Array Product Data
        vm.brands = [ 
                    'Anzo', 
                    'Oracle', 
                    'ProZ', 
                    'Rampage', 
                    'Spyder', 
                    'Rigid Industries', 
                    'IPCW', 
                    'Hella', 
                    'Spec-D Tuning' ];
        
        vm.styles = [ 
                    'Halo', 
                    'Halogen', 
                    'HID', 
                    'LED', 
                    'Projector', 
                    'Conversion' ];
        
        vm.colors = [ 
                    'Amber',
                    'Black', 
                    'Blue', 
                    'Chrome', 
                    'Clear', 
                    'Green',
                    'Grey', 
                    'Multi-Color',
                    'Silver', 
                    'Smoke', 
                    'White' ];

        vm.priceRanges = [ 
                    '$10 - $20', 
                    '$20 - $30', 
                    '$30 - $40', 
                    '$40 - $50', 
                    '$50 - $60', 
                    '$60 - $100' ];
        
        vm.priceRangeValues = [
                    [10, 20], 
                    [20, 30],
                    [30, 40], 
                    [40, 50], 
                    [50, 60],  
                    [60, 100] ];


        // Initialize
        getProducts();


        ////////


        function getProducts() {
            return productGridFactory.getProductsGrid(vm.getProductsGrid).then(
                function(data) {
                    vm.products = setPrices(data.products); 

                    vm.products = data.products;
                    console.log(vm.products);
                },
                function(error) {
                    console.log(error);
                });

        }

        function setPrices(data) {
            // iterate through each item
            return data.map(function(item) {
                // on each item add a new key:value,  item.dolarAmount
                item.dollarAmount = parsePrices(item.salePrice);
                // return the new object to the map  callback function
                return item;
            });
        }

        function parsePrices(priceString) {
            // Use Regular Expression to parse the price from the string
            var priceRange = priceString.match(/\d+/);
            // Convert string to number of type int, since that's only what we have in JSON data
            var intPrice = _.parseInt(priceRange);
            // Return the number 
            return intPrice;
        }

        /////////

        // Modal function
        vm.loadModal = function(product){
            vm.selectedProduct = product;
            console.log(product);
        };

        // Products filter function
        vm.getFilteredProducts = function() {
            // Begin with filtered variable cotaining all products
            var filtered = vm.products;

            // If no filter selected then return products as is.
            if (vm.selectedBrands.length === 0 && 
                vm.selectedStyles.length === 0 && 
                vm.selectedColors.length === 0 &&
                vm.selectedPriceRanges.length === 0 ) 
                return vm.products; 

            // If any brands selected for filtering, filter those brands
            if (vm.selectedBrands.length > 0)
                filtered = _.filter(filtered, 
                    function(p) 
                        {return vm.selectedBrands.indexOf(
                            p.brand) >= 0;});

            // If there are styles selected then filter by style
            if (vm.selectedStyles.length > 0)
                filtered = _.filter(filtered, 
                    function(p) 
                        {return _.intersection(
                            p.styles, vm.selectedStyles).length > 0;});

            // Lowercase all colors strings in the array
            var sanitizedColors = vm.selectedColors.map(
                    function(color) {
                        return color.toLowerCase();
                    }
                );

            // If there are colors selected then filter by color
            if (sanitizedColors.length > 0)
                filtered = _.filter(filtered, 
                    function(p) 
                        {return _.intersection(
                            p.colors, sanitizedColors).length > 0;});

            // Combine selectedPriceRanges with priceRangeValues in new array, compare with the dollarAmount
            // When user selects a price range checking if each product dollarAmount is the selected price
            if (vm.selectedPriceRanges.length > 0)
                filtered = _.filter(filtered,
                    function(p) {
                        var keep = false; 
                        const price = p.dollarAmount; //jshint ignore:line
                        // Loop through thru priceRange bounds, if price of selectedProduct falls within range, keep product don't filter out.
                        vm.selectedPriceRangeBounds.forEach(
                            function(b) {
                                // if the price is greater/equal than lower bound b[0] & lessthan/equal to upper bound b[1], keep in selectedPriceRanges 
                                if (price >= b[0] && price <= b[1]) keep = true;
                            });
                        return keep; 
            });
            // Return filtered results
            return filtered;
        };

        // Brands
        vm.onBrandChange = function(brand) {
            var index = vm.selectedBrands.indexOf(brand);
            if (index >= 0)
                vm.selectedBrands.splice(index, 1);
            else vm.selectedBrands.push(brand);
        };

        // Styles
        vm.onStyleChange = function(style) {
            var index = vm.selectedStyles.indexOf(style);
            if (index >= 0)
                vm.selectedStyles.splice(index, 1);
            else vm.selectedStyles.push(style);    
        };

        // Colors
        vm.onColorChange = function(color) {
            var index = vm.selectedColors.indexOf(color);
            if (index >= 0)
                vm.selectedColors.splice(index, 1);
            else vm.selectedColors.push(color);    
        };

        // Price Ranges
        vm.onPriceRangeChange = function(priceRange) {
            var index = vm.selectedPriceRanges.indexOf(priceRange);
            if (index >= 0) {
                vm.selectedPriceRanges.splice(index, 1);
                // Removing the deseleced price ranges from the declared array above
                vm.selectedPriceRangeBounds.splice(index, 1);
            }
            else {
                // adding the given price range to know it has been selected
                vm.selectedPriceRanges.push(priceRange); 
                // deteremine which price range given is selected, use its index since both indices coorespond 
                // we find which index it is among all the string version index price ranges.
                var stringRangeIndex = vm.priceRanges.indexOf(priceRange);
                var numericalRange = vm.priceRangeValues[stringRangeIndex];
                // Use that index to locate the numerical version of the price range, then add to selected array of numerical ranges.
                vm.selectedPriceRangeBounds.push(numericalRange);
                // This line below is a combination of the 3 lines above, for readability use 3 lines above.
                // vm.selectedPriceRangeBounds.push(vm.priceRangeValues[stringRangeIndex]);
            }   
        };
    }
})();