


<template>
    <div class="leaf-loading">
        <span class="leaf-one"></span>
        <span class="leaf-two"></span>
        <span class="top_left_01"></span>
        <span class="top_left_02"></span>
        <span class="top_left_03"></span>
        <span class="right_bottom"></span>
    </div>
</template>
<script>
export default {
    
}
</script>

<style>


.leaf-loading{
    position: fixed;
    top:50%; left: 50%;margin-left: -128px;margin-top: -128px!important;
    width: 256px; height: 256px;overflow: hidden;
}
.leaf-two{
    position: absolute; width: 158px; height: 178px;display: block; background: url('../public/images/leaf_02.png') no-repeat;
    left: 26px;top: 31px; z-index: 1; transform-origin: 32px bottom; transform: rotate(5deg);
    animation: leaf_rotate ease-in-out 1.2s forwards infinite;
}
.leaf-one{
    position: absolute; width: 256px; height: 256px;display: block; background: url("../public/images/leaf_01.png") no-repeat;
    left: 0;top: 0; z-index: 2;
    transform: rotate(4deg); transform-origin: 30px bottom;
    animation: leaf_rotate_1 ease-in-out 1.2s  forwards infinite; 
}
.top_left_01{
    position: absolute;width: 22px;height: 22px; background: url("../public/images/top_left_01.png") no-repeat; top: 36px; left: 8px;
    animation: cubemove 1.8s infinite ease-in-out;
}
.top_left_02{
    position: absolute;width: 17px;height: 17px; background: url("../public/images/top_left_02.png") no-repeat; top: 58px; left: 2px;
    animation: cubemove 1.8s infinite ease-in-out; animation-delay: -0.9s;
}
.top_left_03{
    position: absolute;width: 17px;height: 17px; background: url("../public/images/top_left_03.png") no-repeat; top: 58px; left: 25px;
}
.right_bottom{
    position: absolute;width: 17px;height: 15px; background: url("../public/images/right_bottom.png") no-repeat; top: 204px; right: 68px;
    animation: cubemove 1.8s infinite ease-in-out;
}

@keyframes leaf_rotate{
    0%{ transform: rotate(5deg); }
    45%,55%{ transform: rotate(30deg); }
    100%{ transform: rotate(5deg); }
}
@keyframes leaf_rotate_1{
    0%{ transform: rotate(4deg); }
    45%,55%{ transform: rotate(0deg); }
    100%{ transform: rotate(4deg); }
}
@keyframes cubemove {
  25% { transform: translateX(42px) rotate(-90deg) scale(0.5); } 
  50% { transform: translateX(42px) translateY(42px) rotate(-179deg); } 
  50.1% { transform: translateX(42px) translateY(42px) rotate(-180deg); } 
  75% { transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5); } 
  100% { transform: rotate(-360deg); }
}
</style>