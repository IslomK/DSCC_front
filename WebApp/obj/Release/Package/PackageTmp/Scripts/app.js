
var indexApp = angular.module('indexApp', ["ngRoute"])

indexApp
    .config(function ($routeProvider, $locationProvider) {
        $locationProvider.hashPrefix('');

        $routeProvider
            .when(
                '/productEdit', {
                    templateUrl: '../static/EditProduct.html',
                    controller: 'productController'
            })
            .when(
                '/productAdd', {
                    templateUrl: '../static/AddProduct.html',
                    controller: 'productController'
            })
            .when(
                '/categoriesList', {
                    templateUrl: '../static/CategoriesList.html',
                    controller: 'productController'
            })
            .when(
                '/categoriesEdit', {
                    templateUrl: '../static/EditCategory.html',
                    controller: 'productController'
            })
            .when(
                '/categoriesAdd', {
                    templateUrl: '../static/AddCategory.html',
                    controller: 'productController'
            })
            .when('/usersList', {
                templateUrl: '../static/usersList.html',
                controller: 'productController'
            })
            .when('/userPage', {
                templateUrl: '../static/UserPage.html',
                controller: 'productController'
            })
            .otherwise({
                templateUrl: '../static/ProductList.html',
                controller: 'productController'
            });
    })
    .controller('productController', function ($rootScope, $scope, $http) {
        var api_url = 'https://localhost:44332'
        var productObject = {
            name: '',
            categoryId: '',
            maxPrice: '',
            minPrice: '',
            pageNumber: '',
            pageSize: '',
            order_by: ''
        };

        $rootScope.getProductList = function (obj) {
            productObject = { ...productObject, ...obj }
            $http({
                url: api_url + '/api/products',
                method: "GET",
            }).then(function (response) {
                $rootScope.products = response.data
            });
        }
        $scope.getProduct = function (id) {
            $http.get(api_url + "/api/products/" + id).then(function (response) {
                $rootScope.product = response.data;
            })
        };
        $scope.delete = function (product) {
            $http.delete(api_url + '/api/products/' + product.productId).then(function (response) {
                var index = $scope.products.indexOf(product);
                $scope.products.splice(index, 1);
            });
        }
        $scope.add = function () {
            var data = {
                Name: $scope.name,
                Price: $scope.price,
                CategoryId: $scope.categoryId,
                Description: $scope.description
            };
            console.log(data);
            $http.post(api_url + "/api/products", data).then(function (response) {
                $scope.product_count += 1;
            });

        };
        $scope.updateProduct = function (id) {
            var data = {
                ProductId: id,
                Name: $scope.product.name,
                Price: $scope.product.price,
                CategoryId: $scope.product.categoryId,
                Description: $scope.product.description
            };
            $http({
                method: 'PUT',
                url: api_url + "/api/products/" + id,
                data: data
            })
                .then(function (response) {
                    $rootScope.getProductList();
                })
        }


        $rootScope.getCategories = function () {
            $http.get(api_url + '/api/categories').then(function (response) {
                $rootScope.categories = response.data
                console.log($rootScope.categories)
            })
        }
        $rootScope.getCategories();
        $scope.getCategory = function (id) {
            $http({
                method: "GET",
                url: api_url + "/api/categories/" + id
            }).then(function (response) {
                $rootScope.category = response.data
            })
        }
        $scope.editCategory = function (id) {
            $http({
                method: 'PUT',
                url: api_url + "/api/categories/" + id,
                data: $scope.category
            })
        }
        $scope.addCategory = function () {
            $http({
                method: "POST",
                url: api_url + "/api/categories/",
                data: {
                    Title: $scope.title
                }
            })
        }
        $scope.deleteCategory = function (category) {
            $http.delete(api_url + '/api/categories/' + category.categoryId).then(function () {
                var index = $scope.categories.indexOf(category);
                $scope.categories.splice(index, 1)
            })
        }
    })
