<template>

	<!-- 头部导航开始 -->
	<div id="header">
		<img  class="nav" id="navb" src="static/images/nav.png">
		<!-- 下拉列表 -->
		<div class="nav-la" ng-hide="bool">
			<div class="nav-first">
			   <router-link to="/">	
				<img src="static/images/shouye.png">
			   </router-link>
			</div>
			<div class="nav-first">
				<router-link to="/list">
				<img src="static/images/fenlei.png">
				</router-link>
			</div>
			<div class="nav-first">
			 <router-link to="/show">
				<img src="static/images/geren.png">
			</router-link>
			</div>
		</div>
		<img class="logo" src="static/images/logo.png">
		<img class="address" src="static/images/addrees.png">
		<span>北京</span>
		<a href="#/shopcar"><img class="car" src="static/images/car.png"></a>
	</div>


 <!--  <div class="hello">
   <h1>我是头部</h1>
   <router-link to="/">首页</router-link>	
   <router-link to="/list">列表页</router-link>	
   <router-link to="/show">详情页</router-link>	
 </div> -->


</template>

<script>
export default {
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
