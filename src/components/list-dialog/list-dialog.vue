<template>
  <div>
    <el-dialog
      title="查看詳情"
      :visible.sync="isShowDialogDetail"
      width="30%"
      :before-close="DetailDialogClose"
    >
      <table class="table-normal WP100">
        <tr>
          <td class="W150"></td>
          <td>
            <div></div>
            <template></template>
          </td>
        </tr>
      </table>

      <span slot="footer" class="dialog-footer">
        <el-button @click="DetailDialogClose">關閉</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    isShowDialogDetail() {
      return this.$store.state.listState[this.listIndex].isShowDialogDetail;
    }
  },
  methods: {
    DetailDialogClose(done) {
      this.$store.commit("closeDialogDetail");
    }
  }
};
</script>

<style lang="scss" >
</style>