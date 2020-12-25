<template>
	<view class="l-barrage">
		<block v-for="(item,index) in items" :key="index">
			<text v-if="item.display" class="aon" 
        :style="{top: `${item.top}rpx`,color: item.color,
        animationDuration: `${Number(item.time)}s`
        }"
      >
        {{item.text}}
      </text>
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
	props: {
		minTime: {
			type: Number,
			default: 10
		},
		maxTime: {
			type: Number,
			default: 24
		}
	},
	data() {
		return {
      items: [],
      cycle: null,
      selectArr: [20,60,100,140,180,220,260,300,340,380]
		}
  },
	methods: {
		add(text = '',time = Math.ceil(Math.floor(Math.random()*(this.maxTime-this.minTime+1)+this.minTime))) {
      if(this.selectArr.length == 0){
        this.selectArr = [20,60,100,140,180,220,260,300,340,380];
      }
      let maxIndex = this.selectArr.length-1;
      let minIndex = 0;
      let index = Math.floor(Math.random() * (maxIndex - minIndex + 1)) + minIndex;
      let topValue = this.selectArr[index];
      this.selectArr.splice(index, 1);
			this.items.push({
				text,
				time,
				top: topValue,
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
				let time = Math.ceil(Math.floor(Math.random()*(this.maxTime-this.minTime+1)+this.minTime));
				
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
line-height: 40rpx;
animation: mymove 10s linear forwards;
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
</style>