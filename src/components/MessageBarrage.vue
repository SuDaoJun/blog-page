<template>
	<view class="l-barrage">
		<block v-for="(item,index) in items" :key="index">
			<!-- #ifdef H5 -->
				<text v-if="item.display" class="aon"
				  :style="{top: `${item.top}%`,color: item.color}"
				>
					{{item.text}}
				</text>
			<!-- #endif -->
			
			<!-- #ifndef H5 -->
				<text v-if="item.display" class="aon" 
				  :style="{top: `${item.top}%`,color: item.color,
				  animation: `mymove ${Number(item.time)}s linear forwards`
				  }"
				>
					{{item.text}}
				</text>
			<!-- #endif -->
			
		</block>
	</view>
</template>

<script>

// 弹幕字体颜色
function getRandomColor() {
  let rgb = []
  for (let i = 0; i < 3; ++i) {
	let color = Math.floor(Math.random() * 256).toString(16)
	color = color.length == 1 ? '0' + color : color
	rgb.push(color)
  }
  return '#' + rgb.join('')
}	

export default {
	name: 'l-barrage',
	props: {
		minTime: {
			type: Number,
			default: 8
		},
		maxTime: {
			type: Number,
			default: 16
		},
		minTop: {
			type: Number,
			default: 0
		},
		maxTop: {
			type: Number,
			default: 90
		}
	},
	data() {
		return {
      items: [],
      cycle: null
		}
  },
	methods: {
		add(text = '',time = Math.ceil(Math.floor(Math.random()*(this.maxTime-this.minTime+1)+this.minTime))) {
			this.items.push({
				text,
				time,
				top: Math.ceil(Math.random()*(this.maxTop-this.minTop+1)+this.minTop),
        color: getRandomColor(),
        display: 'show'
			});
    },
    clear(){
      clearInterval(this.cycle);
    },
		start(items = []) {
			this.items = [];
			this.cycle && (clearInterval(this.cycle));
			let i = 0,len = items.length;
			
			this.cycle = setInterval(()=> {
				let time = 8;
				// #ifndef H5
					time = Math.ceil(Math.floor(Math.random()*(this.maxTime-this.minTime+1)+this.minTime));
				// #endif
				
				if (i < len) {
          let content = items[i].content?items[i].content:'';
					this.add(content,time);
					i++;
				}
				else {
					clearInterval(this.cycle);
					setTimeout(()=>{
						this.$emit("end",{});
					}, 2000)
				}
			}, 1000)
		}
	}
}	
	
</script>

<style>
.aon{
position: absolute;
white-space:nowrap;
animation: mymove 8s linear forwards;
animation-timing-function: linear;
-webkit-animation-timing-function: linear;
animation-fill-mode: forwards;
}
.l-barrage{
  z-index: 99;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  position: absolute;
}

@keyframes mymove
{
from{left: 100%;}
  to{left: -200%;}
}

@-moz-keyframes mymove /* Firefox */
{
from{left: 100%;}
  to{left: -200%;}
}

@-webkit-keyframes mymove /* Safari and Chrome */
{
from{left: 100%;}
  to{left: -200%;}
}

@-o-keyframes mymove /* Opera */
{
from{left: 100%;}
  to{left: -200%;}
}
</style>