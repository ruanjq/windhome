---
title: AngularJs 双向数据绑定原理
lang: zh-CN
---



# AngularJs 双向数据绑定原理

## 代码示例 脏检查机制
```html
<div>
    <button type="button" ng-click="increase">增加</button>
    <button type="button" ng-click="decrease">减少</button> 数量：
    <span ng-bind="data"></span>
</div>
<br>
<script>
    function Scope() {
        this.$$watchList = [];
    }

    Scope.prototype.getNewValue = function () {
        return $scope[this.name];
    }

    Scope.prototype.$watch = function (name, listener) {
        var watch = {
            name: name,
            getNewValue: this.getNewValue,
            listener: listener || function () {}
        };

        this.$$watchList.push(watch);
    }

    Scope.prototype.$digest = function () {
        var dirty = true;
        var checkTimes = 0;
        while (dirty) {
            dirty = this.$$digestOnce();
            checkTimes++;
            if (checkTimes > 10 && dirty) {
                throw new Error("循环过多");
            }
        }
    }

    Scope.prototype.$$digestOnce = function () {
        var dirty;
        var list = this.$$watchList;
        for (var i = 0; i < list.length; i++) {
            var watch = list[i];
            var newValue = watch.getNewValue();
            var oldValue = watch.last;
            if (newValue !== oldValue) {
                watch.listener(newValue, oldValue);
                dirty = true;
            } else {
                dirty = false;
            }

            watch.last = newValue;
        }
        return dirty;
    }


    var $scope = new Scope();
    $scope.sum = 0;
    $scope.data = 8;
    $scope.increase = function () {
        this.data++;
    };
    $scope.decrease = function () {
        this.data--;
    };
    $scope.equal = function () {

    };
    $scope.faciend = 3
    $scope.$watch('data', function (newValue, oldValue) {
        $scope.sum = newValue * $scope.faciend;
        console.log("new: " + newValue + "=========" + "old: " + oldValue);
    });

    function bind() {
        var list = document.querySelectorAll('[ng-click]');
        for (var i = 0, l = list.length; i < l; i++) {
            list[i].onclick = (function (index) {
                return function () {
                    var func = this.getAttribute('ng-click');
                    $scope[func]($scope);
                    $scope.$digest();
                    apply();
                }
            })(i)
        }
    }
    function apply() {
        var list = document.querySelectorAll('[ng-bind]');
        for (var i = 0, l = list.length; i < l; i++) {
            var bindData = list[i].getAttribute('ng-bind');
            list[i].innerHTML = $scope[bindData];
        }
    }

    bind();
    $scope.$digest();
    apply();
</script>
```