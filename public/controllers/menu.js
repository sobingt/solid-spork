angular.module('MyApp')
  .controller('MenuCtrl', function($auth, $alert, $scope, $rootScope, Menu, Account) {
    /**
     * Get user's profile information.
     */
    $scope.getProfile = function() {
      Account.getProfile()
        .success(function(data) {
          $scope.user = data;
        })
        .error(function(error) {
          $alert({
            content: error.message,
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });
        });
    };
    $scope.card = {};
    $scope.delivery = {};
    $scope.cardnumber = /^\d+$/;
    $scope.expired = /[0-9]{4}\/[0-9]{2}/
    Menu.query(function(menus) {
      $scope.menus = menus;
    }); 
    $scope.minDate = '2015-08-19';
    $scope.maxDate = '2015-08-30';
    $scope.minDateSecond = '2015-09-01';
    $scope.maxDateSecond = '2015-09-12';
    $scope.presetDate = Date.now();
    $scope.selectedDate = $scope.firstDate;
    $scope.$watch('firstDate',function(data){
      Menu.query({date: data},function(data){
        $scope.selectedDate = $scope.firstDate;
        $scope.menus = data;
      });
    });
    $scope.$watch('secondDate',function(data){
        Menu.query({date: data},function(data){
          $scope.selectedDate = $scope.secondDate;
          $scope.menus = data;
        });
      });
    $scope.getMenuByCategory= function(type){
      Menu.query({
        date: $scope.selectedDate, 
        category: type
      },function(data){
        $scope.menus = data;
      });
    }
    //function to remove element to cart and update amount of price
    $scope.removeToCart = function (item) {
     var index = $scope.cart.items.indexOf(item);
     if (index >= 0) {
      $scope.cart.total = parseInt($scope.cart.total) - parseInt($scope.cart.items[index].price);
      $scope.cart.items.splice(index, 1);
     }
     if (!$scope.cart.items.length) {
      $scope.cart = {};
      $scope.cart.items = []
      $scope.cart.total = 0;
     }
    }
    
    $scope.getProfile();
  })
.controller('MenuItemCtrl', function($auth, $alert, $rootScope, $scope, Menu) {
   $scope.updateMenuItemPrice = function(item,subcat) {
      $scope.selectedSubCategory = subcat;
    }
   //function to add element to cart and update amount of price
    $scope.addToCart = function(item) {
      var cartItem ={};
      cartItem.item = item;
      if(!$scope.selectedSubCategory)
        $scope.selectedSubCategory = item.subcategory[0];
      cartItem.subcategory = $scope.selectedSubCategory;
      $rootScope.cart.item.push(cartItem);
      $rootScope.cart.subTotal = parseInt($rootScope.cart.subTotal) + parseInt($scope.selectedSubCategory.cost);
      $rootScope.cart.total = parseInt($rootScope.cart.subTotal) + parseInt($rootScope.cart.delivery);
      
    }
  })
.controller('CartCtrl', function($auth, $alert, $rootScope, $scope, Menu) {
  $scope.cart = $rootScope.cart;
  console.log($scope.cart);
  $scope.$watch('cart',function(){
     //console.log("$scope.cart.length");
    for (var i = 0; i < $scope.cart.length; i++) {
    console.log(i);
    }
  });
  
  $scope.checkOut = function() {
    console.log("cart");
    console.log($rootScope.cart);
  };
  
});