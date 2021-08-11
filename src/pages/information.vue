<template>
  <div class="information">
    <el-table :data="tableList">
      <el-table-column label="编号" prop="deptno"></el-table-column>
      <el-table-column label="部门名称" prop="dname"></el-table-column>
      <el-table-column label="地址" prop="loc"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="upDatas(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            @click.native.prevent="deleteRow(scope.row)"
            type="text"
            size="small"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination background layout="prev, pager, next" :total="1000">
    </el-pagination>

    <el-dialog
      title="提示"
      :visible.sync="isShow"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
      >
        <el-form-item label="编号" prop="deptno">
          <el-input v-model="ruleForm.deptno" disabled></el-input>
        </el-form-item>
        <el-form-item label="部门名称" prop="dname">
          <el-input v-model="ruleForm.dname"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="loc">
          <el-input v-model="ruleForm.loc"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="upData">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getInformation, upData, deleteInfor } from "../api/index";
export default {
  data() {
    return {
      tableList: [],
      isShow: false,
      ruleForm: {
        dname: "",
        loc: "",
      },
      rules: {
        dname: [
          { required: true, message: "请输入部门名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        loc: [
          { required: true, message: "请输入部门地址", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    //获取列表数据
    getInformation().then((res) => {
      this.tableList = res.data.content;
    });
  },
  methods: {
    //打开修改数据框
    upDatas(index, row) {
      this.isShow = true;
      this.ruleForm = Object.assign({}, row); //将数据传入dialog页面
      this.ruleForm.index = index; //传递当前index
    },
    //关闭修改框
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    //修改数据
    upData() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          upData(this.ruleForm).then((res) => {
            if (res.data == "success") {
              this.$message({
                message: "修改成功",
                type: "success",
              });
              //重新获取列表数据
              // this.getInformation().then((res) => {
              //   this.tableList = res.data.content;
              // });
              window.location.reload();
              //关闭修改框
              this.isShow = false;
            } else {
              this.$message({
                message: "修改失败",
                type: "warning",
              });
            }
          });
        }
      });
    },
    //删除数据
    deleteRow(row) {
      this.$confirm("确认删除该条数据？")
        .then((_) => {
          deleteInfor(row).then((res) => {
            this.$message({
              message: "删除成功",
              type: "success",
            });
            window.location.reload();
          });
        })
        .catch((_) => {});
    },
  },
};
</script>