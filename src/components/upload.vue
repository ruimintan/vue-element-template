<template>
  <div>
    <el-upload
      :accept="accept"
      :action="upload"
      :name="name"
      :data="data"
      :file-list="fileList"
      :limit="limit"
      :list-type="listType"

      :before-upload="beforeUpload"
      :on-success="onSuccess"
      :on-remove="onRemove"
      :on-error="onError"
    >

      <el-button v-if="btnType === 'primary'" type="primary" size="small" icon="el-icon-upload" plain>{{ btnText }}</el-button>
      <el-button v-if="btnType === 'text'" type="primary" size="small">{{ btnText }}</el-button>

      <div v-if="showTip" slot="tip" class="el-upload__tip">{{ tip }}</div>
    </el-upload>
  </div>
</template>
<script>
import { Message } from 'element-ui'
export default {
  name: 'Upload',
  components: {

  },
  props: {
    // 上传文件名字
    name: {
      type: String,
      default: 'file',
    },
    // 文件限制类型
    accept: {
      type: String,
      default: 'image/png,image/jpeg',
    },
    // 文件限制大小 单位M
    size: {
      type: Number,
      default: 1000000,
    },
    // 文件上传地址
    upload: {
      type: String,
      default: '',
      required: true,
    },
    // 上传文件的个数
    limit: {
      type: Number,
      default: 1,
    },
    // 上传文件的个数
    listType: {
      type: String,
      default: 'picture', // text/picture/picture-card
    },
    // 上传文件时携带的参数
    data: {
      type: Object,

      default: function() {
        return {}
      },
    },
    // 上传文件列表
    fileList: {
      type: Array,
      required: true,
    },
    // 上传按钮的样式
    btnType: {
      type: String,
      default: 'primary', // text/primary
    },
    // 上传按钮的文字
    btnText: {
      type: String,
      default: '上传文件',
    },
    // 是否显示提示
    showTip: {
      type: Boolean,
      default: true,
    },
    // 上传文件的提示
    tip: {
      type: String,
      default: '只能上传jpg/png文件，且不超过10M',
    },

    /**
     * 广播事件
     * onSuccess
     * onRemove
     * onError
     */
  },
  data() {
    return {

    }
  },
  computed: {

  },
  created() {

  },
  mounted() {

  },
  methods: {
    // 上传前
    beforeUpload(file) {
      // console.log('file:', file)
      const typeArr = this.accept.split(',')
      var isType = true
      for (let i = 0; i < typeArr.length; i++) {
        if (typeArr[i] === file.type) {
          isType = false
        }
      }

      const size = file.size / 1024 / 1024 > this.size
      if (size) {
        Message({
          message: `文件大小不能大于${this.size}M`,
          type: 'warning',
        })
        return false
      }
      if (isType) {
        Message({
          message: '请上传指定类型的文件',
          type: 'warning',
        })
        return false
      }
    },
    // 上传成功
    onSuccess(res, file) {
      Message({
        message: '上传成功',
        type: 'success',
      })
      this.$emit('onSuccess', res)
    },
    // 删除
    onRemove(file, fileList) {
      // Message({
      //   message: '移除成功',
      //   type: 'success'
      // })
      this.$emit('onRemove', file)
    },
    // 上传失败
    onError() {
      Message({
        message: '上传失败',
        type: 'error',
      })
      this.$emit('onError')
    },
  },
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.tip{
  display: inline-block;
  padding: 10px;
  line-height: 10px;
  margin: 10px 10px 10px 0;
  font-size: 12px;
  border: 1px solid #000;
  border-radius: 4px;
  position: relative;
}

i{
  position: absolute;
  top: -8px;
  right: -8px;
  width: 16px;
  height: 16px;
  font-size: 12px;
  background: #000;
  color: #fff;
  border-radius: 8px;
  text-align: center;
  line-height: 16px;
}
</style>

