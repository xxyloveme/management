<template>
  <div class="table">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="姓名">
        <el-input v-model="formInline.user" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="primary" @click="add" v-if="roles">添加</el-button>
        <el-button type="primary" @click="reset" v-if="roles">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="date" label="日期" width="150"></el-table-column>
      <el-table-column prop="name" label="姓名" width="120"></el-table-column>
      <el-table-column prop="sex" label="性别" width="120"></el-table-column>
      <el-table-column prop="age" label="年龄" width="120"></el-table-column>
      <el-table-column prop="address" label="地址" width="300"></el-table-column>
      <el-table-column prop="zip" label="邮编"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100" v-if="roles">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="change(scope.row, scope.$index)">编辑</el-button>
          <el-button type="text" size="small" @click="del(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="修改个人信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" id="sex">
          <el-select v-model="form.sex" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth">
          <el-input v-model="form.age" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="form.address" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮编" :label-width="formLabelWidth">
          <el-input v-model="form.zip" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="sureChang">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="新增个人信息" :visible.sync="dialogFormVisible2">
      <el-form :model="form2">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-date-picker type="date" placeholder="选择日期" v-model="form2.date" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form2.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" id="sex">
          <el-select v-model="form2.sex" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth">
          <el-input v-model="form2.age" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="form2.address" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮编" :label-width="formLabelWidth">
          <el-input v-model="form2.zip" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="sureAdd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Api from '@/api/api'
import Cookies from 'js-cookie'

export default {
  name: 'table',
  data () {
    return {
      tableData: [],
      formInline: {
        user: ''
      },
      formLabelWidth: '120px',
      dialogFormVisible: false,
      dialogFormVisible2: false,
      form: {},
      form2: {},
      oldValue: '',
      index: 0,
      roles: false
    }
  },
  mounted () {
    this.getData()
    if (Cookies.get('roles')) {
      if (Cookies.get('roles') === 'admin') {
        this.roles = true
      } else {
        this.roles = false
      }
    }
  },
  methods: {
    getData () {
      let arr = []
      Api.getData().then(res => {
        arr.push(res.data)
        this.tableData = arr
      })
    },
    onSubmit () {
      if (!this.formInline.user) {
        this.$message.error('请输入查询条件')
        return false
      }
      if (this.tableData.length > 0) {
        let arr = []
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].name === this.formInline.user) {
            arr.push(this.tableData[i])
          }
        }
        this.tableData = arr
      }
    },
    reset () {
      this.getData()
    },
    change (row, index) {
      this.dialogFormVisible = true
      this.oldValue = row
      this.index = index
      this.form = row
    },
    cancel () {
      this.dialogFormVisible = false
      this.tableData[this.index] = this.oldValue
    },
    sureChang () {
      this.dialogFormVisible = false
      this.tableData[this.index] = this.form
    },
    del (index) {
      this.tableData.splice(index, 1)
    },
    add () {
      this.dialogFormVisible2 = true
    },
    sureAdd () {
      this.dialogFormVisible2 = false
      this.tableData.unshift(this.form2)
      this.form2 = {}
    }
  }
}
</script>

<style lang="scss" scoped>
.table{
  padding: 20px;
  #sex{
    text-align: left;
  }
}
</style>
