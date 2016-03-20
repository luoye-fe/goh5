<template>
	<div class="set_bg" v-show="showSet">
		<div class="set_con">
			<div class="lfet">
				<div class="thumbnail">
					{{workData | json}}
				</div>
				<div class="review">
					
				</div>
			</div>
			<div class="right">
				
			</div>
		</div>
	</div>
</template>

<style>
.set_bg{position: fixed;left: 0;top: 0;}
</style>

<script>

var Vue = require('Vue');
var $ = require('jQuery');


var store = require('../../store/store.js');
var actions = require('../../store/action/index.js');


var SetPage = Vue.extend({
	name: 'Set',
	data: function(){
		return {

		}
	},
	props: ['showSet'],
	vuex: {
        getters: {
        	workData: function(){
        		return store.state.workData;
        	},
        	about: function(){
        		return store.state.about;
        	},
        	setConfig: function(){
        		return store.state.setConfig;
        	}
        },
        actions: actions
    },
    ready: function(){
    	console.log(this.about);
    }
})

module.exports = SetPage;

</script>