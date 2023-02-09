<template>
  <div class="lqj-input-container" :class="{ active:isActive }">
        <input type="text" class="lqj-input" ref="inputRef" :placeholder="props.placeHolder" />
        <slot>
            <button class="lqj-btn" type="button" @click="isActive = !isActive">
                <i class="lqj-search-icon"></i>
            </button>
        </slot>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
const icon = `url(https://eveningwater.com/my-web-projects/js/62/images/search.svg) no-repeat 50%/cover`;
const isActive = ref(false)
const inputRef = ref(null)
const props = defineProps({
  placeHolder: {
    Type: String,
    default: '请输入需要搜索的内容'
  }
})
watch(isActive, val => {
  const inputElement = inputRef.value
  // console.log('inputElement: ', inputElement);
  if (val && inputElement) {
    // 聚焦输入框，需要转成 HTML 属性
    (inputElement as HTMLInputElement).focus()
  }
})
</script>

<style lang="less" scoped>
@input_font_color:#535455;
@input_bg_color_1:#f2f3f4;
@input_bg_color_2:#ffffff;
@input_focus_color:#083891;

.lqj-input-container {
  height: 45px;
  position: relative;
  box-sizing: border-box;
  &.active {
    .lqj-input {
      width: 240px;
      border-radius: 8px 0 0 8px;
      border: 1px solid @input_focus_color;
      border-right: none
    }
    .lqj-btn {
      transform: translateX(238px);
      border-radius: 0 8px 8px 0;
    }
  }
  .lqj-input,.lqj-btn {
    width: 45px;
    height: 45px;
    border: none;
    border-radius: 8px;
    transition: all .4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-sizing: border-box;
    &:focus-visible {
      outline: none;
    }
    &.lqj-input {
      color: @input_font_color;
      background: linear-gradient(135deg, @input_bg_color_1 10%, @input_bg_color_2 90%);
      font-size: 16px;
      display: inline-block;
      padding: 15px;
    }
    &.lqj-btn {
      background: linear-gradient(90deg, @input_bg_color_1 10%, @input_bg_color_2 90%);
      line-height: 45px;
      cursor: pointer;
      text-align: center;
      position: absolute;
      left: 0;
      top: 0;
      .lqj-search-icon {
        width: 20px;
        height: 20px;
        background: v-bind(icon);
        margin: auto;
        display: block;
        margin-left: -5px;
      }
    }
  }
}

</style>