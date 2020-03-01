
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
        var productObject = {
            name: '',
            categoryId: '',
            maxPrice: '',
            minPrice: '',
            pageNumber: '',
            pageSize: '',
            order_by: ''
        };
        $scope.addCategory = function () {
            $http({
                method: "POST",
                url: "/api/categories/",
                data: $scope.category
            })
        }
        $scope.deleteCategory = function (category) {
            $http.delete('/api/categories/' + category.CategoryId).then(function(){
                var index = $scope.categories.indexOf(category);
                $scope.categories.splice(index, 1)
            })
        }
        $rootScope.getProductList = function (obj) {
            productObject = { ...productObject, ...obj }
            $http({
                url: '/api/businesses',
                method: "GET",
                params: {
                    ...productObject
                }
            }).then(function (response) {
                $rootScope.products = response.data;
                $scope.product_count = response.data.length;
                console.log(response.data)
                $scope.pagination_data = angular.fromJson(response.headers("paging-headers"))
                for (i in response.data) {
                    $scope.products[i].categoryTitle = getProductCategory(i);
                }
            });
        }
        $scope.getProduct = function (id) {
            $http.get("api/businesses/" + id).then(function (response) {
                $rootScope.product = response.data;
            })
        };
        $rootScope.getCategories = function () {
            $http.get('/api/categories').then(function (response) {
                $rootScope.categories = response.data
            })
        }
        $rootScope.getCategories();
        $scope.delete = function (product) {
            $http.delete('/api/businesses/' + product.BusinessId).then(function (response) {
                var index = $scope.products.indexOf(product);
                $scope.products.splice(index, 1);
                $scope.product_count = $scope.product_count - 1;
                $scope.pagination_data.totalPages = $scope.pagination_data.totalPages - 1;
            });
        }
        $scope.getUsers = function () {
            $http({
                method: 'GET',
                url: 'api/users/'
            }).then(function (response) {
                $scope.users = response.data;
            })
        }
        $scope.getUser = function (id) {
            $http({
                url: 'api/users/' + id,
                method: 'GET'
            }).then(function (response) {
                $scope.user = response.data
            })
        }
        function getProductCategory(id) {
            for (j in $scope.categories) {
                if ($scope.categories[j].CategoryId == $scope.products[id].CategoryId) {
                    return $scope.categories[j].CategoryTitle;
                }
            };
        }

        $scope.add = function () {
            var data = {
                Title: $scope.title,
                Price: $scope.price,
                CategoryId: $scope.category,
                Description: $scope.description
            };

            $http.post("/api/businesses", data).then(function (response) {
                $scope.products.push(response.data);
                $scope.product_count += 1;
            });
            
        };
        $scope.updateProduct = function (id) {
            var data = {
                BusinessId: id,
                Title: $scope.product.Title,
                Price: $scope.product.Price,
                CategoryId: $scope.product.CategoryId.CategoryId,
                Description: $scope.product.Description
            };
            $http({
                method: 'PUT', 
                url: "/api/businesses/" + id,
                data: data
            })
            .then(function (response) {
                $rootScope.getProductList();
            })
        }
        $scope.getCategory = function (id) {
            $http({
                method: "GET",
                url: "/api/categories/" + id
            }).then(function (response) {
                $rootScope.category = response.data
            })
        }
        $scope.editCategory = function (id) {
            $http({
                method: 'PUT',
                url: "/api/categories/" + id,
                data: $scope.category
            })
        }

    })
