<template>
  <el-form ref="form" :model="formData" label-width="80px" size="small" :inline="cf.inline">
    <template v-for="item in cf.formItems">
      <el-form-item :label="item.label" v-if="!item.forbidAdd" :key="item.prop">
        <el-select v-model="formData[item.prop]" v-if="item.type=='select'">
          <el-option label="请选择" value></el-option>
          <el-option
            :label="option.label"
            :value="option.value"
            v-for="option in item.options"
            :key="option.value"
          ></el-option>
        </el-select>

        <el-radio-group v-model="formData[item.prop]" v-else-if="item.type=='radio'">
          <el-radio
            :label="option.value"
            :value="option.value"
            v-for="option in item.options"
            :key="option.value"
          ></el-radio>
        </el-radio-group>

        <el-checkbox-group v-model="formData[item.prop]" v-else-if="item.type=='checkbox'">
          <el-checkbox
            :label="option.value"
            :value="option.value"
            v-for="option in item.options"
            :key="option.value"
          ></el-checkbox>
        </el-checkbox-group>

        <el-input type="textarea" v-model="formData[item.prop]" v-else-if="item.type=='textarea'"></el-input>

        <quillEditor
          v-model="formData[item.prop]"
          :options="editorOption"
          v-else-if="item.type=='editor'"
        ></quillEditor>

        <el-input v-model="formData[item.prop]" v-else></el-input>
      </el-form-item>
    </template>

    <el-form-item>
      <el-button
        :type="item.type"
        @click="$emit(item.event)"
        v-for="(item,index) in cf.btns"
        :key="index"
      >{{item.text}}</el-button>

    </el-form-item>
  </el-form>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
export default {
  components: {
    //注册组件
    quillEditor
  },
  props: {
    cf: {
      type: Object,
      default() {
        return {
          btns: [
            { text: "提交", event: "submit", type: "primary" },
            { text: "取消", event: "cancel" }
          ]
        };
      }
    },
formData:Object

  },
  data() {
    return {
      editorOption: {
        //编辑器的配置
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],

            ["link", "image", "video"]
          ]
        }
      }
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
