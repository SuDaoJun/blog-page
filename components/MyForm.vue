<template>
  <div class='index-form'>
    <el-form
      :ref="formConfig.ref"
      :style='{width: formConfig.formWidth || "100%"}'
      :inline="formConfig.inline || false"
      :model="formConfig.formModel"
      :label-position="formConfig.labelPosition || 'left'"
      :label-width="formConfig.labelWidth"
      :hide-required-asterisk="formConfig.requiredAsterisk || false"
      :rules="formConfig.rules"
      :class='formConfig.inline?"form-box":""'
      @keyup.enter.native="eventBind(formConfig.handleEnter,formConfig.ref)"
    >
      <el-form-item
        v-for="(item,index) in formConfig.formItemList"
        v-if='!item.hide'
        :key="index"
        :style='{marginRight: formConfig.marginRight, marginBottom: formConfig.marginBottom}'
        :class='item.class'
        :label="item.label"
        :prop="item.prop"
      >
        <!-- 输入框文本和密码 -->
        <el-input
          v-if="item.type=='text' || item.type=='password'"
          v-model="formConfig.formModel[item.prop]"
          :type='item.type'
          :style='{width: item.width}'
          :disabled="item.disabled"
          :clearable="item.clearable === false?false:true"
          :placeholder="item.placeholder"
          :show-password="item.type=='password'"
          @blur='eventBind(item.blur,formConfig.formModel[item.prop])'
          @clear='eventBind(item.blur,formConfig.formModel[item.prop])'
        >
          <i slot="prefix" v-if='item.prefix' :class='[item.prefix,"custom-icon iconfont"]' @click='eventBind(item.blur,formConfig.formModel[item.prop])'></i>
          <i slot="suffix" v-if='item.suffix' :class='[item.suffix,"custom-icon iconfont"]' @click='eventBind(item.blur,formConfig.formModel[item.prop])'></i>
          <template slot="prepend" v-if='item.prepend'>{{item.prepend}}</template>
        </el-input>
        <!-- 验证码 -->
        <div class="form-code" v-else-if="item.type=='code'">
          <el-input
            v-model="formConfig.formModel[item.prop]"
            type='text'
            :style='{width: item.width}'
            :disabled="item.disabled"
            :clearable="item.clearable === false?false:true"
            :placeholder="item.placeholder"
            @blur='eventBind(item.blur,formConfig.formModel[item.prop])'
            @clear='eventBind(item.blur,formConfig.formModel[item.prop])'
          >
            <i slot="prefix" v-if='item.prefix' :class='[item.prefix,"custom-icon iconfont"]'></i>
            <i slot="suffix" v-if='item.suffix' :class='[item.suffix,"custom-icon iconfont"]'></i>
          </el-input>
          <div v-if='item.codeSlot'>
            <slot :name="item.codeSlot" />
          </div>
        </div>
        <!-- 选择器 -->
         <!-- 2种传递方法 item.change和item.visibleChange -->
        <el-select
          v-else-if="item.type=='select'"
          v-model="formConfig.formModel[item.prop]"
          :clearable="item.clearable === false?false:true"
          :multiple="item.multiple"
          :filterable="item.filterable === false?false:true"
          :allow-create="item.allowCreate"
          :default-first-option="item.firstOption"
          :style='{width: item.width}'
          :disabled="item.disabled"
          :placeholder="item.placeholder"
          @change='eventBind(item.change,formConfig.formModel[item.prop])'
          @visible-change='($event)=>{eventBinds(item.visibleChange,$event)}'
        >
          <el-option
            v-for="(optItem,index) in item.arrList"
            :key="optItem.value"
            :label="optItem.label"
            :value="optItem.value"
          ></el-option>
        </el-select>
        <!-- 单选框 -->
        <el-radio-group
          v-else-if="item.type=='radio'"
          :class='item.vertical === true?"radio-vertical":""'
          v-model="formConfig.formModel[item.prop]"
          @change='eventBind(item.change,formConfig.formModel[item.prop])'
        >
          <el-radio
            v-for="(optItem,index) in item.arrList"
            :key="optItem.label"
            :label="optItem.value"
            :disabled="optItem.disabled"
            :border="optItem.border"
          >{{optItem.label}}</el-radio>
        </el-radio-group>
        <!-- 多选框 -->
        <el-checkbox-group
          v-else-if="item.type=='checkbox'"
          v-model="formConfig.formModel[item.prop]"
          @change='eventBind(item.change,formConfig.formModel[item.prop])'
        >
          <el-checkbox
            v-for="(optItem,index) in item.arrList"
            :key="optItem.value"
            :label="optItem.label"
            :disabled="optItem.disabled"
            :border="optItem.border"
          >{{optItem.value}}</el-checkbox>
        </el-checkbox-group>
        <!-- 日期选择器 -->
        <el-date-picker
          v-else-if="item.type=='date'"
          v-model="formConfig.formModel[item.prop]"
          :type="item.dateType || item.type"
          :style='{width: item.width}'
          :placeholder="item.placeholder"
          :disabled="item.disabled"
          :clearable="item.clearable === false?false:true"
          :picker-options="item.pickerOptions || {}"
          :value-format="item.valueFormat || 'yyyy-MM-dd'"
          range-separator="至"
          :start-placeholder="item.startPlaceholder || '开始日期'"
          :end-placeholder="item.endPlaceholder || '结束日期'"
          @change='eventBind(item.change,formConfig.formModel[item.prop])'
        >
        </el-date-picker>
        <!-- 开关 -->
        <el-switch
          v-else-if="item.type=='switch'"
          v-model="formConfig.formModel[item.prop]"
          @change='eventBind(item.change,formConfig.formModel[item.prop])'
        >
        </el-switch>
        <!-- 滑块 -->
        <el-slider
          v-else-if="item.type=='slider'"
          v-model="formConfig.formModel[item.prop]"
          :show-stops="item.showStops"
          :max="item.max"
          :range="item.range"
          :style='{width: item.width}'
          @change='eventBind(item.change,formConfig.formModel[item.prop])'
        ></el-slider>
        <!-- 多行文本 -->
        <el-input
          v-else-if="item.type=='textarea'"
          v-model="formConfig.formModel[item.prop]"
          :style='{width: item.width}'
          :rows="3"
          :autosize='{minRows: 3, maxRows: 6}'
          :type='item.type'
          :disabled="item.disabled"
          :clearable="item.clearable === false?false:true"
          :placeholder="item.placeholder"
        ></el-input>
        <!-- 级联选择器 -->
        <el-cascader
          v-else-if="item.type=='cascader'"
          v-model="formConfig.formModel[item.prop]"
          :style='{width: item.width}'
          :options="item.arrList || []"
          :disabled="item.disabled"
          :clearable="item.clearable === false?false:true"
          :filterable="item.filterable === false?false:true"
          :placeholder="item.placeholder"
          @change='eventBind(item.change,formConfig.formModel[item.prop])'
          :props="{ expandTrigger: item.trigger || 'click' }"
          >
        </el-cascader>
        <!-- 计数器 -->
        <el-input-number 
        v-else-if="item.type=='inputNumber'"
        :style='{width: item.width}'
        v-model="formConfig.formModel[item.prop]"
        controls-position="right"  
        :min="item.min" 
        :max="item.max"
        >
        </el-input-number>
        <div v-if='item.slot'>
          <slot :name="item.slot" />
        </div>
      </el-form-item>
    </el-form> 
    <div class="form-slot">
      <slot :name="formConfig.slot" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.index-form{
  display: flex;
  justify-content: space-between;
  /deep/ .el-input__suffix{
    right: 10px;
  }
}
.form-code{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.form-box{
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
}
</style>

<script>

export default {
  data() {
    return {

    };
  },
  props: {
    formConfig: {
      type: Object,
      required: true,
      default() {
        return {};
      }
    }
  },
  created() {},
  mounted() {

  },
  methods: {
    eventBind(event,arg){
      if(typeof event === 'function'){
        return event(arg);
      }
    },
    eventBinds(event,arg){
      if(typeof event === 'function'){
        return event(arg);
      }
    }
  },
  components: {
    
  },
  computed: {}
};
</script>